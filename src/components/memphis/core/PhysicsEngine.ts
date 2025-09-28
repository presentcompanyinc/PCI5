import Matter, { Engine, World, Bodies, Body, Composite, Runner, Events, Vector, Query } from 'matter-js';

export type MemphisBody = Body & { shapeType: 'circle' | 'polygon' | 'triangle' | 'rect' | 'squiggle' | 'blob' | 'star' | 'spiral' | 'crystal' | 'flower'; hue: number; elasticity: number; massFactor: number; colorHex?: string };

interface PhysicsOptions {
  width: number;
  height: number;
}

export class PhysicsEngine {
  engine: Engine;
  world: World;
  runner: Runner;
  width: number;
  height: number;
  pointer?: { x: number; y: number };
  lastPointer?: { x: number; y: number };
  readonly maxSpeed = 3.2; // cap linear speed
  readonly maxAngular = 0.08; // much slower spin
  private walls: Body[] = [];
  private readonly wallThickness = 200;

  constructor(opts: PhysicsOptions) {
    this.width = opts.width;
    this.height = opts.height;
    this.engine = Engine.create({ enableSleeping: false });
    // Slow down simulation globally by 20%
    this.engine.timing.timeScale = 0.8;
    this.world = this.engine.world;
    // Asteroids-style: no gravity; objects drift
    this.world.gravity.y = 0;
    this.world.gravity.x = 0;
    this.runner = Runner.create();

    // Walls
    this.rebuildWalls();

    Events.on(this.engine, 'collisionStart', () => {/* handled by consumers via bodies data */});
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.rebuildWalls();
  }

  // Scale all dynamic bodies proportionally when the canvas size changes
  scaleScene(newWidth: number, newHeight: number) {
    if (newWidth <= 0 || newHeight <= 0) return;
    const sx = newWidth / this.width;
    const sy = newHeight / this.height;
    if (!isFinite(sx) || !isFinite(sy) || (sx === 1 && sy === 1)) {
      this.resize(newWidth, newHeight);
      return;
    }
    const bodies = Composite.allBodies(this.world).filter(b => !b.isStatic) as MemphisBody[];
    const uniformScale = Math.min(sx, sy);
    bodies.forEach(b => {
      // Scale geometry around current center
      Body.scale(b, sx, sy);
      // Reposition
      Body.setPosition(b, { x: b.position.x * sx, y: b.position.y * sy } as Vector);
      // Update stored size radius if present (used for audio mapping)
      if ((b as any).size) (b as any).size = (b as any).size * uniformScale;
    });
    this.resize(newWidth, newHeight);

    // Enforce total area cap: blobs' total area must not exceed 50% of canvas
    const canvasArea = this.width * this.height;
    const maxTotalArea = 0.5 * canvasArea;
    let totalArea = 0;
    bodies.forEach(b => {
      const r = (b as any).size || 0;
      if (r > 0) totalArea += Math.PI * r * r;
    });
    if (totalArea > maxTotalArea && totalArea > 0) {
      const k = Math.sqrt(maxTotalArea / totalArea);
      bodies.forEach(b => {
        Body.scale(b, k, k);
        if ((b as any).size) (b as any).size = (b as any).size * k;
      });
    }
  }

  private rebuildWalls() {
    // Remove existing walls
    if (this.walls.length) {
      this.walls.forEach(w => Composite.remove(this.world, w));
      this.walls = [];
    }
    const t = this.wallThickness;
    const top = Bodies.rectangle(this.width / 2, -t / 2, this.width, t, { isStatic: true });
    const bottom = Bodies.rectangle(this.width / 2, this.height + t / 2, this.width, t, { isStatic: true });
    const left = Bodies.rectangle(-t / 2, this.height / 2, t, this.height, { isStatic: true });
    const right = Bodies.rectangle(this.width + t / 2, this.height / 2, t, this.height, { isStatic: true });
    this.walls = [top, bottom, left, right];
    Composite.add(this.world, this.walls);
  }

  addBody(body: MemphisBody) {
    Composite.add(this.world, body);
  }

  clearDynamic() {
    Composite.allBodies(this.world)
      .filter(b => !b.isStatic)
      .forEach(b => Composite.remove(this.world, b));
  }

  step() {
    if (this.pointer && this.lastPointer) {
      // Direct-touch interaction: only affect shapes under the pointer
      const point = this.pointer as Vector;
      const bodies = Composite.allBodies(this.world).filter(b => !b.isStatic) as MemphisBody[];
      const hits = Query.point(bodies, point);
      if (hits.length) {
        const delta = Vector.sub(this.pointer, this.lastPointer);
        const impulse = Vector.mult(delta, 0.004); // gentle nudge along pointer motion
        hits.forEach(b => {
          Body.applyForce(b as Body, (b as Body).position, impulse);
          // tiny torque for tactile feel
          Body.setAngularVelocity(b as Body, (b as Body).angularVelocity + 0.004 * Math.sign(delta.x));
        });
      }
    }

    // Global damping and speed caps
    const bodiesAll = Composite.allBodies(this.world).filter(b => !b.isStatic) as MemphisBody[];
    bodiesAll.forEach(b => {
      // Very light damping
      Body.setVelocity(b, Vector.mult(b.velocity, 0.997));
      // Linear speed cap
      const v = Vector.magnitude(b.velocity);
      if (v > this.maxSpeed) {
        const scaled = Vector.mult(Vector.normalise(b.velocity), this.maxSpeed);
        Body.setVelocity(b, scaled);
      }
      // Velocity floor: prevent full stop
      if (v < 0.12) {
        const jitter = { x: (Math.random() - 0.5) * 0.04, y: (Math.random() - 0.5) * 0.04 };
        Body.setVelocity(b, Vector.add(b.velocity, jitter));
      }
      // Angular damping and cap
      let av = b.angularVelocity * 0.996;
      if (Math.abs(av) > this.maxAngular) av = this.maxAngular * Math.sign(av);
      // Angular floor
      if (Math.abs(av) < 0.002) av = 0.002 * Math.sign(av || 1);
      Body.setAngularVelocity(b, av);

      // Saturation control: hold at max for 8s after boost, then fade over ~30s
      const dt = 1 / 60;
      let hold: number = (b as any).satHold ?? 0; // seconds remaining to hold max saturation
      // External boost this frame? reset hold to 8s
      if ((b as any).satTarget === 1) hold = 8;
      (b as any).satTarget = 0;
      hold = Math.max(0, hold - dt);
      (b as any).satHold = hold;

      // Tween: ramp up faster while holding; when hold=0, fade out over ~30s
      const upRate = (1 / (60 * 1.5)) * 1.1; // +10% faster
      const downRate = 1 / (60 * 30);
      const target = hold > 0 ? 1 : 0;
      let level = (b as any).satLevel ?? 0;
      if (level < target) level = Math.min(target, level + upRate);
      else if (level > target) level = Math.max(target, level - downRate);
      (b as any).satLevel = level;
    });

    Engine.update(this.engine, 1000 / 60);
  }

  applyPointerField(opts: { x: number; y: number; primary: boolean; secondary: boolean }) {
    // Repurpose as simple move tracker for touch interaction
    if (this.pointer) this.lastPointer = { ...this.pointer };
    this.pointer = { x: opts.x, y: opts.y };
  }

  pointerDown(_button: number, x: number, y: number) {
    // Only record position for touch interactions
    this.pointer = { x, y };
    this.lastPointer = { x, y };
  }

  pointerUp(_x?: number, _y?: number) {
    // No special behavior; stop tracking pointer movement
    this.pointer = undefined;
    this.lastPointer = undefined;
  }

  getBodies(): MemphisBody[] {
    return Composite.allBodies(this.world).filter(b => !b.isStatic) as MemphisBody[];
  }

  getHitsAt(x: number, y: number): MemphisBody[] {
    const bodies = this.getBodies();
    return Query.point(bodies, { x, y } as Vector) as MemphisBody[];
  }

  dispose() {
    Runner.stop(this.runner);
    // Matter cleans on GC; keep simple here
  }
}
