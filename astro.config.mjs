// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is required for canonical URLs, sitemap.xml, and absolute OG image
// URLs. The custom domain is configured on the repository's Pages settings
// (bioclarity.ai) and pinned by public/CNAME.
//
// `base` stays '/' because this deploys to an apex domain, not to
// user.github.io/repo. If the custom domain is ever removed, set
// base: '/BCAI-website/' or every asset URL 404s.
export default defineConfig({
  site: 'https://bioclarity.ai',
  base: '/',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // Keep the sitemap and the robots meta tag telling the same story: the
      // holding pages are noindex, so they stay out. Delete an entry here when
      // its page gets real content.
      filter: (page) =>
        !['/platform/', '/science/', '/company/', '/request-access/'].some((p) =>
          page.endsWith(p),
        ),
    }),
  ],
  build: {
    // Emit /about/index.html rather than /about.html so Pages serves clean
    // URLs without a redirect.
    format: 'directory',
    inlineStylesheets: 'auto',
  },
});
