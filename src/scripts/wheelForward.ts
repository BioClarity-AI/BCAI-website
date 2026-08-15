/**
 * The right-hand stage is a fixed panel with nothing to scroll, so a wheel
 * over it would do nothing at all. Forward it to the left copy column instead.
 *
 * Delegated on the document rather than bound to the panel, so it works no
 * matter when the panels mount and needs no teardown.
 */

const LINE_HEIGHT = 16;

function amount(e: WheelEvent): number {
  if (e.deltaMode === 1) return e.deltaY * LINE_HEIGHT; // lines
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight; // pages
  return e.deltaY;
}

let installed = false;

export function initWheelForward(): void {
  if (installed) return;
  installed = true;

  document.addEventListener(
    'wheel',
    (e) => {
      const target = e.target as Element | null;
      if (!target?.closest?.('[data-page-stage]')) return;

      const copy = document.querySelector<HTMLElement>('[data-page-copy]');
      if (!copy) return;

      const room = copy.scrollHeight - copy.clientHeight;
      if (room <= 1) return;

      const next = Math.max(0, Math.min(room, copy.scrollTop + amount(e)));
      if (next === copy.scrollTop) return;

      copy.scrollTop = next;
      e.preventDefault();
    },
    { passive: false },
  );
}
