/**
 * The Services stage — four drawn scenes, one per service, on the shared
 * scene panel.
 *
 * Each scene argues its service rather than decorating it: candidates are
 * screened on whether they change a decision, vendor rankings are re-run on
 * your data, everything a lab produces settles into a foundation, and evidence
 * accumulates until a gate resolves.
 */

import { initScenePanel, type Scene, type ScenePanelHandle, type Stage } from './scenePanel';

/* ── SCENE 1 · Adoption screening ───────────────────────────────────────────
   Candidates are measured on whether they change a decision; usage alone never
   crosses the threshold. */

const CASES: readonly [string, number, number][] = [
  ['Target triage', 0.86, 0.34],
  ['Meeting summaries', 0.09, 0.94],
  ['Assay QC anomalies', 0.69, 0.48],
  ['Slide drafting', 0.07, 0.88],
  ['Trial site selection', 0.83, 0.29],
  ['Literature triage', 0.42, 0.81],
  ['Compound ranking', 0.77, 0.44],
  ['Chat rollout', 0.11, 0.97],
  ['Biomarker shortlist', 0.74, 0.26],
  ['Inbox triage', 0.05, 0.9],
  ['Cohort matching', 0.71, 0.56],
  ['Dose-response fits', 0.57, 0.37],
];

interface Candidate {
  name: string;
  impact: number;
  usage: number;
  age: number;
  x: number;
  y: number;
  verdict: 'adopt' | 'decline' | null;
  a: number;
}

function adoptionScene(): Scene {
  let t = 0;
  let queue: number[] = [];
  let live: Candidate[] = [];
  let rail: { name: string; x: number; y: number }[] = [];
  let screened = 0;
  let adopted = 0;
  let next = 0.3;

  const reset = () => {
    t = 0;
    queue = CASES.map((_, i) => i);
    live = [];
    rail = [];
    screened = 0;
    adopted = 0;
    next = 0.3;
  };

  return {
    label: 'AI ADOPTION STRATEGY',
    duration: 16.5,
    reset,
    draw(dt, s) {
      const { ctx } = s;
      const showRail = !s.narrow;
      const railW = showRail ? Math.min(230, Math.max(160, s.w * 0.26)) : 0;
      const px1 = showRail ? s.x1 - railW - 34 : s.x1;
      const tx = s.x0 + (px1 - s.x0) * 0.62;
      const px = (v: number) => s.x0 + (px1 - s.x0) * v;
      const py = (v: number) => s.y1 - (s.y1 - s.y0) * v;

      t += dt;
      if (t > next && live.length < 5) {
        if (!queue.length) queue = CASES.map((_, i) => i);
        const [name, impact, usage] = CASES[queue.shift()!]!;
        live.push({ name, impact, usage, age: 0, x: s.x0 - 60, y: py(usage), verdict: null, a: 1 });
        next = t + 1.15;
      }

      s.line(s.x0, s.y0 - 14, s.x0, s.y1, s.rule, 2);
      s.line(s.x0, s.y1, px1, s.y1, s.rule, 2);

      // Axis titles: bold ink, a long drawn arrow, sized to the room available.
      const axisArrow = (x: number, y: number, len: number) => {
        s.line(x, y, x + len, y, s.ink, 2);
        s.line(x + len, y, x + len - 6, y - 4, s.ink, 2);
        s.line(x + len, y, x + len - 6, y + 4, s.ink, 2);
      };
      // Without the rail the tally shares this baseline — leave room for it.
      const tallyW = showRail ? 0 : s.mText('SCREENED 88   ADOPTED 88', 9, 800, '0.14em') + 16;
      const availW = px1 - s.x0 - tallyW;
      let xLabel = 'CHANGES THE SCIENTIFIC DECISION';
      let xfs = 12;
      if (s.mText(xLabel, xfs, 800, '0.14em') + 46 > availW) xLabel = 'CHANGES THE DECISION';
      if (s.mText(xLabel, xfs, 800, '0.14em') + 46 > availW) xfs = 10;
      if (s.mText(xLabel, xfs, 800, '0.14em') + 40 > availW) xLabel = 'DECISION IMPACT';
      const xw = s.mText(xLabel, xfs, 800, '0.14em');
      s.txt(xLabel, s.x0, s.y1 + 26, xfs, s.ink, 800, '0.14em');
      axisArrow(s.x0 + xw + 10, s.y1 + 22, Math.max(24, Math.min(64, availW - xw - 16)));

      const availH = s.y1 - s.y0;
      const yLabel = 'AI USAGE';
      const yw = s.mText(yLabel, xfs, 800, '0.14em');
      const yArrow = Math.max(24, Math.min(64, availH - yw - 30));
      // Lift the label up the axis: sitting in the corner it reads as a
      // continuation of the x-axis label below it. Clamped against the room
      // the text and its arrow need, so it cannot run off a short panel.
      const yLift = Math.min(56, Math.max(0, availH - yw - yArrow - 8));
      ctx.save();
      ctx.translate(s.x0 - 14, s.y1 - 8 - yLift);
      ctx.rotate(-Math.PI / 2);
      s.txt(yLabel, 0, 3, xfs, s.ink, 800, '0.14em');
      axisArrow(yw + 10, -1, yArrow);
      ctx.restore();

      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = s.acc;
      ctx.fillRect(tx, s.y0 - 14, px1 - tx, s.y1 - s.y0 + 14);
      ctx.restore();
      s.line(tx, s.y0 - 14, tx, s.y1, s.acc, 2);
      s.txt(s.narrow ? 'THRESHOLD' : 'ADOPTION THRESHOLD', tx + 10, s.y0 - 22, 10, s.acc, 800, '0.14em');
      if (tx - s.x0 > 250) {
        s.txt('HIGH USAGE, NO DECISION CHANGE', s.x0 + 8, s.y0 - 22, 10, s.dim, 800, '0.14em');
      }

      for (let i = live.length - 1; i >= 0; i--) {
        const it = live[i]!;
        it.age += dt;
        const target = px(it.impact);
        if (it.age < 1) {
          it.x = s.lerp(s.x0 - 60, target, s.ease(it.age));
        } else if (it.age < 1.85) {
          const p = (it.age - 1) / 0.85;
          it.x = target + Math.sin(p * 26) * 9 * (1 - p);
        } else {
          it.x = target;
          if (!it.verdict) {
            it.verdict = it.impact >= 0.62 ? 'adopt' : 'decline';
            screened++;
            if (it.verdict === 'adopt') {
              adopted++;
              rail.unshift({ name: it.name, x: it.x, y: it.y });
              const rows = Math.max(3, Math.floor((s.y1 - s.y0 - 20) / 30));
              if (rail.length > rows) rail.length = rows;
            }
          }
        }

        const out = it.age - 2.35;
        if (it.verdict === 'decline' && out > 0) {
          const p = Math.min(1, out / 1.1);
          it.y = py(it.usage) + 46 * s.ease(p);
          it.a = 1 - p;
        }
        if (out > 1.1 || (it.verdict === 'adopt' && out > 0.05)) {
          live.splice(i, 1);
          continue;
        }

        const dec = it.verdict === 'decline';
        const size = dec ? 5 : 7;
        ctx.globalAlpha = it.a;
        if (dec) {
          ctx.strokeStyle = s.dim;
          ctx.lineWidth = 1;
          ctx.strokeRect(it.x - size / 2, it.y - size / 2, size, size);
        } else {
          ctx.fillStyle = it.verdict === 'adopt' ? s.acc : s.ink;
          ctx.fillRect(it.x - size / 2, it.y - size / 2, size, size);
        }

        const fs = s.tight ? 11 : 13;
        // Fade the name in only once the mark has cleared the axis gutter.
        const nameA = Math.max(0, Math.min(1, (it.x - s.x0 - 4) / 26));
        if (nameA > 0) {
          ctx.save();
          ctx.globalAlpha = it.a * nameA;
          s.txt(it.name, it.x + 13, it.y + 4, fs, dec ? s.dim : s.ink, dec ? 400 : 700);
          if (dec) s.line(it.x + 12, it.y, it.x + 16 + it.name.length * fs * 0.5, it.y, s.dim, 1);
          ctx.restore();
        }
        if (it.age >= 1 && it.age < 1.85) {
          ctx.save();
          ctx.strokeStyle = s.acc;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 3]);
          ctx.strokeRect(it.x - 15, it.y - 15, 30, 30);
          ctx.restore();
          s.txt('MEASURING', it.x - 15, it.y - 23, 9, s.acc, 800, '0.14em');
        }
        ctx.globalAlpha = 1;
      }

      // Without the rail the tally moves to the caption row — the threshold
      // label already owns the top baseline.
      if (!showRail) {
        s.rtxt(`SCREENED ${screened}   ADOPTED ${adopted}`, s.x1, s.y1 + 26, 9, s.dim, 800, '0.14em');
        return;
      }

      const railX = px1 + 34;
      s.line(railX, s.y0 - 14, railX, s.y1, s.rule, 2);
      s.txt('ADOPTED', railX + 14, s.y0 - 22, 10, s.acc, 800, '0.14em');
      rail.forEach((r, i) => {
        const ty = s.y0 + 12 + i * 30;
        r.x = s.lerp(r.x, railX + 14, 0.12);
        r.y = s.lerp(r.y, ty, 0.12);
        ctx.fillStyle = s.acc;
        ctx.fillRect(r.x, r.y - 4, 7, 7);
        s.txt(r.name, r.x + 14, r.y + 3, s.tight ? 11 : 13, s.ink, 700);
        ctx.globalAlpha = 0.45;
        s.line(railX + 14, r.y + 14, s.x1, r.y + 14, s.rule, 1);
        ctx.globalAlpha = 1;
      });
      s.rtxt(`SCREENED ${screened}   ADOPTED ${adopted}`, s.x1, s.y1 + 26, 9, s.dim, 800, '0.14em');
    },
  };
}

/* ── SCENE 2 · Validation & benchmarking ────────────────────────────────────
   Vendor scores rank one way; re-run on your data, the ranking changes and the
   leader is not the one that was sold. */

const MODELS: readonly [string, number, number][] = [
  ['Model A', 0.94, 0.42],
  ['Model B', 0.76, 0.89],
  ['Model C', 0.83, 0.55],
  ['Model D', 0.58, 0.81],
  ['Model E', 0.7, 0.33],
];

interface ModelRow {
  name: string;
  vendor: number;
  yours: number;
  val: number;
  y: number;
  slot: number;
  set: boolean;
}

function validationScene(): Scene {
  let t = 0;
  let rows: ModelRow[] = [];

  const reset = () => {
    t = 0;
    rows = MODELS.map(([name, vendor, yours], i) => ({ name, vendor, yours, val: 0, y: 0, slot: i, set: false }));
  };

  return {
    label: 'VALIDATION & BENCHMARKING',
    duration: 10.6,
    reset,
    draw(dt, s) {
      const { ctx } = s;
      t += dt;
      if (t > 10.8) reset();

      const phase = t < 3.2 ? 0 : t < 5.4 ? 1 : 2;
      const nameW = s.tight ? 92 : s.narrow ? 120 : 168;
      const valW = s.tight ? 34 : 62;
      const barX = s.x0 + nameW;
      const barW = Math.max(40, s.x1 - barX - valW);
      const rowH = Math.min(58, (s.y1 - s.y0 - 30) / 5);

      s.txt(
        phase === 0
          ? 'VENDOR BENCHMARK'
          : s.narrow
            ? 'RE-RUN ON YOUR DATA'
            : 'RE-RUN ON YOUR DATA, WORKFLOWS, STANDARDS',
        s.x0,
        s.y0 - 22,
        10,
        phase === 0 ? s.dim : s.acc,
        800,
        '0.14em',
      );

      const metric = (r: ModelRow) => (phase === 2 ? r.yours : r.vendor);
      rows
        .slice()
        .sort((a, b) => metric(b) - metric(a))
        .forEach((r, i) => {
          r.slot = i;
        });

      rows.forEach((r) => {
        const ty = s.y0 + 14 + r.slot * rowH;
        if (!r.set) {
          r.y = ty;
          r.set = true;
        } else {
          r.y = s.lerp(r.y, ty, 0.09);
        }
        r.val = s.lerp(r.val, phase === 0 ? r.vendor : metric(r), phase === 0 ? 0.05 : 0.06);

        const top = r.slot === 0;
        const weak = phase === 2 && r.yours < 0.5;
        s.line(s.x0, r.y + rowH * 0.62, s.x1, r.y + rowH * 0.62, s.rule, 1);
        s.txt(r.name, s.x0, r.y + rowH * 0.42, s.tight ? 12 : 15, weak ? s.dim : s.ink, 700);
        if (weak) s.line(s.x0, r.y + rowH * 0.36, s.x0 + Math.min(82, nameW - 14), r.y + rowH * 0.36, s.dim, 1);

        ctx.globalAlpha = 0.12;
        ctx.fillStyle = s.ink;
        ctx.fillRect(barX, r.y + rowH * 0.2, barW, 12);
        ctx.globalAlpha = 1;
        ctx.fillStyle = phase === 2 && top ? s.acc : weak ? s.dim : s.ink;
        ctx.fillRect(barX, r.y + rowH * 0.2, barW * Math.max(0, r.val), 12);
        s.rtxt(String(Math.round(r.val * 100)), s.x1, r.y + rowH * 0.42, s.tight ? 12 : 15, weak ? s.dim : s.ink, 800);
        if (phase === 2 && top) {
          s.txt(s.narrow ? 'PASSES' : 'PASSES ON YOUR DATA', barX, r.y + rowH * 0.2 - 8, 9, s.acc, 800, '0.14em');
        }
      });

      if (phase === 1) {
        const p = (t - 3.2) / 2.2;
        const sx = s.x0 + (s.x1 - s.x0) * p;
        s.line(sx, s.y0 - 6, sx, s.y1, s.acc, 2);
        s.txt('YOUR DATA', sx + 8, s.y0 + 2, 10, s.acc, 800, '0.14em');
      }

      s.txt(
        phase === 2
          ? s.narrow
            ? 'RANKING CHANGED'
            : 'RANKING CHANGED — THE VENDOR LEADER IS NOT YOURS'
          : 'SCORES AS PUBLISHED',
        s.x0,
        // Sit under the last row rule, not at the panel floor — rowH is capped,
        // so on tall panels the rows end well above y1.
        Math.min(s.y1 + 18, s.y0 + 14 + 4 * rowH + rowH * 0.62 + 30),
        11,
        phase === 2 ? s.acc : s.dim,
        800,
        '0.14em',
      );
    },
  };
}

/* ── SCENE 3 · AI & data products ───────────────────────────────────────────
   A basin. Everything a lab produces rains into it — sequences, assays, and the
   sessions and insights a scientist marks while working with an agent — and
   settles as strata. The foundation deepens, and what rises back out of it is
   the next partner. */

type Glyph = 'sequencer' | 'dna' | 'plate' | 'well' | 'session' | 'analysis' | 'check' | 'manuscript' | 'page';

/** inlet: [label, validated, source glyph, falling glyph] */
const INLETS: readonly [string, boolean, Glyph, Glyph][] = [
  ['SEQUENCES', false, 'sequencer', 'dna'],
  ['ASSAYS', false, 'plate', 'well'],
  ['CHAT SESSIONS', false, 'session', 'analysis'],
  ['INSIGHTS', true, 'check', 'check'],
  ['LITERATURE', false, 'manuscript', 'page'],
];

// Stratum names diverge from the inlets: a chat session settles as the analysis
// it produced; an expert's mark turns analysis into insight.
const BANDS = ['SEQUENCES', 'ASSAYS', 'GEN AI ANALYSIS', 'EXPERT-MARKED INSIGHTS', 'LITERATURE'];

/** Marks drawn from primitives, in the system's own vocabulary: no icon font. */
function glyph(s: Stage, kind: Glyph, cx: number, cy: number, r: number, color: string, lw?: number): void {
  const { ctx } = s;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw || 1.5;
  ctx.lineJoin = 'miter';
  ctx.lineCap = 'butt';

  if (kind === 'sequencer') {
    // Vented tower at left, two-door chamber, angled screen.
    ctx.lineWidth = lw || 1.4;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.16, cy - r * 0.52);
    ctx.lineTo(cx + r * 0.98, cy - r * 0.98);
    ctx.lineTo(cx + r * 0.98, cy - r * 0.3);
    ctx.lineTo(cx - r * 0.16, cy - r * 0.1);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeRect(cx - r, cy - r * 0.5, r * 0.52, r * 1.42);
    for (let i = 0; i < 3; i++) ctx.fillRect(cx - r * 0.92, cy - r * 0.34 + i * r * 0.2, r * 0.34, 1.2);
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillRect(cx - r * 0.48, cy - r * 0.12, r * 1.46, r * 1.04);
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = s.bg;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + r * 0.42, cy - r * 0.12);
    ctx.lineTo(cx + r * 0.42, cy + r * 0.92);
    ctx.stroke();
    ctx.fillStyle = s.bg;
    ctx.fillRect(cx - r * 0.38, cy - r * 0.03, 2.4, 2.4);
    ctx.restore();
    ctx.fillRect(cx - r * 0.82, cy + r * 0.92, r * 0.22, 1.6);
    ctx.fillRect(cx + r * 0.7, cy + r * 0.96, r * 0.22, 1.6);
  } else if (kind === 'dna') {
    // The classic silhouette: two ribbons crossing twice, thin rungs in the
    // open eyes — thick strands, thin rungs, nothing else.
    const hh = r * 1.4;
    const A = r * 0.55;
    const X = (t: number) => Math.cos(t * Math.PI * 2) * A;
    const Y = (t: number) => cy - hh + 2 * hh * t;
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    for (const dir of [1, -1]) {
      ctx.beginPath();
      for (let i = 0; i <= 30; i++) {
        const t = i / 30;
        if (i) ctx.lineTo(cx + X(t) * dir, Y(t));
        else ctx.moveTo(cx + X(t) * dir, Y(t));
      }
      ctx.stroke();
    }
    ctx.lineWidth = 0.9;
    for (let i = 0; i < 9; i++) {
      const t = (i + 0.5) / 9;
      const x = X(t);
      if (Math.abs(x) < A * 0.5) continue;
      ctx.beginPath();
      ctx.moveTo(cx - x, Y(t));
      ctx.lineTo(cx + x, Y(t));
      ctx.stroke();
    }
  } else if (kind === 'plate') {
    // 96-well microplate: clipped A1 corner, well grid, a few hits filled.
    ctx.lineWidth = lw || 1.3;
    const pw = r * 1.05;
    const ph = r * 0.78;
    const cut = r * 0.28;
    ctx.beginPath();
    ctx.moveTo(cx - pw + cut, cy - ph);
    ctx.lineTo(cx + pw, cy - ph);
    ctx.lineTo(cx + pw, cy + ph);
    ctx.lineTo(cx - pw, cy + ph);
    ctx.lineTo(cx - pw, cy - ph + cut);
    ctx.closePath();
    ctx.stroke();
    const hits = [5, 6, 9];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const i = row * 4 + col;
        const x = cx - pw + r * 0.42 + col * ((2 * pw - r * 0.84) / 3);
        const y = cy - ph + r * 0.32 + row * ((2 * ph - r * 0.64) / 2);
        ctx.beginPath();
        ctx.arc(x, y, r * 0.13, 0, Math.PI * 2);
        if (hits.includes(i)) ctx.fill();
        else ctx.stroke();
      }
    }
  } else if (kind === 'well') {
    // A droplet: the sample going in.
    const rb = r * 0.62;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.quadraticCurveTo(cx + rb * 0.9, cy - rb * 0.1, cx + rb, cy + r * 0.3 - rb * 0.4);
    ctx.arc(cx, cy + r * 0.3, rb, -0.15, Math.PI + 0.15);
    ctx.quadraticCurveTo(cx - rb * 0.9, cy - rb * 0.1, cx, cy - r);
    ctx.fill();
  } else if (kind === 'session') {
    // An expert and an AI agent, one bubble each, facing each other.
    ctx.lineWidth = lw || 1.2;
    const bw = r * 1.02;
    const bh = r * 1.05;
    ctx.beginPath();
    ctx.moveTo(cx - r, cy - r);
    ctx.lineTo(cx - r + bw, cy - r);
    ctx.lineTo(cx - r + bw, cy - r + bh);
    ctx.lineTo(cx - r + bw * 0.42, cy - r + bh);
    ctx.lineTo(cx - r + bw * 0.22, cy - r + bh + bh * 0.36);
    ctx.lineTo(cx - r + bw * 0.22, cy - r + bh);
    ctx.lineTo(cx - r, cy - r + bh);
    ctx.closePath();
    ctx.stroke();
    // The biologist: head and shoulders.
    const hx = cx - r + bw / 2;
    const hy = cy - r + bh * 0.38;
    ctx.beginPath();
    ctx.arc(hx, hy, r * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(hx, hy + r * 0.42, r * 0.26, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    // The agent's bubble, tail bottom-right, offset low.
    const ox = cx + r * 0.02;
    const oy = cy - r * 0.12;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + bw, oy);
    ctx.lineTo(ox + bw, oy + bh);
    ctx.lineTo(ox + bw * 0.78, oy + bh);
    ctx.lineTo(ox + bw * 0.78, oy + bh + bh * 0.36);
    ctx.lineTo(ox + bw * 0.58, oy + bh);
    ctx.lineTo(ox, oy + bh);
    ctx.closePath();
    ctx.stroke();
    // The agent: a chip with pins.
    const qx = ox + bw / 2;
    const qy = oy + bh * 0.48;
    const q = r * 0.26;
    ctx.strokeRect(qx - q, qy - q, 2 * q, 2 * q);
    ctx.fillRect(qx - 1, qy - 1, 2, 2);
    for (const d of [-0.5, 0.5]) {
      ctx.fillRect(qx + d * q - 0.6, qy - q - 2.4, 1.2, 2.4);
      ctx.fillRect(qx + d * q - 0.6, qy + q, 1.2, 2.4);
    }
  } else if (kind === 'analysis') {
    // What the session drops: a generated analysis — a page of results.
    ctx.lineWidth = lw || 1.2;
    const pw = r * 0.82;
    const ph = r * 1.15;
    ctx.strokeRect(cx - pw, cy - ph, 2 * pw, 2 * ph);
    ctx.fillRect(cx - pw + 1.6, cy - ph + 1.8, 2 * pw - 3.2, 1.1);
    [0.35, 0.72, 0.5].forEach((hv, i) => {
      const bw2 = (2 * pw - 5) / 3;
      ctx.fillRect(cx - pw + 1.8 + i * (bw2 + 0.8), cy + ph - 2 - ph * hv, bw2, ph * hv);
    });
  } else if (kind === 'check') {
    ctx.lineWidth = lw || 2;
    ctx.beginPath();
    ctx.moveTo(cx - r, cy + 1);
    ctx.lineTo(cx - r * 0.25, cy + r * 0.8);
    ctx.lineTo(cx + r, cy - r * 0.9);
    ctx.stroke();
  } else {
    const fold = r * 0.55;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.75, cy - r);
    ctx.lineTo(cx + r * 0.75 - fold, cy - r);
    ctx.lineTo(cx + r * 0.75, cy - r + fold);
    ctx.lineTo(cx + r * 0.75, cy + r);
    ctx.lineTo(cx - r * 0.75, cy + r);
    ctx.closePath();
    ctx.stroke();
    if (kind === 'manuscript') {
      for (let i = 0; i < 3; i++) {
        ctx.fillRect(cx - r * 0.45, cy - r * 0.35 + i * (r * 0.45), r * (i === 2 ? 0.6 : 0.95), 1.3);
      }
    }
  }
  ctx.restore();
}

const CAPTIONS: readonly [string, string][] = [
  ['SEQUENCES, ASSAYS, SESSIONS —', 'EVERYTHING SETTLES INTO THE FOUNDATION'],
  ['ANALYSIS AN EXPERT MARKS', 'BECOMES INSIGHT'],
  ['THE FOUNDATION IS THE PRODUCT —', 'EVERY PARTNER STARTS FROM IT'],
];

function foundationScene(): Scene {
  let t = 0;
  let drops: { i: number; x: number; y: number; v: number }[] = [];
  let mass: number[] = [];
  let massT: number[] = [];
  let next: number[] = [];
  let flash: { x: number; y: number; a: number; hot: boolean }[] = [];
  let splash: { x: number; y: number; vx: number; vy: number; a: number; hot: boolean }[] = [];
  let pulse: { p: number }[] = [];
  let nextPulse = 1.2;

  const reset = () => {
    t = 0;
    drops = [];
    flash = [];
    splash = [];
    pulse = [];
    nextPulse = 1.2;
    mass = [2.2, 1.9, 1.5, 1.1, 1.7];
    massT = mass.slice();
    next = INLETS.map((_, i) => 0.2 + i * 0.19);
  };

  return {
    label: 'AI & DATA PRODUCTS',
    duration: 12,
    reset,
    draw(dt, s) {
      const { ctx } = s;
      t += dt;
      const sx0 = s.x0;
      const sx1 = s.x1;
      const sw = sx1 - sx0;
      const bottom = s.y1 - 18;
      const basinTop = s.y0 + (s.y1 - s.y0) * 0.44;
      const H = Math.max(40, bottom - basinTop);

      // Strata thicken by slow creep, never by a step — a landing must not
      // nudge the whole basin.
      mass.forEach((m, i) => {
        mass[i] = m + (massT[i]! - m) * Math.min(1, dt * 0.3);
      });
      const total = mass.reduce((a, b) => a + b, 0);
      const k = H / total;

      // Band 0 sits on the floor; each band's top is the sum below it. The
      // accent seam is the point of the scene: never let it render thinner than
      // its label needs.
      const MIN_SEAM = 20;
      const th = (i: number) => (i === 3 ? Math.max(MIN_SEAM, mass[i]! * k) : mass[i]! * k);
      const bandTop = (i: number) => {
        let below = 0;
        for (let j = 0; j < i; j++) below += th(j);
        return bottom - below - th(i);
      };

      const railX = sx0 + Math.min(190, sw * 0.3);
      const colSpan = sx1 - railX - 10;
      const colX = (i: number) => railX + 18 + (colSpan - 26) * (i / (INLETS.length - 1));

      // Inlets.
      const slotW = colSpan / INLETS.length;
      const showNames = INLETS.every(([n]) => s.mText(n, 9, 800, '0.1em') < slotW - 6);
      INLETS.forEach(([name, hot, kind], i) => {
        const x = colX(i);
        const col = hot ? s.acc : s.dim;
        glyph(s, kind, x, s.y0 - 31, kind === 'session' ? 11 : 10, col, hot ? 2 : 1.5);
        if (hot) {
          ctx.save();
          ctx.strokeStyle = s.acc;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(x - 14, s.y0 - 45, 28, 28);
          ctx.restore();
        }
        if (showNames) s.ctext(name, x, s.y0 - 8, 9, col, 800, '0.1em');
        if (t > next[i]!) {
          drops.push({ i, x: x + (Math.random() - 0.5) * 12, y: s.y0, v: 8 + Math.random() * 12 });
          next[i] = t + 1.1 + Math.random() * 1.4;
        }
      });

      // Rain.
      const surfaceY = bandTop(INLETS.length - 1);
      for (let d = drops.length - 1; d >= 0; d--) {
        const p = drops[d]!;
        p.v += 150 * dt;
        p.y += p.v * dt;
        // Settle a third of the way into its own stratum, not on the seam above.
        const land = bandTop(p.i) + Math.min(9, mass[p.i]! * k * 0.38);
        if (p.y >= land) {
          massT[p.i] = (massT[p.i] ?? 0) + 0.1;
          const hot = INLETS[p.i]![1];
          flash.push({ x: p.x, y: land, a: 1, hot });
          for (let q = 0; q < 5; q++) {
            splash.push({
              x: p.x,
              y: land,
              hot,
              vx: (Math.random() - 0.5) * 90,
              vy: -(30 + Math.random() * 65),
              a: 1,
            });
          }
          drops.splice(d, 1);
          continue;
        }
        const hot = INLETS[p.i]![1];
        const sunk = p.y > surfaceY;
        ctx.save();
        ctx.globalAlpha = sunk ? 0.12 : 0.25;
        ctx.fillStyle = hot ? s.acc : s.ink;
        ctx.fillRect(p.x - 0.5, p.y - 14, 1, 12);
        ctx.restore();
        ctx.save();
        ctx.globalAlpha = (hot ? 1 : 0.9) * (sunk ? 0.4 : 1);
        const falling = INLETS[p.i]![3];
        glyph(
          s,
          falling,
          p.x,
          p.y,
          falling === 'dna' ? 8 : falling === 'well' ? 5.5 : hot ? 5 : 4.5,
          hot ? s.acc : s.ink,
          hot ? 2 : 1.2,
        );
        ctx.restore();
      }

      // Strata.
      mass.forEach((_, i) => {
        const y = bandTop(i);
        const bth = th(i);
        const hot = INLETS[i]![1];
        ctx.save();
        ctx.fillStyle = hot ? s.acc : s.ink;
        ctx.globalAlpha = hot ? 0.9 : 0.2 + 0.11 * (mass.length - i);
        ctx.fillRect(sx0, y, sw, Math.max(1, bth - 1));
        ctx.restore();
        // Gate on fit, not viewport class — the bands span the whole panel.
        const name = BANDS[i]!;
        if (s.mText(name, 9, 800, '0.14em') < sw - 24) {
          const inside = bth > 15;
          const on = inside ? s.n100 : hot ? s.acc : s.dim;
          const ly = inside ? y + bth / 2 + 3 : y - 5;
          s.rtxt(name, sx1 - 10, ly, 9, on, 800, '0.14em');
          if (hot) glyph(s, 'check', sx1 - 22 - s.mText(name, 9, 800, '0.14em'), ly - 4, 5, on, 2);
        }
      });
      s.line(sx0, bottom + 3, sx1, bottom + 3, s.rule, 2);

      // Splash ejecta.
      for (let e = splash.length - 1; e >= 0; e--) {
        const sp = splash[e]!;
        sp.vy += 340 * dt;
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.a -= dt * 1.9;
        if (sp.a <= 0) {
          splash.splice(e, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, sp.a);
        ctx.fillStyle = sp.hot ? s.acc : s.ink;
        ctx.fillRect(sp.x - 1.2, sp.y - 1.2, 2.4, 2.4);
        ctx.restore();
      }

      // Absorption flashes.
      for (let f = flash.length - 1; f >= 0; f--) {
        const fl = flash[f]!;
        fl.a -= dt * 3;
        if (fl.a <= 0) {
          flash.splice(f, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = fl.a;
        ctx.strokeStyle = fl.hot ? s.acc : s.ink;
        ctx.lineWidth = 1;
        const r = (1 - fl.a) * 14;
        ctx.beginPath();
        ctx.moveTo(fl.x - r, fl.y);
        ctx.lineTo(fl.x + r, fl.y);
        ctx.stroke();
        ctx.restore();
      }

      // What rises back out: a partner built on the whole basin. The cell scales
      // to the room left of the inlet columns, down to phones.
      const cellAvail = Math.max(54, Math.min(railX - sx0 - 12, sw - 12));
      const needW = s.mText('DATA FOUNDATION', 11, 800, '0.14em') + 24;
      const cScale = Math.min(1, cellAvail / needW);
      const f1 = Math.max(7, 11 * cScale);
      const cellW = Math.min(needW, cellAvail);
      const cellH = Math.max(24, 38 * cScale);
      const pad = Math.max(6, 12 * cScale);
      const cellX = sx0;
      const cellY = Math.max(s.y0 - 4, basinTop - cellH - 46);
      ctx.save();
      ctx.strokeStyle = s.acc;
      ctx.lineWidth = 2;
      ctx.strokeRect(cellX, cellY, cellW, cellH);
      ctx.restore();
      s.txt('DATA FOUNDATION', cellX + pad, cellY + cellH * 0.62, f1, s.acc, 800, '0.14em');

      const riseX = cellX + cellW / 2;
      const hotTop = bandTop(3) + th(3) / 2;
      s.line(riseX, cellY + cellH, riseX, hotTop, s.acc, 1, [4, 4]);
      if (t > nextPulse) {
        pulse.push({ p: 0 });
        nextPulse = t + 1.15;
      }
      for (let q = pulse.length - 1; q >= 0; q--) {
        const pu = pulse[q]!;
        pu.p += dt / 1.5;
        if (pu.p >= 1) {
          pulse.splice(q, 1);
          continue;
        }
        const y = s.lerp(hotTop, cellY + cellH, s.ease(pu.p));
        ctx.save();
        ctx.fillStyle = s.acc;
        ctx.globalAlpha = 1 - pu.p * 0.4;
        ctx.fillRect(riseX - 3, y - 3, 6, 6);
        ctx.restore();
      }

      const ci = Math.floor(t / 4) % 3;
      const caption = CAPTIONS[ci]!;
      const col = ci === 1 ? s.acc : s.ink;
      // Wrap to two lines when the single line would run past the panel.
      const one = caption.join(' ');
      if (s.mText(one, 12, 800, '0.14em') < sx1 - s.x0) {
        s.txt(one, s.x0, bottom + 34, 12, col, 800, '0.14em');
      } else {
        s.txt(caption[0], s.x0, bottom + 30, 12, col, 800, '0.14em');
        s.txt(caption[1], s.x0, bottom + 48, 12, col, 800, '0.14em');
      }
    },
  };
}

/* ── SCENE 4 · Scientific & portfolio intelligence ──────────────────────────
   Evidence accumulates along each program until its next gate resolves:
   advance, hold, or stop. Columns are measured, not assumed, so the verdicts
   never run off a narrow panel. */

type Verdict = 'advance' | 'stop' | 'hold';

const PROGRAMS: readonly [string, number, Verdict][] = [
  ['Program A-114', 0.58, 'advance'],
  ['Program B-207', 0.72, 'stop'],
  ['Program C-031', 0.44, 'advance'],
  ['Program D-560', 0.8, 'hold'],
  ['Program E-088', 0.62, 'advance'],
];

const VERDICT: Record<Verdict, string> = {
  advance: 'ADVANCE',
  stop: 'STOP',
  hold: 'HOLD FOR EVIDENCE',
};

interface ProgramRow {
  name: string;
  gate: number;
  verdict: Verdict;
  n: number;
  start: number;
  done: boolean;
}

function portfolioScene(): Scene {
  let t = 0;
  let rows: ProgramRow[] = [];

  const reset = () => {
    t = 0;
    rows = PROGRAMS.map(([name, gate, verdict], i) => ({
      name,
      gate,
      verdict,
      n: 0,
      start: 0.5 + i * 0.45,
      done: false,
    }));
  };

  return {
    label: 'PORTFOLIO INTELLIGENCE',
    duration: 11.9,
    reset,
    draw(dt, s) {
      const { ctx } = s;
      t += dt;
      if (t > 12) reset();

      const avail = s.x1 - s.x0;
      const nameSize = avail < 420 ? 11 : 14;
      const shortNames = avail < 520;
      const nameOf = (r: ProgramRow) => (shortNames ? r.name.split(' ')[1] || r.name : r.name);
      const nameW = Math.max(...rows.map((r) => s.mText(nameOf(r), nameSize, 700))) + 18;

      // Widest verdict block: glyph + gap + label.
      const GLYPH = 14;
      const GAP = 8;
      const labelSize = 11;
      let verdictW = GLYPH + GAP + Math.max(...Object.values(VERDICT).map((v) => s.mText(v, labelSize, 800, '0.14em'))) + 10;
      let showLabels = true;
      if (nameW + 120 + verdictW > avail) {
        verdictW = GLYPH + GAP + s.mText('HOLD', labelSize, 800, '0.14em') + 10;
      }
      if (nameW + 110 + verdictW > avail) {
        showLabels = false;
        verdictW = GLYPH + 14;
      }

      const trackX = s.x0 + nameW;
      const trackW = Math.max(60, avail - nameW - verdictW);
      const rowH = (s.y1 - s.y0 - 20) / 5;

      s.txt('EVIDENCE  →', trackX, s.y0 - 22, 10, s.dim, 800, '0.14em');
      if (avail - nameW - verdictW > 220) s.rtxt('NEXT DECISION', s.x1, s.y0 - 22, 10, s.acc, 800, '0.14em');

      let made = 0;
      rows.forEach((r, i) => {
        const y = s.y0 + 18 + i * rowH;
        const gateX = trackX + trackW * r.gate;
        s.line(trackX, y, trackX + trackW, y, s.rule, 1);
        s.txt(nameOf(r), s.x0, y + 4, nameSize, r.done && r.verdict === 'stop' ? s.dim : s.ink, 700);

        const step = avail < 420 ? 9 : 13;
        r.n = Math.min(Math.floor(Math.max(0, (t - r.start) / 0.28)), 60);
        for (let k = 0; k < r.n; k++) {
          const x = trackX + 6 + k * step;
          if (x > gateX - 4) break;
          ctx.save();
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = s.ink;
          ctx.fillRect(x, y - 3, 5, 5);
          ctx.restore();
        }

        const reached = trackX + 6 + r.n * step >= gateX - 4;
        s.line(gateX, y - 15, gateX, y + 15, reached ? s.acc : s.dim, 2);
        if (!reached) return;

        r.done = true;
        made++;
        const lx = trackX + trackW + 10;
        if (r.verdict === 'advance') {
          ctx.fillStyle = s.acc;
          ctx.beginPath();
          ctx.moveTo(lx, y - 6);
          ctx.lineTo(lx + 11, y);
          ctx.lineTo(lx, y + 6);
          ctx.closePath();
          ctx.fill();
        } else if (r.verdict === 'stop') {
          ctx.save();
          ctx.strokeStyle = s.dim;
          ctx.lineWidth = 2;
          ctx.strokeRect(lx, y - 6, 12, 12);
          ctx.restore();
          s.line(lx, y - 6, lx + 12, y + 6, s.dim, 2);
        } else {
          s.line(lx + 2, y - 6, lx + 2, y + 6, s.ink, 2);
          s.line(lx + 8, y - 6, lx + 8, y + 6, s.ink, 2);
        }

        if (showLabels) {
          const label =
            verdictW > GLYPH + GAP + 60 ? VERDICT[r.verdict] : r.verdict === 'hold' ? 'HOLD' : VERDICT[r.verdict];
          s.txt(
            label,
            lx + GLYPH + GAP,
            y + 4,
            labelSize,
            r.verdict === 'advance' ? s.acc : r.verdict === 'stop' ? s.dim : s.ink,
            800,
            '0.14em',
          );
        }
      });

      s.rtxt(`${avail < 520 ? 'RESOLVED ' : 'DECISIONS RESOLVED '}${made} / 5`, s.x1, s.y1 + 18, 11, s.dim, 800, '0.14em');
    },
  };
}

export function initServices(root: HTMLElement): ScenePanelHandle {
  return initScenePanel(root, {
    scenes: [adoptionScene(), validationScene(), foundationScene(), portfolioScene()],
    sectionAttr: 'data-svc',
    titleAttr: 'data-svc-title',
    hashPrefix: 'svc',
    pickEvent: 'bcai:service',
    gutter: [46, 30],
    inset: [40, 22],
    bottom: 90,
    topGap: 46,
  });
}
