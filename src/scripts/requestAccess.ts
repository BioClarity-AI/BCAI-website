/**
 * The Request access stage — one email's journey, on a nine second loop.
 *
 * It flies in, passes a very serious screening, lands in an inbox that has been
 * waiting all day, and is read by a human. The page asks for an email; this is
 * the page being honest about what happens to it, and enjoying itself.
 */

import { createStage, runLoop } from './canvasStage';

/** Seconds in one loop. */
const LOOP = 9;
/** Phase boundaries: fly in → gate scan → verdict → fly on → arrive → joy. */
const P = { fly1: 1.6, scan: 3.1, verd: 3.9, fly2: 5.2, eat: 5.8 };
const CHECKS = ['NICE HUMAN?', 'REAL SCIENCE?', 'SPAM?'];

interface Confetto {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  accent: boolean;
}

export interface RequestAccessHandle {
  destroy(): void;
}

export function initRequestAccess(root: HTMLElement): RequestAccessHandle {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-canvas]');
  if (!canvas) return { destroy() {} };

  const handle = createStage(canvas);
  if (!handle) return { destroy() {} };

  const { stage: s, measure } = handle;
  const { ctx } = s;
  const panel = canvas.parentElement as HTMLElement;

  let t = 0;
  let burst = false;
  const confetti: Confetto[] = [];

  const envelope = (x: number, y: number, size: number, wob: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(wob);
    ctx.fillStyle = s.bg;
    ctx.strokeStyle = s.ink;
    ctx.lineWidth = 2;
    ctx.fillRect(-size, -size * 0.62, size * 2, size * 1.24);
    ctx.strokeRect(-size, -size * 0.62, size * 2, size * 1.24);
    ctx.beginPath();
    ctx.moveTo(-size, -size * 0.62);
    ctx.lineTo(0, size * 0.14);
    ctx.lineTo(size, -size * 0.62);
    ctx.stroke();
    ctx.fillStyle = s.acc;
    ctx.fillRect(size * 0.45, -size * 0.42, size * 0.34, size * 0.34); // stamp
    ctx.restore();
  };

  const loop = runLoop(panel, (dt) => {
    measure();
    t += dt;
    if (t > LOOP) {
      t = 0;
      burst = false;
      confetti.length = 0;
    }

    ctx.clearRect(0, 0, s.w, s.h);
    const tight = s.w < 520;
    const x0 = tight ? 24 : 48;
    const x1 = s.w - (tight ? 24 : 48);
    const midY = s.h * 0.48;
    const gateX = x0 + (x1 - x0) * 0.44;
    const boxX = x1 - (tight ? 54 : 78);
    const boxW = tight ? 44 : 64;
    const boxH = tight ? 34 : 46;
    const es = tight ? 15 : 20;

    s.txt('YOUR EMAIL — LIVE SIMULATION', x0, tight ? 54 : 64, 11, s.dim, 800, '0.18em');

    // The gate.
    ctx.save();
    ctx.strokeStyle = s.acc;
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(gateX, midY - 90);
    ctx.lineTo(gateX, midY + 90);
    ctx.stroke();
    ctx.restore();
    s.ctext('VERY SERIOUS', gateX, midY - 104, 9, s.acc, 800, '0.16em');
    s.ctext('SCREENING', gateX, midY - 92, 9, s.acc, 800, '0.16em');

    // The inbox: an open box with eyes — it has been waiting all day.
    const happy = t > P.eat;
    const blink = Math.sin(t * 2.1) > 0.97;
    ctx.save();
    ctx.strokeStyle = s.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX - boxW / 2, midY - boxH / 2 + 6, boxW, boxH);
    ctx.fillStyle = s.ink;
    const eyeY = midY - boxH / 2 - 12;
    if (happy) {
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      for (const d of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(boxX + d * 10, eyeY + 2, 5, Math.PI * 1.1, Math.PI * 1.9);
        ctx.stroke();
      }
    } else if (blink) {
      for (const d of [-1, 1]) ctx.fillRect(boxX + d * 10 - 3.5, eyeY, 7, 2);
    } else {
      // Eyes track the envelope.
      const ex = t < P.fly2 ? -2 : 0;
      for (const d of [-1, 1]) ctx.fillRect(boxX + d * 10 - 2.5 + ex, eyeY - 2.5, 5, 5);
    }
    ctx.restore();
    s.ctext('US', boxX, midY + boxH / 2 + 24, 10, s.ink, 800, '0.18em');
    s.txt('YOU', x0, midY + boxH / 2 + 24, 10, s.dim, 800, '0.18em');

    // The envelope's path.
    let caption = 'IT TRAVELS AT THE SPEED OF SINCERITY';
    if (t < P.fly1) {
      const p = s.ease(s.clamp01(t / P.fly1));
      envelope(s.lerp(x0 + es, gateX - 34, p), midY - Math.sin(p * Math.PI) * 34, es, Math.sin(t * 9) * 0.05);
    } else if (t < P.scan) {
      envelope(gateX - 34, midY, es, 0);
      const k = Math.min(CHECKS.length - 1, Math.floor((t - P.fly1) / 0.5));
      const done = (t - P.fly1) / 0.5;
      CHECKS.forEach((c, i) => {
        if (i > k) return;
        const y = midY + 34 + i * 16;
        s.txt(c, gateX + 12, y, 9, s.dim, 800, '0.12em');
        if (done > i + 0.7 || i < k) {
          const answer = i === 2 ? 'NO' : 'YES';
          s.txt(answer, gateX + 12 + s.mText(c, 9, 800, '0.12em') + 8, y, 9, i === 2 ? s.dim : s.acc, 800, '0.12em');
        }
      });
      caption = 'RIGOROUS. SCIENTIFIC. TAKES 0.8 SECONDS.';
      ctx.save();
      ctx.strokeStyle = s.acc;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(gateX - 34 - es - 8, midY - es - 8, es * 2 + 16, es * 2 + 16);
      ctx.restore();
    } else if (t < P.verd) {
      envelope(gateX - 34, midY, es, 0);
      const pop = 0.7 + 0.3 * s.ease(s.clamp01((t - P.scan) / 0.25));
      ctx.save();
      ctx.translate(gateX - 34, midY - es - 26);
      ctx.scale(pop, pop);
      ctx.fillStyle = s.acc;
      const vw = s.mText('PASS', 11, 800, '0.16em') + 16;
      ctx.fillRect(-vw / 2, -11, vw, 18);
      s.ctext('PASS', 0, 3, 11, s.bg, 800, '0.16em');
      ctx.restore();
      caption = 'OBVIOUSLY.';
    } else if (t < P.fly2) {
      const p = s.ease(s.clamp01((t - P.verd) / (P.fly2 - P.verd)));
      envelope(
        s.lerp(gateX - 34, boxX, p),
        midY - Math.sin(p * Math.PI) * 46 * (1 - p * 0.4),
        es * (1 - p * 0.25),
        Math.sin(t * 10) * 0.06,
      );
      caption = 'INCOMING HAPPINESS';
    } else if (t < P.eat) {
      const p = s.clamp01((t - P.fly2) / (P.eat - P.fly2));
      envelope(boxX, midY + p * 8, es * (1 - p), 0);
      caption = 'NOM.';
    } else {
      if (!burst) {
        burst = true;
        for (let i = 0; i < 26; i++) {
          confetti.push({
            x: boxX,
            y: midY - boxH / 2,
            vx: (Math.random() - 0.5) * 220,
            vy: -(90 + Math.random() * 190),
            a: 1,
            accent: Math.random() < 0.4,
          });
        }
      }
      const since = t - P.eat;
      caption = since < 1.6 ? 'A HUMAN READS IT. THE SAME DAY.' : 'P(REPLY) = 1.00';
      if (since > 0.3) {
        const pop = 0.7 + 0.3 * s.ease(s.clamp01((since - 0.3) / 0.3));
        ctx.save();
        ctx.translate(boxX, midY - boxH - 34);
        ctx.rotate(-0.06);
        ctx.scale(pop, pop);
        ctx.strokeStyle = s.acc;
        ctx.lineWidth = 2;
        const rw = s.mText('RECEIVED', 10, 800, '0.16em') + 18;
        ctx.strokeRect(-rw / 2, -12, rw, 20);
        s.ctext('RECEIVED', 0, 3, 10, s.acc, 800, '0.16em');
        ctx.restore();
      }
    }

    // Confetti.
    for (let i = confetti.length - 1; i >= 0; i--) {
      const c = confetti[i]!;
      c.vy += 320 * dt;
      c.x += c.vx * dt;
      c.y += c.vy * dt;
      c.a -= dt * 0.55;
      if (c.a <= 0) {
        confetti.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, c.a);
      ctx.fillStyle = c.accent ? s.acc : s.ink;
      ctx.fillRect(c.x - 2.5, c.y - 2.5, 5, 5);
      ctx.restore();
    }

    // Baseline + caption.
    s.line(x0, midY + boxH / 2 + 6, x1, midY + boxH / 2 + 6, s.ink, 2);
    const capFs = s.mText(caption, 12, 800, '0.14em') < x1 - x0 ? 12 : 10;
    s.txt(caption, x0, s.h - (tight ? 44 : 56), capFs, s.ink, 800, '0.14em');
  });

  return {
    destroy() {
      loop.destroy();
      handle.destroy();
    },
  };
}
