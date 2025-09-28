import * as Tone from 'tone';

type Pointer = { x: number; y: number };

interface CollisionData {
  shapeId: string;
  velocity: number;
  size: number;
  hue: number;
  morphLevel: number;
  timestamp: number;
  noteIndex?: number;
  spin: number;
  waveform?: string;
}

interface ChordGroup {
  collisions: CollisionData[];
  timestamp: number;
}

export class AudioEngine {
  private started = false;
  private reverb: Tone.Reverb;
  private limiter: Tone.Limiter;
  private filter: Tone.Filter;
  private liveDelay: Tone.PingPongDelay;
  private freezeDelay: Tone.PingPongDelay;
  private volume: Tone.Volume;
  private inputGate: Tone.Gain;
  private freezeInGate: Tone.Gain;
  private muted = false;
  private polys: Record<string, Tone.MonoSynth> = {};
  private tremolos: Record<string, Tone.Tremolo> = {};
  private recentCollisions: ChordGroup[] = [];
  private readonly CHORD_WINDOW_MS = 15;
  private frozen = false;
  private freezeState: 'idle' | 'recording' | 'playing' = 'idle';
  
  // Size domain expected from ShapeFactory
  private readonly MIN_SIZE = 20;
  private readonly MAX_SIZE = 60;
  // Discrete G Dorian scale from G3 through G6
  private readonly GDORIAN_NOTES: string[] = this.buildGDorianNotes();

  constructor() {
    this.volume = new Tone.Volume(-8);
    this.limiter = new Tone.Limiter(-2).toDestination();
    this.reverb = new Tone.Reverb({ decay: 6, wet: 0.40 }).connect(this.volume);
    this.volume.connect(this.limiter);
    this.liveDelay = new Tone.PingPongDelay({ delayTime: 0.25, feedback: 0.2, wet: 0.2 }).connect(this.reverb);
    this.freezeDelay = new Tone.PingPongDelay({ delayTime: 0.25, feedback: 0.98, wet: 1 }).connect(this.reverb);
    this.filter = new Tone.Filter({ frequency: 3000, type: 'lowpass', rolloff: -24 });
    // Gate before the filter allows us to freeze by cutting new input while
    // letting the delay/reverb tail continue.
    this.inputGate = new Tone.Gain(1);
    this.inputGate.connect(this.filter);
    // Normal path: filter -> liveDelay -> reverb
    this.filter.connect(this.liveDelay);
    // Freeze path: filter -> freezeInGate (0 by default) -> freezeDelay -> reverb
    this.freezeInGate = new Tone.Gain(0);
    this.filter.connect(this.freezeInGate);
    this.freezeInGate.connect(this.freezeDelay);
  }

  // --- Freeze routing helpers (not needed with dual-path design) ---

  async ensureStarted() {
    if (!this.started) {
      await Tone.start();
      this.started = true;
    }
  }

  private synthFor(shapeKey: string, waveform: string, velocity: number) {
    const synthId = `${shapeKey}_${waveform}`;
    if (!this.polys[synthId]) {
      // Velocity-based envelope: faster impact = shorter attack/sustain
      const velocityFactor = Math.max(0.1, Math.min(1, velocity));
      const attack = 0.005 + (1 - velocityFactor) * 0.05; // 0.005s to 0.055s
      const decay = 0.1 + (1 - velocityFactor) * 0.6; // 0.1s to 0.7s
      const sustain = (1 - velocityFactor) * 0.3; // 0 to 0.3
      const release = 0.05 + (1 - velocityFactor) * 0.4; // 0.05s to 0.45s
      
      const synth = new Tone.MonoSynth({
        oscillator: { type: waveform as any },
        envelope: { attack, decay, sustain, release },
        filterEnvelope: { 
          attack: attack * 0.5, 
          decay: decay * 0.5, 
          sustain: sustain * 0.5, 
          release: release * 0.5, 
          baseFrequency: 400, 
          octaves: 2 
        }
      });
      const trem = new Tone.Tremolo({ frequency: 5, depth: 0.5 }).start();
      synth.connect(trem);
      trem.connect(this.inputGate);
      this.polys[synthId] = synth;
      this.tremolos[synthId] = trem;
    }
    return this.polys[synthId];
  }

  // Map hue (0-360) to waveform type
  private hueToWaveform(hue: number): string {
    const normalizedHue = hue % 360;
    if (normalizedHue < 60) return 'sine';
    if (normalizedHue < 120) return 'triangle';
    if (normalizedHue < 180) return 'sawtooth';
    if (normalizedHue < 240) return 'square';
    if (normalizedHue < 300) return 'fatsawtooth';
    return 'fmtriangle';
  }

  // Build G Dorian notes G3..G6 inclusive
  private buildGDorianNotes(): string[] {
    // Explicit list from G2 up to (not beyond) B5 in G Dorian
    return [
      'G2','A2','Bb2',
      'C3','D3','E3','F3','G3',
      'A3','Bb3','C4','D4','E4','F4','G4',
      'A4','Bb4','C5','D5','E5','F5','G5',
      'A5','Bb5'
    ];
  }

  // Public helpers for mapping size/index
  getScaleLength(): number { return this.GDORIAN_NOTES.length; }

  getIndexForSize(size: number): number {
    const clamped = Math.max(this.MIN_SIZE, Math.min(this.MAX_SIZE, size));
    const t = (clamped - this.MIN_SIZE) / (this.MAX_SIZE - this.MIN_SIZE);
    const inv = 1 - t;
    const idx = Math.round(inv * (this.GDORIAN_NOTES.length - 1));
    return Math.max(0, Math.min(this.GDORIAN_NOTES.length - 1, idx));
  }

  // Map size to nearest G Dorian note (larger = lower pitch)
  private sizeToScaleNote(size: number): string {
    const clamped = Math.max(this.MIN_SIZE, Math.min(this.MAX_SIZE, size));
    const t = (clamped - this.MIN_SIZE) / (this.MAX_SIZE - this.MIN_SIZE); // 0..1 small->large
    const inv = 1 - t; // large -> low index
    const idx = Math.max(0, Math.min(this.GDORIAN_NOTES.length - 1, Math.round(inv * (this.GDORIAN_NOTES.length - 1))));
    return this.GDORIAN_NOTES[idx];
  }

  // Update filter based on angular velocity (spin)
  private updateFilterFromSpin(spin: number) {
    // PhysicsEngine caps |angularVelocity| around 0.08; normalise against that
    const MAX_SPIN = 0.08;
    const clamped = Math.max(0, Math.min(MAX_SPIN, Math.abs(spin)));
    const norm = clamped / MAX_SPIN; // 0..1
    const minFreq = 400;
    const maxFreq = 12000;
    const freq = minFreq + norm * (maxFreq - minFreq);
    this.filter.frequency.rampTo(freq, 0.05);
  }

  // Main trigger method with new parameters
  triggerCollision(collision: CollisionData) {
    const now = Date.now();
    
    // Clean up old collision groups
    this.recentCollisions = this.recentCollisions.filter(
      group => now - group.timestamp < this.CHORD_WINDOW_MS * 2
    );
    
    // Check if this collision should be part of a chord
    let chordGroup = this.recentCollisions.find(
      group => now - group.timestamp < this.CHORD_WINDOW_MS
    );
    
    if (!chordGroup) {
      // Create new chord group
      chordGroup = { collisions: [], timestamp: now };
      this.recentCollisions.push(chordGroup);
    }
    
    chordGroup.collisions.push(collision);
    
    // Update filter based on spin
    this.updateFilterFromSpin(collision.spin);
    
    // If this is the first collision in the group, schedule chord playback
    if (chordGroup.collisions.length === 1) {
      setTimeout(() => this.playChordGroup(chordGroup!), this.CHORD_WINDOW_MS);
    }
  }

  private playChordGroup(chordGroup: ChordGroup) {
    if (chordGroup.collisions.length === 1) {
      // Single note
      const collision = chordGroup.collisions[0];
      this.playSingleNote(collision);
    } else {
      // Chord - play all notes with slight timing offset to avoid conflicts
      chordGroup.collisions.forEach((collision, index) => {
        this.playSingleNoteWithOffset(collision, index * 0.002); // 2ms offset per note
      });
    }
  }

  private playSingleNoteWithOffset(collision: CollisionData, offset: number = 0) {
    const waveform = collision.waveform || this.hueToWaveform(collision.hue);
    const noteName = (collision.noteIndex !== undefined)
      ? this.GDORIAN_NOTES[Math.max(0, Math.min(this.GDORIAN_NOTES.length - 1, collision.noteIndex))]
      : this.sizeToScaleNote(collision.size);
    const synth = this.synthFor(collision.shapeId, waveform, collision.velocity);
    const synthId = `${collision.shapeId}_${waveform}`;
    const trem = this.tremolos[synthId];
    
    // Set tremolo rate by morph level (volume vibrato): 3..6 Hz (halved max)
    const morph = Math.max(0, Math.min(1, collision.morphLevel ?? 0));
    const vibRate = 3 + morph * 3;
    if (trem) {
      trem.frequency.rampTo(vibRate, 0.05);
      trem.depth.rampTo(0.6, 0.05);
    }

    // Per-note envelope: attack/decay from velocity; sustain/release from morph
    const v = Math.max(0.1, Math.min(1, collision.velocity));
    const attack = 0.005 + (1 - v) * 0.05;
    const decay = 0.1 + (1 - v) * 0.6;
    const sustain = 0.1 + morph * 0.7; // 0.1..0.8
    // Total audible length budget (gate + release), cap at 3s
    const totalBudget = Math.min(3, 0.25 + morph * 2.75);
    // Make release the majority of the note: 60%..80% of total as morph increases
    const releaseRatio = 0.6 + morph * 0.2;
    const release = Math.max(0.05, totalBudget * releaseRatio);
    const gateDuration = Math.max(0.05, totalBudget - release);
    (synth.envelope as any).attack = attack;
    (synth.envelope as any).decay = decay;
    (synth.envelope as any).sustain = sustain;
    (synth.envelope as any).release = release;

    // Use gateDuration (most of sound in release tail per requirement)
    const durationSeconds = gateDuration;
    
    // Schedule slightly in the future to avoid timing conflicts
    const now = Tone.now();
    const startTime = now + 0.01 + offset; // 10ms + offset in the future
    
    synth.triggerAttackRelease(noteName, durationSeconds, startTime, collision.velocity);
  }

  private playSingleNote(collision: CollisionData) {
    const waveform = collision.waveform || this.hueToWaveform(collision.hue);
    const noteName = (collision.noteIndex !== undefined)
      ? this.GDORIAN_NOTES[Math.max(0, Math.min(this.GDORIAN_NOTES.length - 1, collision.noteIndex))]
      : this.sizeToScaleNote(collision.size);
    const synth = this.synthFor(collision.shapeId, waveform, collision.velocity);
    const synthId = `${collision.shapeId}_${waveform}`;
    const trem = this.tremolos[synthId];
    
    // Set tremolo rate by morph level (volume vibrato): 3..6 Hz (halved max)
    const morph = Math.max(0, Math.min(1, collision.morphLevel ?? 0));
    const vibRate = 3 + morph * 3;
    if (trem) {
      trem.frequency.rampTo(vibRate, 0.05);
      trem.depth.rampTo(0.6, 0.05);
    }

    // Per-note envelope adjustments
    const v = Math.max(0.1, Math.min(1, collision.velocity));
    const attack = 0.005 + (1 - v) * 0.05;
    const decay = 0.1 + (1 - v) * 0.6;
    const sustain = 0.1 + morph * 0.7;
    const totalBudget = Math.min(3, 0.25 + morph * 2.75);
    const releaseRatio = 0.6 + morph * 0.2;
    const release = Math.max(0.05, totalBudget * releaseRatio);
    const gateDuration = Math.max(0.05, totalBudget - release);
    (synth.envelope as any).attack = attack;
    (synth.envelope as any).decay = decay;
    (synth.envelope as any).sustain = sustain;
    (synth.envelope as any).release = release;

    const durationSeconds = gateDuration;
    
    // Schedule slightly in the future to avoid timing conflicts
    const now = Tone.now();
    const startTime = now + 0.01; // 10ms in the future
    
    synth.triggerAttackRelease(noteName, durationSeconds, startTime, collision.velocity);
  }

  // Legacy method for backward compatibility
  trigger(shape: string, velocity = 0.8) {
    // Create a basic collision data for legacy calls
    const collision: CollisionData = {
      shapeId: shape,
      velocity,
      size: 30, // default size
      hue: 180, // default hue (triangle wave)
      morphLevel: 0.5, // default morph
      timestamp: Date.now(),
      spin: 0
    };
    this.triggerCollision(collision);
  }

  modulateWithPointer(p: Pointer) {
    // Map Y to reverb wet only (filter is driven by spin)
    const wet = Math.min(0.7, (1 - p.y / (window.innerHeight || 1)) * 0.7);
    this.reverb.wet.rampTo(wet, 0.1);
  }

  // Freeze: loop current ambience by maxing delay feedback and muting new input
  startFreeze() {
    // Alias to press behavior for backward compatibility
    this.freezePress();
  }

  // Press-to-capture: reset delay, route input through it, and record while pressed
  freezePress() {
    if (this.freezeState === 'recording') return;
    // Recreate freeze delay to clear previous content
    const oldFreeze = this.freezeDelay;
    this.freezeDelay = new Tone.PingPongDelay({ delayTime: 0.30, feedback: 0.95, wet: 1 }).connect(this.reverb);
    try { (oldFreeze as any).disconnect?.(); } catch {}
    oldFreeze.dispose();
    // Reconnect gate to new freeze delay
    try { (this.freezeInGate as any).disconnect?.(); } catch {}
    this.filter.connect(this.freezeInGate);
    this.freezeInGate.connect(this.freezeDelay);
    // Open freeze input gate during capture
    this.freezeInGate.gain.rampTo(1, 0.02);
    // Ensure input path is enabled
    this.inputGate.gain.rampTo(1, 0.02);
    this.freezeState = 'recording';
    this.frozen = true;
  }

  // Release-to-playback: keep loop running to reverb, but bypass delay for new input
  freezeRelease() {
    if (this.freezeState !== 'recording') return;
    // Keep the freeze delay running and audible
    this.freezeDelay.feedback.rampTo(0.98, 0.02);
    this.freezeDelay.wet.rampTo(1, 0.02);
    // Close gate so new input no longer feeds the freeze buffer
    this.freezeInGate.gain.rampTo(0, 0.02);
    // Live path remains active through liveDelay -> reverb
    this.inputGate.gain.rampTo(1, 0.02);
    this.freezeState = 'playing';
  }

  // Clear the frozen buffer and restore normal routing
  clearFreezeBuffer() {
    // Recreate freeze delay to flush any internal buffer and close input gate
    const oldFreeze = this.freezeDelay;
    this.freezeDelay = new Tone.PingPongDelay({ delayTime: 0.25, feedback: 0.98, wet: 1 }).connect(this.reverb);
    try { (oldFreeze as any).disconnect?.(); } catch {}
    oldFreeze.dispose();
    try { (this.freezeInGate as any).disconnect?.(); } catch {}
    this.filter.connect(this.freezeInGate);
    this.freezeInGate.connect(this.freezeDelay);
    this.freezeInGate.gain.rampTo(0, 0.02);
    // Live path stays as-is
    this.inputGate.gain.rampTo(1, 0.02);
    this.freezeState = 'idle';
    this.frozen = false;
  }

  // --- Mute controls ---
  setMuted(muted: boolean) {
    this.muted = !!muted;
    try {
      (this.volume as any).mute = this.muted;
    } catch {
      // fallback: set very low volume
      const targetDb = this.muted ? -96 : -8;
      this.volume.volume.rampTo(targetDb, 0.02);
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
  }

  isMuted(): boolean {
    return this.muted;
  }

  dispose() {
    Object.values(this.polys).forEach(s => s.dispose());
    this.filter.dispose();
    this.liveDelay.dispose();
    this.freezeDelay.dispose();
    this.freezeInGate.dispose();
    this.reverb.dispose();
    this.limiter.dispose();
    this.volume.dispose();
    this.inputGate.dispose();
  }
}
