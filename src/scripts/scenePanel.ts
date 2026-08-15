/**
 * The stage panel behind the Services and Science pages.
 *
 * Both pages are the same machine: a canvas that cycles a short list of drawn
 * scenes, one per section of the copy beside it. Hovering a section, using the
 * arrows, following a #svc-2 style deep link, or picking from the nav all
 * select a scene; the lock button holds the current one.
 *
 * A scene owns its own state and draws into the `Stage` it is handed, so the
 * two pages differ only in their scene lists and a few layout numbers.
 */

import { createStage, runLoop, type LayoutSpec, type Stage } from './canvasStage';

export type { Stage } from './canvasStage';

export interface Scene {
  /** Shown in the readout above the controls. */
  label: string;
  /** Seconds of screen time before the panel advances to the next scene. */
  duration: number;
  /** Called on entry and whenever the scene restarts its own loop. */
  reset(): void;
  draw(dt: number, s: Stage): void;
}

export interface ScenePanelConfig extends LayoutSpec {
  scenes: Scene[];
  /** Attribute marking a section of copy: 'data-svc' or 'data-sci'. */
  sectionAttr: string;
  /** Attribute marking a section's heading, highlighted while its scene runs. */
  titleAttr: string;
  /** Deep-link prefix: 'svc' gives #svc-1. */
  hashPrefix: string;
  /** Event the nav dispatches to select a section without a page load. */
  pickEvent: string;
}

/** Seconds a cross-fade between two scenes takes. */
const FADE = 0.55;

export interface ScenePanelHandle {
  destroy(): void;
}

export function initScenePanel(root: HTMLElement, config: ScenePanelConfig): ScenePanelHandle {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-canvas]');
  if (!canvas) return { destroy() {} };

  const overlay = root.querySelector<HTMLElement>('[data-overlay]');
  const handle = createStage(canvas, { overlay, layout: config });
  if (!handle) return { destroy() {} };

  const { stage, measure } = handle;
  const { ctx } = stage;
  const { scenes } = config;
  const panel = canvas.parentElement as HTMLElement;
  const readout = root.querySelector<HTMLElement>('[data-readout]');
  const lockBtn = root.querySelector<HTMLButtonElement>('[data-lock]');
  const lockDot = root.querySelector<HTMLElement>('[data-lock-dot]');
  const lockLabel = root.querySelector<HTMLElement>('[data-lock-label]');
  const copy = document.querySelector<HTMLElement>('[data-page-copy]');

  const titles = copy ? Array.from(copy.querySelectorAll<HTMLElement>(`[${config.titleAttr}]`)) : [];

  // Reduced motion: hold one scene rather than cycling through them.
  let held = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let idx = 0;
  let age = 0;
  let shown = -1;
  let trans: { to: number; p: number } | null = null;

  const show = (k: number) => {
    if (k === shown) return;
    shown = k;
    if (readout) readout.textContent = scenes[k]!.label;
    titles.forEach((el, j) => {
      el.style.color = j === k ? 'var(--color-accent)' : '';
    });
  };

  const paintLock = () => {
    if (lockLabel) lockLabel.textContent = held ? 'Held' : 'Auto';
    if (lockDot) lockDot.style.background = held ? 'currentColor' : 'transparent';
    if (lockBtn) {
      lockBtn.style.color = held ? 'var(--color-accent)' : 'var(--color-neutral-600)';
      lockBtn.setAttribute('aria-pressed', String(held));
    }
  };

  const nav = (d: number) => {
    const n = scenes.length;
    if (!trans) trans = { to: (((idx + d) % n) + n) % n, p: 0 };
  };

  /** `force` marks a deliberate pick — nav, arrows, deep link. A hover is not. */
  const go = (k: number, force = false) => {
    if (held && !force) return; // held: a stray hover must not switch
    if (!trans && k !== idx) trans = { to: k, p: 0 };
  };

  scenes.forEach((s) => s.reset());
  show(0);
  paintLock();

  const loop = runLoop(panel, (dt) => {
    measure();

    let alpha = 1;
    if (trans) {
      trans.p += dt / FADE;
      // Swap at the midpoint of the fade, when the panel is at its darkest.
      if (trans.p >= 0.5 && idx !== trans.to) {
        idx = trans.to;
        age = 0;
        scenes[idx]!.reset();
        show(idx);
      }
      alpha = Math.abs(1 - 2 * Math.min(1, trans.p));
      if (trans.p >= 1) trans = null;
    } else {
      age += dt;
      if (!held && age > scenes[idx]!.duration) trans = { to: (idx + 1) % scenes.length, p: 0 };
    }

    ctx.clearRect(0, 0, stage.w, stage.h);
    ctx.save();
    ctx.globalAlpha = Math.max(0.02, alpha);
    scenes[idx]!.draw(dt, stage);
    ctx.restore();

    // Scene ticks, bottom right.
    scenes.forEach((_, i) => {
      ctx.fillStyle = i === idx ? stage.acc : stage.dim;
      ctx.globalAlpha = i === idx ? 1 : 0.4;
      ctx.fillRect(stage.x1 - (scenes.length - i) * 16, stage.h - 40, 10, 3);
      ctx.globalAlpha = 1;
    });
  });

  const onPrev = () => nav(-1);
  const onNext = () => nav(1);
  const onLock = () => {
    held = !held;
    paintLock();
  };
  const prevBtn = root.querySelector<HTMLElement>('[data-prev]');
  const nextBtn = root.querySelector<HTMLElement>('[data-next]');
  prevBtn?.addEventListener('click', onPrev);
  nextBtn?.addEventListener('click', onNext);
  lockBtn?.addEventListener('click', onLock);

  // Hovering a section of the copy selects its scene.
  const sections = copy ? Array.from(copy.querySelectorAll<HTMLElement>(`[${config.sectionAttr}]`)) : [];
  const hovers = sections.map((el, i) => {
    const handler = () => go(i);
    el.addEventListener('mouseenter', handler);
    return { el, handler };
  });

  /** Scroll a section into view and switch to its scene. 1-based, as in the hash. */
  const select = (k: number, smooth: boolean) => {
    if (!k || k < 1 || k > scenes.length) return;
    go(k - 1, true);
    const el = copy?.querySelector<HTMLElement>(`[${config.sectionAttr}="${k}"]`);
    if (!el || !copy) return;
    // Land above the heading, clear of the section's top rule.
    copy.scrollTo({ top: Math.max(0, el.offsetTop - 54), behavior: smooth ? 'smooth' : 'auto' });
    // Flash it, so the jump is visible when the page does not reload.
    el.style.animation = 'none';
    requestAnimationFrame(() => {
      el.style.animation = 'bc-flash 2.2s ease-out';
    });
  };

  const fromHash = (smooth: boolean) =>
    select(Number.parseInt((location.hash || '').replace(`#${config.hashPrefix}-`, ''), 10), smooth);
  requestAnimationFrame(() => fromHash(false));

  const onHash = () => fromHash(true);
  window.addEventListener('hashchange', onHash);
  const onPick = (e: Event) => select((e as CustomEvent<number>).detail, true);
  window.addEventListener(config.pickEvent, onPick);

  return {
    destroy() {
      loop.destroy();
      handle.destroy();
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener(config.pickEvent, onPick);
      prevBtn?.removeEventListener('click', onPrev);
      nextBtn?.removeEventListener('click', onNext);
      lockBtn?.removeEventListener('click', onLock);
      hovers.forEach(({ el, handler }) => el.removeEventListener('mouseenter', handler));
    },
  };
}
