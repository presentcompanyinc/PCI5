import { Bodies, Body, Vector, Vertices } from 'matter-js';
import { PhysicsEngine, MemphisBody } from './PhysicsEngine';
import { AudioEngine } from './AudioEngine';
import { VisualEffects } from './VisualEffects';

// User-specified hex palette
const HEX_PALETTE = ['#DEC651', '#6E3A2E', '#F4E0D2', '#EC9362', '#DE4636', '#DBAAEA', '#6E657A'];

// Map base hex colors to waveform types (warmer -> more complex)
const COLOR_WAVEFORM: Record<string, string> = {
  '#DE4636': 'fatsawtooth', // warm red/orange -> complex
  '#EC9362': 'fmtriangle',  // warm peach -> complex-ish
  '#DEC651': 'sawtooth',    // warm yellow -> mid complexity
  '#6E3A2E': 'square',      // earthy brown -> mid/high complexity
  '#DBAAEA': 'triangle',    // cool purple -> simpler
  '#6E657A': 'sine',        // cool gray -> simplest
  '#F4E0D2': 'triangle'     // neutral light -> simple
};

function hexToHue(hex: string): number {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0;
  const d = max - min;
  if (d === 0) h = 0;
  else if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60; if (h < 0) h += 360;
  return h;
}

export class ShapeFactory {
  private desiredCount = 14;
  // Track last collision timestamp per body pair to dedupe rapid repeats
  private lastPairHitMs: Map<string, number> = new Map();
  private paletteQueue: string[] = [];
  constructor(private physics: PhysicsEngine, private audio: AudioEngine, private visuals: VisualEffects) {}

  setAudioEngine(audio: AudioEngine) {
    this.audio = audio;
  }

  setDesiredCount(n: number) {
    const clamped = Math.max(2, Math.min(14, Math.floor(n)));
    this.desiredCount = clamped;
  }

  getDesiredCount() { return this.desiredCount; }

  seedScene(count?: number) {
    // Even distribution across size range with randomness, but obey area cap
    const minSize = 20;
    const maxSize = 60;
    const nRaw = typeof count === 'number' ? count : this.desiredCount;
    const n = Math.max(2, Math.min(14, Math.floor(nRaw)));

    // Precompute target sizes and apply global scale if exceeding 50% area of canvas
    const sizes: number[] = [];
    // Find largest size index to lock to G2
    let largestIdx = 0;
    if (sizes.length) {
      let max = -Infinity;
      for (let i = 0; i < sizes.length; i++) {
        if (sizes[i] > max) { max = sizes[i]; largestIdx = i; }
      }
    }

    for (let i = 0; i < n; i++) {
      // base evenly spaced t in [0,1]
      const t = n === 1 ? 0.5 : i / (n - 1);
      // jitter per item, small amount to avoid clustering
      const jitter = (Math.random() - 0.5) * (1 / Math.max(4, n));
      const tt = Math.max(0, Math.min(1, t + jitter));
      const size = minSize + tt * (maxSize - minSize);
      sizes.push(size);
    }
    const canvasArea = this.physics.width * this.physics.height;
    const maxTotalArea = 0.5 * canvasArea;
    const sumArea = sizes.reduce((acc, r) => acc + Math.PI * r * r, 0);
    const globalScale = sumArea > maxTotalArea ? Math.sqrt(maxTotalArea / Math.max(1e-6, sumArea)) : 1;

    for (let i = 0; i < n; i++) {
      const typeIndex = Math.floor(Math.random() * 5);
      if (this.paletteQueue.length === 0) this.paletteQueue = [...HEX_PALETTE];
      const colorHex = this.paletteQueue.shift() as string;
      const hue = hexToHue(colorHex);
      const x = Math.random() * (this.physics.width - 200) + 100;
      const y = Math.random() * (this.physics.height - 300) + 50;
      const size = sizes[i] * globalScale;
      const massFactor = 0.5 + Math.random() * 1.5;
      const elasticity = 0.85 + Math.random() * 0.1; // bouncier
      const vel: Vector = { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 }; // gentle drift

      let body: MemphisBody;
      // Organic blob: irregular convex polygon using jittered radial points
      const verts = this.generateBlobVertices(x, y, size, 10 + Math.floor(Math.random() * 6));
      body = Bodies.fromVertices(x, y, [verts], {
        restitution: elasticity,
        friction: 0.01,
        frictionAir: 0.001
      }, true) as MemphisBody;
      body.shapeType = 'blob';
      body.hue = hue;
      (body as any).massFactor = massFactor;
      (body as any).elasticity = elasticity;
      (body as any).colorHex = colorHex;
      (body as any).satLevel = 0; // 0..1 saturation level
      (body as any).satTarget = 0;
      (body as any).size = size;
      // Seed per-blob scale index from size, with largest locked to G2 (index 0)
      try {
        const scaleIdx = (i === largestIdx) ? 0 : this.audio.getIndexForSize(size);
        (body as any).noteIndex = scaleIdx;
        (body as any).initialNoteIndex = scaleIdx;
        if (i === largestIdx) (body as any).pitchLocked = true;
      } catch {}
      (body as any).morphBoost = 0;
      Body.setVelocity(body, vel);

      // Add initial spin
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      this.physics.addBody(body);
    }

    // Collision -> audio + particles
    const engine = this.physics.engine as unknown as any;
    engine.events = engine.events || {} as any;
    if (!engine._memphisListener) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (engine as any)._memphisListener = true;
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Matter = require('matter-js');
      Matter.Events.on(engine, 'collisionStart', async (evt: any) => {
        await this.audio.ensureStarted();
        const calcVelocity = (body: MemphisBody) => {
          const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
          const angular = Math.abs(body.angularVelocity);
          return Math.min(1, (speed + angular * 10) / 8);
        };

        const getUsedNoteIndices = (): Set<number> => {
          const used = new Set<number>();
          this.physics.getBodies().forEach(b => {
            const idx = (b as any).noteIndex;
            if (typeof idx === 'number' && idx >= 0) used.add(idx);
          });
          return used;
        };

        const nearestUnusedIndex = (desired: number, nLen: number, used: Set<number>, minIdx?: number, maxIdx?: number): number => {
          const clamp = (v: number) => Math.max(0, Math.min(nLen - 1, v));
          const inRange = (v: number) => (minIdx === undefined || v >= minIdx) && (maxIdx === undefined || v <= maxIdx);
          for (let d = 0; d < nLen; d++) {
            const a = clamp(desired - d);
            if (inRange(a) && !used.has(a)) return a;
            const b = clamp(desired + d);
            if (inRange(b) && !used.has(b)) return b;
          }
          return clamp(Math.max(minIdx ?? 0, Math.min(maxIdx ?? (nLen - 1), desired)));
        };

        evt.pairs.forEach((p: any) => {
          const a = p.bodyA as MemphisBody;
          const b = p.bodyB as MemphisBody;
          // Dedupe: if the same two blobs collide again within 5ms, ignore this pair
          const bothBlobs = (a as any).hue !== undefined && (b as any).hue !== undefined;
          if (bothBlobs) {
            const idA: number = (a as any).id ?? (a as any)._id ?? a.id;
            const idB: number = (b as any).id ?? (b as any)._id ?? b.id;
            const key = idA < idB ? `${idA}-${idB}` : `${idB}-${idA}`;
            const now = Date.now();
            const last = this.lastPairHitMs.get(key) || 0;
            if (now - last < 5) {
              return; // skip triggering sounds for this rapid repeat
            }
            this.lastPairHitMs.set(key, now);
          }
          if ((a as any).hue !== undefined) {
            const velocity = calcVelocity(a);
            const morphLevel = ((a as any).morphBoost || 0);
            // Jitter blob's note index within ±3 degrees
            const nLen = this.audio.getScaleLength();
            const prevIdx = (a as any).noteIndex ?? this.audio.getIndexForSize((a as any).size || 30);
            let chosenIdx = prevIdx;
            if (!(a as any).pitchLocked) {
              const jitter = (Math.floor(Math.random() * 7) - 3); // -3..+3
              const desired = Math.max(0, Math.min(nLen - 1, prevIdx + jitter));
              const initIdx = (a as any).initialNoteIndex ?? prevIdx;
              const minIdx = Math.max(0, initIdx - 4);
              const maxIdx = Math.min(nLen - 1, initIdx + 4);
              const used = getUsedNoteIndices();
              // Allow keeping own current note
              used.delete(prevIdx);
              chosenIdx = nearestUnusedIndex(desired, nLen, used, minIdx, maxIdx);
              (a as any).noteIndex = chosenIdx;
            }
            const waveformA = COLOR_WAVEFORM[(a as any).colorHex] || undefined;
            this.audio.triggerCollision({
              shapeId: (a as any).id || 'unknown',
              velocity,
              size: (a as any).size || 30,
              hue: a.hue,
              morphLevel,
              timestamp: Date.now(),
              noteIndex: chosenIdx,
              spin: a.angularVelocity || 0,
              waveform: waveformA
            });
            Body.setAngularVelocity(a, a.angularVelocity + ((Math.random() - 0.5) * 0.2));
            (a as any).morphBoost = Math.min(1, ((a as any).morphBoost || 0) + 0.35);
            (a as any).satTarget = 1;
          }
          if ((b as any).hue !== undefined) {
            const velocity = calcVelocity(b);
            const morphLevel = ((b as any).morphBoost || 0);
            const nLen = this.audio.getScaleLength();
            const prevIdx = (b as any).noteIndex ?? this.audio.getIndexForSize((b as any).size || 30);
            let chosenIdx = prevIdx;
            if (!(b as any).pitchLocked) {
              const jitter = (Math.floor(Math.random() * 7) - 3); // -3..+3
              const desired = Math.max(0, Math.min(nLen - 1, prevIdx + jitter));
              const initIdx = (b as any).initialNoteIndex ?? prevIdx;
              const minIdx = Math.max(0, initIdx - 4);
              const maxIdx = Math.min(nLen - 1, initIdx + 4);
              const used = getUsedNoteIndices();
              used.delete(prevIdx);
              chosenIdx = nearestUnusedIndex(desired, nLen, used, minIdx, maxIdx);
              (b as any).noteIndex = chosenIdx;
            }
            const waveformB = COLOR_WAVEFORM[(b as any).colorHex] || undefined;
            this.audio.triggerCollision({
              shapeId: (b as any).id || 'unknown',
              velocity,
              size: (b as any).size || 30,
              hue: b.hue,
              morphLevel,
              timestamp: Date.now(),
              noteIndex: chosenIdx,
              spin: b.angularVelocity || 0,
              waveform: waveformB
            });
            Body.setAngularVelocity(b, b.angularVelocity + ((Math.random() - 0.5) * 0.2));
            (b as any).morphBoost = Math.min(1, ((b as any).morphBoost || 0) + 0.35);
            (b as any).satTarget = 1;
          }
        });
      });
    }
  }

  resetScene() {
    this.physics.clearDynamic();
    this.seedScene(this.desiredCount);
  }

  private generateBlobVertices(cx: number, cy: number, radius: number, points: number) {
    const verts: { x: number; y: number }[] = [];
    const irregularity = 0.45; // 0..1 how uneven radii are
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2 + Math.random() * (Math.PI * 2 / points) * 0.3;
      const r = radius * (0.7 + Math.random() * irregularity);
      verts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
    }
    // Ensure clockwise order and slight convex hull tightening
    const v2 = Vertices.clockwiseSort(verts as any);
    return v2 as unknown as { x: number; y: number }[];
  }

  // Slightly jitter the vertices of a body to create organic morphing
  private jitterBodyVertices(body: MemphisBody, intensity: number) {
    const verts = body.vertices.map(v => ({ x: v.x, y: v.y }));
    const cx = body.position.x;
    const cy = body.position.y;
    for (let i = 0; i < verts.length; i++) {
      const dx = verts[i].x - cx;
      const dy = verts[i].y - cy;
      const mag = Math.hypot(dx, dy) || 1;
      const nx = dx / mag, ny = dy / mag;
      const jitter = (Math.random() - 0.5) * intensity * mag;
      verts[i].x += nx * jitter;
      verts[i].y += ny * jitter;
    }
    const sorted = Vertices.clockwiseSort(verts as any);
    Body.setVertices(body, sorted as any);
  }
}


