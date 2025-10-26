'use client';

import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { PhysicsEngine } from '@/components/memphis/core/PhysicsEngine';
import { AudioEngine } from '@/components/memphis/core/AudioEngine';
import { VisualEffects } from '@/components/memphis/core/VisualEffects';
import { ShapeFactory } from '@/components/memphis/core/ShapeFactory';

export type MemphisPlaygroundHandle = {
  reset: () => void;
  setBlobCount: (n: number) => void;
  toggleMute: () => void;
  startFreeze: () => void;
  clearFreeze: () => void;
};

type MemphisPlaygroundProps = {
  initialBlobCount?: number;
  showOverlayControls?: boolean;
  showCounter?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onNote?: (data: { shapeId: string; noteIndex?: number }) => void;
};

const MemphisPlayground = React.forwardRef<MemphisPlaygroundHandle, MemphisPlaygroundProps>(({
  initialBlobCount = 7,
  showOverlayControls = true,
  showCounter = true,
  className,
  style,
  onNote
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const physicsRef = useRef<PhysicsEngine | null>(null);
  const audioRef = useRef<AudioEngine | null>(null);
  const visualsRef = useRef<VisualEffects | null>(null);
  const shapeFactoryRef = useRef<ShapeFactory | null>(null);
  const [freezeState, setFreezeState] = useState<'idle' | 'recording' | 'playing'>('idle');
  const [hoverFreeze, setHoverFreeze] = useState(false);
  const [muted, setMuted] = useState(false);
  const [blobCount, setBlobCount] = useState(initialBlobCount);
  const hoverIdsRef = useRef<Set<number>>(new Set());

  useImperativeHandle(ref, () => ({
    reset: () => shapeFactoryRef.current?.resetScene(),
    setBlobCount: (n: number) => {
      const next = Math.max(2, Math.min(14, Math.floor(n)));
      setBlobCount(next);
      const mutedNow = muted;
      audioRef.current?.dispose();
      audioRef.current = new AudioEngine();
      audioRef.current.setMuted(mutedNow);
      shapeFactoryRef.current?.setAudioEngine(audioRef.current);
      shapeFactoryRef.current?.setDesiredCount(next);
      shapeFactoryRef.current?.resetScene();
    },
    toggleMute: () => {
      const next = !muted;
      setMuted(next);
      audioRef.current?.setMuted(next);
    },
    startFreeze: () => audioRef.current?.freezePress(),
    clearFreeze: () => audioRef.current?.clearFreezeBuffer()
  }), [muted]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let initialized = false;

    const computeSize = () => {
      const parent = canvas.parentElement as HTMLElement | null;
      const availableW = parent?.clientWidth ?? window.innerWidth;
      const availableH = parent?.clientHeight ?? window.innerHeight;
      // Use available space directly without forcing aspect ratio
      const targetW = Math.max(320, availableW);
      const targetH = Math.max(200, availableH);
      return { w: targetW, h: targetH };
    };

    const applySize = () => {
      const { w, h } = computeSize();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (physicsRef.current) {
        if (initialized) {
          physicsRef.current.scaleScene(w, h);
        } else {
          physicsRef.current.resize(w, h);
        }
      }
    };

    applySize(); // Initial setup sizing
    window.addEventListener('resize', applySize);

    // Initialize engines
    const initDims = computeSize();
    physicsRef.current = new PhysicsEngine({ width: initDims.w, height: initDims.h });
    audioRef.current = new AudioEngine();
    visualsRef.current = new VisualEffects(ctx);
    shapeFactoryRef.current = new ShapeFactory(physicsRef.current, audioRef.current, visualsRef.current);

    // Seed scene with shapes (max 14, auto-scales by canvas size)
    console.log('Initial seeding with 14 shapes');
    shapeFactoryRef.current.setDesiredCount(initialBlobCount);
    shapeFactoryRef.current.seedScene();
    initialized = true;

    // Interaction handlers
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      physicsRef.current?.applyPointerField({ x, y, primary: e.buttons === 1, secondary: e.buttons === 2 });
      // Saturation boost when pointer directly touches shapes
      const hits = physicsRef.current?.getHitsAt(x, y) || [];
      // Trigger a note when the cursor first enters a blob (pointer-enter)
      const prev = hoverIdsRef.current;
      const next = new Set<number>();
      hits.forEach(b => {
        const body: any = b as any;
        const id: number = body.id ?? body._id ?? 0;
        next.add(id);
        // Visual boosts
        body.satTarget = 1;
        body.morphBoost = Math.min(1, (body.morphBoost || 0) + 0.2);
        if (!prev.has(id)) {
          // Newly entered: trigger note once
          const velocity = Math.min(1, Math.hypot((e as any).movementX || 0, (e as any).movementY || 0) / 10 + 0.2);
          const noteIndex = body.noteIndex;
          const size = body.size || 30;
          const hue = body.hue;
          audioRef.current?.triggerCollision({
            shapeId: String(body.id || 'pointer-enter'),
            velocity,
            size,
            hue,
            morphLevel: body.morphBoost || 0,
            timestamp: Date.now(),
            noteIndex,
            spin: body.angularVelocity || 0
          } as any);
          if (onNote) onNote({ shapeId: String(body.id || 'pointer-enter'), noteIndex });
        }
      });
      hoverIdsRef.current = next;
      // Morph bodies under pointer slightly for tactile feedback (handled via sat/morphBoost)
      audioRef.current?.modulateWithPointer({ x, y });
      visualsRef.current?.addTrail(x, y);
    };
    const onPointerDown = (e: PointerEvent) => {
      audioRef.current?.ensureStarted();
      canvas.setPointerCapture(e.pointerId);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      physicsRef.current?.pointerDown(e.button, x, y);
      // Engage freeze while held
      audioRef.current?.freezePress();
    };
    const onPointerUp = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      physicsRef.current?.pointerUp(x, y);
      // Release freeze on mouse up
      audioRef.current?.freezeRelease();
    };
    const onContext = (e: MouseEvent) => e.preventDefault();

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('contextmenu', onContext);

    let raf = 0;
    const loop = () => {
      physicsRef.current?.step();
      visualsRef.current?.render(physicsRef.current!);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', applySize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('contextmenu', onContext);
      audioRef.current?.dispose();
      physicsRef.current?.dispose();
    };
  }, []);

  const freezeBg = (() => {
    if (freezeState === 'recording') return '#e63b2e'; // red
    if (freezeState === 'playing') return '#0f4c81'; // dark blue
    if (hoverFreeze) return '#b3e0ff'; // light blue
    return '#ffffff';
  })();

  return (
    <div className={`memphis-root${className ? ' ' + className : ''}`} style={{ position: 'relative', ...(style || {}) }}>
      <canvas ref={canvasRef} className="memphis-canvas" />
      {(showCounter || showOverlayControls) && (
        <div className="memphis-controls" style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          {showOverlayControls && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                className="memphis-mute"
                onClick={() => {
                  const next = !muted;
                  setMuted(next);
                  audioRef.current?.setMuted(next);
                }}
                aria-label={muted ? 'Unmute' : 'Mute'}
                style={{ width: 36, height: 36, borderRadius: 999, border: '2px solid rgba(0,0,0,0.8)', background: '#fff', display: 'grid', placeItems: 'center' }}
              >
                <span style={{ fontSize: 16 }} role="img" aria-hidden>{muted ? '🔇' : '🔊'}</span>
              </button>
              <div style={{ position: 'relative' }}>
                <button
                  className="memphis-freeze"
                  onPointerDown={() => { audioRef.current?.freezePress(); setFreezeState('recording'); }}
                  onPointerUp={() => { audioRef.current?.freezeRelease(); setFreezeState('playing'); }}
                  onPointerLeave={() => { if (freezeState === 'recording') { audioRef.current?.freezeRelease(); setFreezeState('playing'); } }}
                  onMouseEnter={() => setHoverFreeze(true)}
                  onMouseLeave={() => setHoverFreeze(false)}
                  aria-label="Freeze"
                  style={{ width: 36, height: 36, borderRadius: 999, border: '2px solid rgba(0,0,0,0.8)', background: freezeBg, display: 'grid', placeItems: 'center', transition: 'background-color 120ms ease' }}
                >
                  <span style={{ fontSize: 18 }} role="img" aria-hidden>❄️</span>
                </button>
                {freezeState === 'recording' && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 6, background: '#fff', border: '1px solid rgba(0,0,0,0.3)', borderRadius: 8, padding: '2px 6px', fontSize: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                    hold me!
                  </div>
                )}
              </div>
              <button
                className="memphis-clear"
                onClick={() => { audioRef.current?.clearFreezeBuffer(); setFreezeState('idle'); }}
                aria-label="Clear freeze"
                style={{ width: 36, height: 36, borderRadius: 999, border: '2px solid rgba(0,0,0,0.8)', background: '#fff', display: 'grid', placeItems: 'center' }}
              >
                <span style={{ fontSize: 16 }} role="img" aria-hidden>🗑️</span>
              </button>
            </div>
          )}
          {showCounter && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>How Much Company?</span>
              <button
                onClick={() => {
                  const next = Math.max(2, blobCount - 1);
                  setBlobCount(next);
                  // Recreate audio engine to avoid accumulated feedback
                  const mutedNow = muted;
                  audioRef.current?.dispose();
                  audioRef.current = new AudioEngine();
                  audioRef.current.setMuted(mutedNow);
                  shapeFactoryRef.current?.setAudioEngine(audioRef.current);
                  shapeFactoryRef.current?.setDesiredCount(next);
                  shapeFactoryRef.current?.resetScene();
                }}
                aria-label="Decrease blobs"
                style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid rgba(0,0,0,0.5)' }}
              >
                ▾
              </button>
              <span style={{ minWidth: 24, textAlign: 'center' }}>{blobCount}</span>
              <button
                onClick={() => {
                  const next = Math.min(14, blobCount + 1);
                  setBlobCount(next);
                  const mutedNow = muted;
                  audioRef.current?.dispose();
                  audioRef.current = new AudioEngine();
                  audioRef.current.setMuted(mutedNow);
                  shapeFactoryRef.current?.setAudioEngine(audioRef.current);
                  shapeFactoryRef.current?.setDesiredCount(next);
                  shapeFactoryRef.current?.resetScene();
                }}
                aria-label="Increase blobs"
                style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid rgba(0,0,0,0.5)' }}
              >
                ▴
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

MemphisPlayground.displayName = 'MemphisPlayground';

export default MemphisPlayground;
