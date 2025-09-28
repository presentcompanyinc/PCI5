import { PhysicsEngine, MemphisBody } from './PhysicsEngine';

export class VisualEffects {
  private ctx: CanvasRenderingContext2D;
  private particles: { x: number; y: number; vx: number; vy: number; life: number; hue: number }[] = [];
  private trail: { x: number; y: number; life: number }[] = [];
  private t = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  spawnBurst(x: number, y: number, hue: number) {
    for (let i = 0; i < 16; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 2 + Math.random() * 3;
      this.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, hue });
    }
  }

  render(physics: PhysicsEngine) {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);

    // Background with subtle Memphis texture
    ctx.fillStyle = '#f7f5ef';
    ctx.fillRect(0, 0, width, height);
    this.drawMemphisPattern();

    // Bodies
    const bodies = physics.getBodies();
    // Only log occasionally to avoid spam
    if (Math.random() < 0.01) console.log(`Rendering ${bodies.length} bodies on ${width}x${height} canvas`);
    this.t += 0.016;
    bodies.forEach(b => this.drawBody(b));

    // Particles
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;
      ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${p.life})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Mouse trail
    this.trail = this.trail.filter(t => t.life > 0);
    this.trail.forEach(t => {
      t.life = Math.max(0, t.life - 0.02);
      const r = Math.max(0.1, 6 * t.life);
      if (r <= 0.1) return;
      ctx.fillStyle = `rgba(0,0,0,${0.15 * t.life})`;
      ctx.beginPath();
      ctx.arc(t.x, t.y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  private drawBody(b: MemphisBody) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    const baseHex = (b as any).colorHex ? String((b as any).colorHex) : undefined;
    const hue = b.hue;
    const satLevel = Math.max(0, Math.min(1, (b as any).satLevel ?? 0));
    // Default very desaturated state (15% sat), brighten to near full with satLevel
    const sat = 15 + satLevel * 84; // 15%..99%
    const color = baseHex ? this.adjustHexSaturation(baseHex, sat / 100) : `hsl(${hue}, ${sat}%, 55%)`;
    const stroke = 'rgba(0,0,0,0.85)';
    ctx.lineWidth = 3;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = color;
    // Liquid parametric rendering for all shapes (no hard corners)
    this.drawLiquidBlob(b);
    ctx.restore();
  }

  private adjustHexSaturation(hex: string, s: number) {
    // Convert HEX->HSL to adjust saturation then back to CSS hsl()
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, l = (max + min) / 2, ss = 0;
    const d = max - min;
    if (d !== 0) {
      ss = d / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }
    ss = Math.max(0, Math.min(1, s));
    return `hsl(${Math.round(h)}, ${Math.round(ss * 100)}%, ${Math.round(l * 100)}%)`;
  }

  private prng(id: number, salt: number) {
    const x = Math.sin(id * 12.9898 + salt * 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  private drawLiquidBlob(b: MemphisBody) {
    const { ctx } = this;
    const w = (b.bounds.max.x - b.bounds.min.x);
    const h = (b.bounds.max.y - b.bounds.min.y);
    const baseR = Math.max(8, Math.min(w, h) * 0.5);
    const id = (b as any).id || (b as any)._id || 0;
    const freq1 = 2 + Math.floor(this.prng(id, 1) * 3); // 2..4
    const freq2 = 3 + Math.floor(this.prng(id, 2) * 4); // 3..6
    const phase1 = this.prng(id, 3) * Math.PI * 2;
    const phase2 = this.prng(id, 4) * Math.PI * 2;
    const speed = 0.5;
    const baseAmp = 0.35; // more dramatic
    const boost = ((b as any).morphBoost || 0);
    (b as any).morphBoost = boost * 0.2; // decay
    const amp = baseR * (baseAmp + boost * 0.5);

    const steps = 72;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const r = baseR + amp * (Math.sin(a * freq1 + this.t * speed + phase1) * 0.6 + Math.sin(a * freq2 + this.t * (speed * 0.6) + phase2) * 0.4);
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  private drawMemphisPattern() {
    const { ctx } = this;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.save();
    ctx.globalAlpha = 0.08;
    ctx.strokeStyle = '#000';
    for (let y = 0; y < h; y += 60) {
      for (let x = 0; x < w; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 10);
        ctx.bezierCurveTo(x + 20, y, x + 40, y + 20, x + 50, y + 10);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  addTrail(x: number, y: number) {
    this.trail.push({ x, y, life: 1 });
  }
}
