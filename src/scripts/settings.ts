/**
 * Runtime settings, read from `public/settings.json`.
 *
 * Values live in a JSON file rather than in source so they can be retuned by
 * editing one file. The fetch is best-effort by design: on any failure — 404,
 * offline, malformed JSON, a request that hangs — this resolves to an empty
 * object and each consumer keeps its own compiled-in defaults. A missing or
 * broken settings file can never take a page down.
 *
 * Add new sections as sibling keys of `emergence`; nothing here is specific to
 * the hero.
 */

import type { EmergenceOptions } from './emergence';

export interface Settings {
  emergence?: Partial<EmergenceOptions>;
}

/**
 * Cap on how long a hanging request is allowed to stay outstanding. Nothing
 * waits on this promise to render, so the timeout only bounds the retune.
 */
const TIMEOUT_MS = 4000;

let pending: Promise<Settings> | undefined;

/** Fetched at most once per page load and shared by every caller. */
export function loadSettings(): Promise<Settings> {
  pending ??= fetchSettings();
  return pending;
}

async function fetchSettings(): Promise<Settings> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${import.meta.env.BASE_URL}settings.json`, {
      // Revalidate instead of trusting a cached copy, so an edited file takes
      // effect on the next load rather than after the CDN TTL expires. A
      // revalidation that finds no change costs one 304, not a re-download.
      cache: 'no-cache',
      signal: controller.signal,
    });
    if (!response.ok) return {};

    const parsed: unknown = await response.json();
    return parsed !== null && typeof parsed === 'object' ? (parsed as Settings) : {};
  } catch {
    return {};
  } finally {
    window.clearTimeout(timer);
  }
}
