/**
 * gen-headers.mjs — post-build script
 * Scans dist/ HTML for inline <script> and <style> blocks,
 * computes SHA-256 hashes, and writes dist/_headers with a
 * hash-based CSP (no unsafe-inline → A+ grade on securityheaders.io).
 *
 * Run AFTER `astro build`. Overwrites dist/_headers.
 * public/_headers is kept as a dev-time fallback only.
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { createHash } from "crypto";
import { join } from "path";

const DIST = "dist";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (e.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function sha256(content) {
  return createHash("sha256").update(content, "utf8").digest("base64");
}

const htmlFiles = await walk(DIST);
const scriptHashes = new Set();
const styleHashes  = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");

  // Inline scripts (no src=)
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const body = m[1].trim();
    if (body) scriptHashes.add(`'sha256-${sha256(body)}'`);
  }

  // Inline styles (<style> blocks)
  for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const body = m[1].trim();
    if (body) styleHashes.add(`'sha256-${sha256(body)}'`);
  }
}

const scriptSrc = `'self' ${[...scriptHashes].join(" ")}`;
const styleSrc  = `'self' ${[...styleHashes].join(" ")}`;

const headers = `\
/*
  Content-Security-Policy: default-src 'self'; script-src ${scriptSrc}; style-src ${styleSrc}; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin

/*.html
  Cache-Control: no-cache, no-store, must-revalidate

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;

await writeFile(join(DIST, "_headers"), headers, "utf8");

console.log(`✓ dist/_headers written`);
console.log(`  script-src: ${scriptHashes.size} inline hash(es)`);
console.log(`  style-src:  ${styleHashes.size} inline hash(es)`);
