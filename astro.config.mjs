// @ts-check
// Destination: astro.config.mjs
//
// SETUP (run once):
//   npm install @astrojs/sitemap sharp
//
// After installing, delete public/sitemap.xml — Astro now auto-generates it.
// The sitemap will be at /sitemap-index.xml after build.
//
// Also update robots.txt to point to the new sitemap path:
//   Sitemap: https://YOUR_DOMAIN.com/sitemap-index.xml
//
// Set PUBLIC_SITE_URL in:
//   - GitHub repo Settings → Environments → DEV / STG / PROD → Variables
//   - wrangler.jsonc → env.production.vars.PUBLIC_SITE_URL

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // ── Site URL ─────────────────────────────────────────────────────────────
  // Controls canonical URLs, OG tags, and sitemap entries.
  // Must match the deployed domain per environment.
  // Falls back to STG during development if env var is not set.
  site: process.env.PUBLIC_SITE_URL ?? "https://enterprise-agile-site.nagulapalli-kranthi.workers.dev",

  // ── HTML compression ─────────────────────────────────────────────────────
  // Strips whitespace from HTML output. Safe for all content.
  compressHTML: true,

  // ── Integrations ─────────────────────────────────────────────────────────
  integrations: [
    sitemap({
      // All pages are included by default.
      // Exclude legal pages from the sitemap (low SEO value, no need to index).
      filter: (page) => !page.includes("/privacy") && !page.includes("/terms"),
      changefreq: "weekly",
      priority: 0.9,
      lastmod: new Date(),
      // Custom priorities per page path
      serialize(item) {
        if (item.url.endsWith("/")) {
          item.priority = 1.0; // Homepage
        } else if (item.url.includes("/models/")) {
          item.priority = 0.8; // Model pages
        }
        return item;
      },
    }),
  ],

  // ── Image optimisation ────────────────────────────────────────────────────
  // Enables Astro's <Image> component to auto-generate WebP / AVIF
  // with correct srcset and sizes attributes.
  // Usage: import { Image } from 'astro:assets'; in your .astro files.
  image: {
    // Sharp is the default service for SSG builds.
    // No additional configuration needed for standard WebP output.
  },

  // ── Build output ──────────────────────────────────────────────────────────
  // 'static' = pre-rendered HTML (correct for this site — Worker serves assets).
  output: "static",
});
