# Frozen snapshot — Services, 2026-08-15

Served at `/backup/081526/service/`. Nothing links to it, it is not in the
sitemap, and it carries `noindex, nofollow`.

## What this is

The Services page exactly as it stood on 2026-08-15, kept so the page and its
four scenes can still be looked at after the originals move on.

It is **built output, not source**: rendered HTML beside the JavaScript and CSS
bundles it was built with, plus the `settings.json` of that day. It imports
nothing from `src/`, so nothing done there afterwards can reach it. That is the
whole point of taking it this way rather than copying the components — a copy
that still shared `scenePanel.ts` or `canvasStage.ts` would quietly change with
them, and would not be a backup at all.

The settings fetch inside the bundle was repointed at the copy in this folder
for the same reason; left alone it would have read the live file.

## Rules

**Do not edit anything in here, and do not refactor it.** It is a record of a
past state; a tidied snapshot is a falsified one. If it ever needs replacing,
take a new one under a new date and leave this alone.

It is deliberately outside the Astro build — everything in `public/` is copied
to the site verbatim — so the build never touches it and it cannot break it.

## What it still borrows from the live site

Fonts, images and the favicon load from their usual paths, and the nav links
point at the live pages. Only the page and its animation are frozen; site-wide
chrome is not. Fonts are self-hosted and unlikely to move, but if they ever do,
this page picks up the change.
