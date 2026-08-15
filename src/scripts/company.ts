/**
 * The Company stage — the adoption gap, priced.
 *
 * Two identical programs carry the same hidden flaw. One organisation measures
 * at discovery and catches it there; the other finds out at Phase III. Same
 * flaw, different bill — which is the gap the company exists to close.
 *
 * Every label is fitted to the panel before it is drawn: shortened, shrunk, or
 * dropped to its endpoints. The numbers are the point, so nothing may overflow.
 */

import { createStage, runLoop } from './canvasStage';

const GATES = ['DISCOVERY', 'PRECLIN', 'PH I', 'PH II', 'PH III'];
const SHORT = ['DISC', 'PRE', 'I', 'II', 'III'];
/** Cumulative burn when the flaw is found at each gate. */
const COST = [2e6, 30e6, 80e6, 300e6, 1.4e9];

/** Phase boundaries, in seconds through the loop. */
const T = { start: 0.8, scan: 2.2, caught: 3.4, g: [3.4, 4.9, 6.4, 7.9], fail: 9.4, card: 10.8, end: 14.5 };

const money = (v: number) =>
  v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : v >= 1e6 ? `$${Math.round(v / 1e6)}M` : `$${Math.round(v / 1e3)}K`;

export interface CompanyHandle {
  destroy(): void;
}

export function initCompany(root: HTMLElement): CompanyHandle {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-canvas]');
  if (!canvas) return { destroy() {} };

  const handle = createStage(canvas);
  if (!handle) return { destroy() {} };

  const { stage: s, measure } = handle;
  const { ctx } = s;
  const panel = canvas.parentElement as HTMLElement;
  let t = 0;

  /** A program on its track. The accent notch is the flaw it is carrying. */
  const marker = (x: number, y: number, size: number, flawed: boolean) => {
    ctx.save();
    ctx.fillStyle = s.ink;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
    if (flawed) {
      ctx.fillStyle = s.acc;
      ctx.fillRect(x + size - 5, y - size, 5, 5);
    }
    ctx.restore();
  };

  const loop = runLoop(panel, (dt) => {
    measure();
    t += dt;
    if (t > T.end) t = 0;

    ctx.clearRect(0, 0, s.w, s.h);
    const tight = s.w < 560;
    const x0 = tight ? 26 : 52;
    const x1 = s.w - (tight ? 26 : 52);
    const yA = s.h * 0.34;
    const yB = s.h * 0.62;
    const gx = (i: number) => x0 + 80 + (x1 - x0 - 110) * (i / (GATES.length - 1));
    const ms = tight ? 7 : 9;
    const availW = x1 - x0;

    // Fit to width: shrink or shorten anything that would overflow the panel.
    let head = 'ONE HIDDEN FLAW. TWO WAYS TO FIND IT.';
    let headFs = 11;
    if (s.mText(head, headFs, 800, '0.16em') > availW) head = 'ONE FLAW. TWO WAYS TO FIND IT.';
    while (headFs > 8 && s.mText(head, headFs, 800, '0.16em') > availW) headFs -= 0.5;
    s.txt(head, x0, tight ? 54 : 66, headFs, s.dim, 800, '0.16em');

    // Three things share the row above each track: the track's own label on the
    // left, the burn meter on the right, and — on the top track only — the seam
    // label centred on the seam. The meter bounds every label; the seam bounds
    // the top one, which is otherwise long enough to run straight through it.
    const meterRoom = s.mText('$1.4B', (tight ? 15 : 19) + 4, 800, '0.02em') + 14;
    const seamX = (gx(0) + gx(1)) / 2;
    const measureW = s.mText('MEASURE', 8.5, 800, '0.14em');
    const seamRoom = seamX - measureW / 2 - 12 - x0;

    const tracks: [number, string, string][] = [
      [yA, 'MEASURED AT DISCOVERY', 'AT DISCOVERY'],
      [yB, 'MEASURED BY PHASE III', 'BY PHASE III'],
    ];
    let topLabelW = 0;
    for (const [y, long, short] of tracks) {
      s.line(x0, y, x1 - 28, y, s.ink, 2);
      const room = y === yA ? Math.min(availW - meterRoom, seamRoom) : availW - meterRoom;
      let label = long;
      let lfs = 9;
      if (s.mText(label, lfs, 800, '0.14em') > room) label = short;
      while (lfs > 7 && s.mText(label, lfs, 800, '0.14em') > room) lfs -= 0.5;
      if (y === yA) topLabelW = s.mText(label, lfs, 800, '0.14em');
      s.txt(label, x0, y - 34, lfs, y === yA ? s.acc : s.dim, 800, '0.14em');
    }

    // Gates — full names, short names, or just the endpoints, whichever fits.
    const gap = gx(1) - gx(0);
    const fitsAll = (names: string[], fs: number) => names.every((n) => s.mText(n, fs, 800, '0.12em') < gap - 6);
    const gnames = fitsAll(GATES, 8.5) && !tight ? GATES : fitsAll(SHORT, 8.5) ? SHORT : null;
    GATES.forEach((_, i) => {
      const x = gx(i);
      for (const y of [yA, yB]) s.line(x, y - 8, x, y + 8, s.ink, 2);
      if (gnames) s.ctext(gnames[i]!, x, yB + 26, 8.5, s.dim, 800, '0.12em');
      else if (i === 0) s.txt(SHORT[i]!, x, yB + 26, 8.5, s.dim, 800, '0.12em');
      else if (i === 4) s.ctext(SHORT[i]!, x, yB + 26, 8.5, s.dim, 800, '0.12em');
    });

    // Validation seam, on the top track only — between DISC and PRECLIN.
    s.line(seamX, yA - 26, seamX, yA + 26, s.acc, 2, [5, 4]);
    // Even shortened and shrunk to 7px the track label can outgrow the room
    // before the seam. Drop the seam label rather than overlap it: the dashed
    // line still marks the moment, and the copy beside the panel carries it.
    if (!tight && x0 + topLabelW + 12 <= seamX - measureW / 2) {
      s.ctext('MEASURE', seamX, yA - 32, 8.5, s.acc, 800, '0.14em');
    }

    // The caught label is the one string that can run off the right edge.
    const caughtLabel = () =>
      s.mText(`FLAW, CAUGHT — ${money(COST[0]!)}`, 9, 800, '0.12em') + seamX + 26 > x1
        ? `CAUGHT — ${money(COST[0]!)}`
        : `FLAW, CAUGHT — ${money(COST[0]!)}`;

    // ── Top program: caught at the seam, flaw extracted, advances clean.
    let burnA = 0;
    if (t < T.start) {
      marker(gx(0), yA, ms, true);
    } else if (t < T.scan) {
      const p = s.ease(s.clamp01((t - T.start) / (T.scan - T.start)));
      marker(s.lerp(gx(0), seamX, p), yA, ms, true);
      burnA = COST[0]! * p * 0.6;
    } else if (t < T.caught) {
      marker(seamX, yA, ms, false);
      burnA = COST[0]! * s.clamp01(0.6 + (0.4 * (t - T.scan)) / (T.caught - T.scan));
      ctx.save();
      ctx.strokeStyle = s.acc;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(seamX - ms - 8, yA - ms - 8, ms * 2 + 16, ms * 2 + 16);
      ctx.restore();
      // The flaw, pulled out of the program.
      const fp = s.ease(s.clamp01((t - T.scan) / 0.6));
      const fy = yA - 32 - 30 * fp;
      ctx.fillStyle = s.acc;
      ctx.fillRect(seamX + 16 - 3, fy - 3, 6, 6);
      if (fp > 0.9) s.txt(caughtLabel(), seamX + 26, fy + 3, 9, s.acc, 800, '0.12em');
    } else {
      burnA = COST[0]!;
      const p = s.ease(s.clamp01((t - T.caught) / 2.6));
      marker(s.lerp(seamX, gx(4), p), yA, ms, false);
      s.txt(caughtLabel(), seamX + 26, yA - 59, 9, s.acc, 800, '0.12em');
      ctx.fillStyle = s.acc;
      ctx.fillRect(seamX + 16 - 3, yA - 62 - 3, 6, 6);
      if (p >= 1) {
        ctx.save();
        ctx.strokeStyle = s.acc;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'butt';
        ctx.beginPath();
        ctx.moveTo(gx(4) + 16, yA - 2);
        ctx.lineTo(gx(4) + 21, yA + 5);
        ctx.lineTo(gx(4) + 31, yA - 9);
        ctx.stroke();
        ctx.restore();
        if (!tight) s.rtxt('ADVANCES ON EVIDENCE', gx(4), yA + 24, 8.5, s.ink, 800, '0.12em');
      }
    }

    // ── Bottom program: the same flaw rides every gate; the burn compounds.
    let burnB = 0;
    if (t < T.start) {
      marker(gx(0), yB, ms, true);
    } else if (t < T.fail) {
      // Which leg is it on?
      const legs = [T.start, ...T.g];
      let leg = 0;
      while (leg < 4 && t >= legs[leg + 1]!) leg++;
      const lp = s.ease(s.clamp01((t - legs[leg]!) / ((legs[leg + 1] ?? T.fail) - legs[leg]!)));
      marker(s.lerp(gx(leg), gx(Math.min(4, leg + 1)), lp), yB, ms, true);
      burnB = s.lerp(leg === 0 ? 0 : COST[leg - 1]!, COST[leg]!, lp);
    } else {
      burnB = COST[4]!;
      const bx = gx(4);
      ctx.save();
      ctx.strokeStyle = s.dim;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(bx - ms, yB - ms);
      ctx.lineTo(bx + ms, yB + ms);
      ctx.moveTo(bx + ms, yB - ms);
      ctx.lineTo(bx - ms, yB + ms);
      ctx.stroke();
      ctx.restore();
      const found =
        s.mText('SAME FLAW, FOUND HERE', 9, 800, '0.12em') > bx - 4 - x0 ? 'FOUND HERE' : 'SAME FLAW, FOUND HERE';
      s.rtxt(found, bx - 4, yB - 18, 9, s.dim, 800, '0.12em');
    }

    // Burn meters — the numbers pharma actually feels.
    if (t > T.start) {
      s.rtxt(money(burnA), x1, yA - 34, tight ? 15 : 19, burnA >= COST[0]! ? s.ink : s.dim, 800, '0.02em');
      const hot = burnB > COST[2]!;
      s.rtxt(money(burnB), x1, yB - 34, (tight ? 15 : 19) + (hot ? 4 : 0), hot ? s.acc : s.dim, 800, '0.02em');
    }

    // ── The close: same flaw, different bill → request access.
    if (t > T.card) {
      const p = s.ease(s.clamp01((t - T.card) / 0.5));
      const cy = s.h - (tight ? 96 : 108);
      ctx.save();
      ctx.globalAlpha = p;

      let big = tight ? 17 : 22;
      const head1 = 'SAME FLAW.';
      const head2 = ' 700× THE PRICE.';
      while (big > 11 && s.mText(head1 + head2, big, 800, '0.01em') > availW) big -= 1;
      s.txt(head1, x0, cy, big, s.ink, 800, '0.01em');
      s.txt(head2, x0 + s.mText(head1, big, 800, '0.01em'), cy, big, s.acc, 800, '0.01em');

      let cta = 'KNOW AT DISCOVERY — REQUEST ACCESS';
      const ctaFs = 10.5;
      if (s.mText(cta, ctaFs, 800, '0.16em') > availW - 40) cta = 'REQUEST ACCESS';
      s.txt(cta, x0, cy + 26, ctaFs, s.ink, 800, '0.16em');

      // A dashed run toward the Request access button, top right.
      const ax0 = x0 + s.mText(cta, ctaFs, 800, '0.16em') + 14;
      if (x1 - 14 - ax0 > 24) {
        s.line(ax0, cy + 22, x1 - 14, cy + 22, s.acc, 1.5, [4, 4]);
        s.line(x1 - 14, cy + 22, x1 - 14, 14, s.acc, 1.5, [4, 4]);
        ctx.beginPath();
        ctx.moveTo(x1 - 19, 22);
        ctx.lineTo(x1 - 14, 12);
        ctx.lineTo(x1 - 9, 22);
        ctx.closePath();
        ctx.fillStyle = s.acc;
        ctx.fill();
      }
      ctx.restore();
    }
  });

  return {
    destroy() {
      loop.destroy();
      handle.destroy();
    },
  };
}
