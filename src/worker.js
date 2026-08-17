// ─────────────────────────────────────────────────────────────────────────────
// Enterprise Agile Site — Cloudflare Worker
// Destination: src/worker.js
// Changes vs original:
//   • Security headers on every ASSETS response
//   • Rate limiting on /api/events (30 req / 60 s per IP, in-memory)
//   • Origin validation on /api/events
//   • Cache-Control headers for static assets
// ─────────────────────────────────────────────────────────────────────────────

// ── Security headers applied to every HTML response ──────────────────────────
const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self'; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

// ── Cache-Control rules for static assets ────────────────────────────────────
function getCacheControl(pathname) {
  // Immutable versioned assets — Astro appends content hash
  if (/\/_astro\//.test(pathname)) {
    return "public, max-age=31536000, immutable";
  }
  // Images and downloads — long-lived but not immutable (no hash)
  if (/\.(png|jpe?g|webp|avif|svg|ico|pdf)$/i.test(pathname)) {
    return "public, max-age=604800, stale-while-revalidate=86400";
  }
  // HTML — always revalidate
  return "no-cache, no-store, must-revalidate";
}

// ── In-memory rate limiter (sliding window, per IP) ──────────────────────────
// NOTE: This resets on Worker restart and is not shared across Worker instances.
// For production-grade rate limiting, upgrade to Cloudflare Rate Limiting rules
// in the dashboard, or back this with a KV store.
const rateLimitMap = new Map(); // ip → number[] (timestamps ms)
const RATE_WINDOW_MS = 60_000;  // 60 seconds
const RATE_LIMIT     = 30;      // max requests per window

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_WINDOW_MS;
  const hits = (rateLimitMap.get(ip) ?? []).filter(t => t > windowStart);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  rateLimitMap.set(ip, hits);
  // Prevent unbounded map growth — evict stale IPs periodically
  if (rateLimitMap.size > 5_000) {
    for (const [key, timestamps] of rateLimitMap) {
      if (timestamps.every(t => t < windowStart)) rateLimitMap.delete(key);
    }
  }
  return false;
}

// ── Allowed origins for /api/events ──────────────────────────────────────────
// TODO: Replace YOUR_DOMAIN.com with your registered custom domain.
const ALLOWED_ORIGINS = new Set([
  "https://YOUR_DOMAIN.com",
  "https://enterprise-agile-site.nagulapalli-kranthi.workers.dev",   // STG
  "https://enterprise-agile-site-dev.nagulapalli-kranthi.workers.dev", // DEV
]);

// ── JSON helper ───────────────────────────────────────────────────────────────
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

// ── Main fetch handler ────────────────────────────────────────────────────────
export default {
  async fetch(request, env, context) {
    const url    = new URL(request.url);
    const origin = request.headers.get("origin") ?? "";

    // ── Route: /api/events (POST only) ──────────────────────────────────────
    if (url.pathname === "/api/events" && request.method === "POST") {
      // Origin validation — reject requests from unknown origins
      if (origin && !ALLOWED_ORIGINS.has(origin)) {
        return json({ accepted: false, reason: "origin" }, 403);
      }

      // Rate limiting — keyed on CF-Connecting-IP (set by Cloudflare edge)
      const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
      if (isRateLimited(ip)) {
        return new Response(null, {
          status: 429,
          headers: {
            "Retry-After": "60",
            "content-type": "application/json",
          },
        });
      }

      // Parse body
      let event;
      try {
        event = await request.json();
      } catch {
        return json({ accepted: false, reason: "invalid_json" }, 400);
      }

      // Sanitise — no PII accepted or forwarded
      const safeEvent = {
        action:     String(event.action     || "unknown").slice(0, 80),
        label:      String(event.label      || "unlabelled").slice(0, 120),
        page:       String(event.page       || "/").slice(0, 240),
        target:     event.target    ? String(event.target).slice(0, 300)    : null,
        occurredAt: String(event.occurredAt || new Date().toISOString()).slice(0, 40),
        // sessionId intentionally omitted — events are anonymous and unlinked
      };

      // Forward to notification webhook if configured
      if (env.NOTIFICATION_WEBHOOK_URL) {
        context.waitUntil(
          fetch(env.NOTIFICATION_WEBHOOK_URL, {
            method:  "POST",
            headers: { "content-type": "application/json" },
            body:    JSON.stringify({
              text:  `${safeEvent.label} on ${safeEvent.page} at ${safeEvent.occurredAt}.`,
              event: safeEvent,
            }),
          })
        );
      }

      return json({ accepted: true });
    }

    // ── Route: preflight CORS for /api/events ────────────────────────────────
    if (url.pathname === "/api/events" && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin":  ALLOWED_ORIGINS.has(origin) ? origin : "",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age":       "86400",
        },
      });
    }

    // ── Route: all other requests → static assets ────────────────────────────
    const assetResponse = await env.ASSETS.fetch(request);

    // Clone so we can mutate headers
    const response = new Response(assetResponse.body, assetResponse);
    const headers   = new Headers(response.headers);

    // Apply security headers to every response
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value);
    }

    // Apply cache control based on path
    headers.set("Cache-Control", getCacheControl(url.pathname));

    return new Response(response.body, {
      status:     response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
