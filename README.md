# BioClarity AI — bioclarity.ai

Marketing site for BioClarity AI. Built with [Astro](https://astro.build),
rendered to static HTML at build time, deployed to GitHub Pages on the apex
domain `bioclarity.ai`.

## Why Astro

SEO is the priority for this site, and the audience that matters most is not
only Google. Bing, LinkedIn, Slack unfurls, and the AI crawlers largely do not
execute JavaScript — a client-rendered app is an empty page to them. Astro ships
the full content as HTML and sends **zero JavaScript** except the one island
that needs it (the hero simulation, ~8.5KB / 3.9KB gzipped).

## Run it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run preview    # serve dist/ locally
npm run check      # astro check — types and template diagnostics
```

Node 22+.

## Layout

```
public/            Copied verbatim to the site root
  fonts/           Archivo woff2 subsets, self-hosted (no third-party requests)
  images/          logo.png, og-default.png (1200x630 social card)
  CNAME            Pins the custom domain on every deploy
  robots.txt       Points at the sitemap
src/
  layouts/
    Base.astro     Every page's <head>: title, description, canonical, OG,
                   Twitter card, Organization JSON-LD, font preload
    Stub.astro     Holding page for a route the nav points at (noindex)
  components/
    SiteNav.astro  Header; links only to routes that exist
    Emergence.astro  The hero canvas, its overlay, and its controls
  pages/           One file per route; 404.astro becomes GitHub Pages' 404
  scripts/
    emergence.ts   The particle simulation, plain TypeScript
  styles/
    global.css     Modernist design tokens and component classes
design/
  landing-bundle.html   The original design-tool export the site was ported
                        from. Reference only — never served.
```

## SEO checklist for new pages

1. Use `Base.astro` and pass a **unique** `title` and `description`. Both are
   per-page ranking signals; duplicates waste them.
2. One `<h1>` per page, real `<h2>`/`<h3>` below it. Do not fake headings with
   styled divs.
3. Add the route to the nav in `SiteNav.astro` only once its page has content.
4. A page with real content must **not** be `noindex` — drop the prop and
   remove its path from the sitemap `filter` in `astro.config.mjs`.
5. Pass a custom `image` to `Base.astro` when a page deserves its own social
   card; otherwise `og-default.png` is used.

## Deploying

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, and
can be run by hand from the Actions tab. Pages is configured with
`build_type: workflow`, so nothing is served from a branch directly.

The custom domain is set in the repository's Pages settings and pinned by
`public/CNAME`. If the domain is ever removed, set `base: '/BCAI-website/'` in
`astro.config.mjs` or every asset URL will 404.

## The hero simulation

`src/scripts/emergence.ts` runs 340 particles through ten formations — two
separate populations (AI and biology) that converge, then resolve up the scales
of living systems from molecule to organism. It was ported from a React
component; the framework was never needed, since the simulation owns a canvas
and a rAF loop and touches the DOM only to update the readout.

It pauses when scrolled out of view or when the tab is hidden, and it holds a
single formation under `prefers-reduced-motion`. The canvas is `aria-hidden`:
every claim it illustrates is also in the copy beside it.
