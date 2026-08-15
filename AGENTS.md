# Working in this repo

## Never commit or push on your own

Do not run `git commit` or `git push` unless the user asks for it **in that
message**. Staging with `git add` is fine; creating the commit is not.

This is not a style preference. `.github/workflows/deploy.yml` deploys on every
push to `main`, so a push here publishes to bioclarity.ai immediately — there is
no staging environment and no review step between the push and the live site.

Standing permission does not carry over. "Commit and push" granted for one
change authorises that change only; the next one needs asking again.

A `PreToolUse` hook in `.claude/settings.json` blocks both commands, so an
attempt fails with a message rather than going through. The hook is the
backstop, not the rule — do not work around it, and do not edit or disable it
to get a commit through. If a commit is genuinely wanted, the user will say so,
and they can run the command themselves or lift the hook.

Leave finished work in the working tree and say what changed. That is the
hand-off.

## Checks before handing work back

```sh
npm run check      # astro check — types and template diagnostics
npm run build      # must succeed; it is what the deploy workflow runs
```

Both must be clean. `npm run dev` serves the site locally for a visual check —
prefer looking at a page over assuming a change landed, especially for the
canvas panels, which no test covers.

## Things worth knowing

- `src/scripts/canvasStage.ts` is shared plumbing for every drawn panel; the
  page scripts hold only their own drawing.
- The pages are ported from a design-tool export. `README.md` records which
  departures from that export are deliberate — read it before "fixing" one.
- Canvas labels are fitted to the panel in code. When adding one, measure it
  against its neighbours; several overlapping-label bugs came from assuming
  there was room.
