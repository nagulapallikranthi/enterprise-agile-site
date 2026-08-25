# Enterprise Agile Site — Session State

> **SESSION BOOTSTRAP FILE**  
> Read this at the start of every session. Find the first `- [ ]` in **Next Tasks**. Execute it.  
> Update this file at the end of every session before committing.

---

## Project Identity

| | |
|---|---|
| **Repo** | https://github.com/nagulapallikranthi/enterprise-agile-site |
| **PROD** | https://spm.nagulapalli-kranthi.workers.dev/ |
| **STG** | https://enterprise-agile-site.nagulapalli-kranthi.workers.dev/ |
| **DEV** | https://enterprise-agile-site-dev.nagulapalli-kranthi.workers.dev/ |
| **Owner** | Kranthi Nagulapally (knagulapally@conga.com) |
| **Sandbox clone** | `/tmp/enterprise-agile-site` |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro v7.2.2 (SSG) |
| Hosting | Cloudflare Workers — static assets via ASSETS binding |
| CI/CD | GitHub Actions: `deploy.yml` + `quality.yml` |
| Deployment config | `wrangler.jsonc` (env-based: dev / staging / production) |
| Styling | CSS — `src/styles/global.css` + scoped Astro component styles |
| CSP | SHA-256 hash-based, generated post-build by `scripts/gen-headers.mjs` |
| PAT location | `C:\repos\.ssh\github_token` — read with `cat ... \| tr -d '[:space:]'` |

---

## Environment State

| Env | Worker Name | Branch | Gate | Last Commit |
|---|---|---|---|---|
| DEV | `enterprise-agile-site-dev` | `develop` | Auto | `b38e724f` (0.5.0) |
| STG | `enterprise-agile-site` | `staging` | Auto | `b38e724f` (0.5.0) |
| PROD | `spm` | `main` | Manual approval on GitHub Actions | `b38e724f` (0.5.0) |

PROD approval: push to `main` → CI queues → Kranthi approves at  
`github.com/nagulapallikranthi/enterprise-agile-site/actions`

---

## Architecture Decisions

| Date | Decision | Rationale |
|---|---|---|
| 2026-08 | PROD worker = `spm` (not `enterprise-agile-site-prod`) | `spm` is the actual live worker serving the public URL |
| 2026-08 | `PUBLIC_SITE_URL` is build-time Astro env var | Astro resolves canonical/OG URLs at build time — wrangler `vars` are runtime-only |
| 2026-08 | CSP = SHA-256 hashes via `gen-headers.mjs` | Eliminates `unsafe-inline`, achieves A+ security grade |
| 2026-08 | `Carousel.astro` = single reusable component | Replaced duplicated impact + framework carousel HTML/JS |
| 2026-08 | Layout-critical CSS goes in `global.css`, not scoped styles | Slotted elements don't receive `data-astro-cid-*` → scoped selectors don't match |
| 2026-08 | Deploy pipeline is parallel, not sequentially enforced | Branch protection rules not yet configured — only gate is PROD manual approval |
| 2026-08-25 | Public resume distribution withdrawn | Remove the PDF, not only its links; CI fails if the former asset returns to `dist/` |
| 2026-08-25 | Release 0.5.0 uses one identical commit across environments | Restores auditable DEV → STG → PROD promotion evidence |

---

## Bug Register

| ID | Area | Status | Root Cause | Approved Fix |
|---|---|---|---|---|
| BUG-01 | Framework carousel | **FIXED** | No `.framework-carousel` wrapper div → CSS selector `.framework-carousel .framework-card` never matches → cards have no flex-basis → all 6 shrink-to-fit the viewport. Counter and arrows show but are non-functional on desktop. | Desktop (≥1024px): remove Carousel, render as `.framework-grid` CSS grid. Mobile: keep carousel. |
| BUG-02 | Delivery Impact cards | **FIXED** | `justify-content: space-between` + `min-height: 188px` with 3 elements pushes description to card bottom, creating artificial whitespace gap. | `justify-content: flex-start; gap: 12px; min-height: 0` |
| BUG-03 | privacy.astro + terms.astro | **LOW / BACKLOG** | Email is a `<!-- TODO -->` placeholder. | Replace once professional domain is registered. |
| BUG-04 | MainLayout.astro L24 | **LOW / BACKLOG** | Stale TODO comment about PUBLIC_SITE_URL (already handled). | Remove comment. |
| BUG-05 | Resume privacy | **FIXED / VERIFIED 0.5.0** | CTA was removed but the PDF remained publicly accessible and CI required it. | Asset deleted; forbidden-artifact gate added; PROD returns 404. |
| BUG-06 | PROD analytics | **FIXED / VERIFIED 0.5.0** | `spm` was missing from the Worker origin allowlist. | Exact PROD origin added; controlled PROD event accepted. |
| BUG-07 | Release topology | **FIXED / VERIFIED 0.5.0** | `main` advanced while `staging` remained 56 commits behind `develop`. | All environments promoted from identical commit `b38e724f`. |

---

## Next Tasks

### Sprint — Active

- [x] **RELEASE 0.5.0 — privacy, analytics, alignment, and regression** *(2026-08-25)*
  - Permanently remove the public resume asset.
  - Promote one identical commit through DEV, STG, and PROD.
  - Verify analytics, accessibility, security headers, and responsive behavior.
  - Record evidence in `docs/RELEASE_0.5.0_QA.md`.

- [x] **BUG-01 — Framework section: grid on desktop, carousel on mobile** *(2026-08-18)*
  - `src/pages/index.astro`: on desktop render frameworks as `<div class="framework-grid">` (6 articles). On mobile use `<Carousel>`.
  - `src/styles/global.css`: add `@media (max-width: 1023px)` block with carousel for framework section; hide grid below 1024px.
  - Acceptance: Desktop — 6 cards in 3×2 grid, no arrows, no counter. Mobile — 1 card per page carousel.
  - Flow: DEV → visual QA → STG → PROD.

- [x] **BUG-02 — Delivery Impact card: remove artificial whitespace** *(2026-08-18)*
  - `src/styles/global.css` → `.impact-card`: `justify-content: flex-start; gap: 12px; min-height: 0; padding: 20px 24px`.
  - Acceptance: Cards are compact. Metric and description visually close. No empty zones.
  - Flow: DEV → visual QA → PROD.

- [ ] **PIPELINE — Document GitHub branch protection config for Kranthi to apply**
  - `main`: require PR from `staging`, require 1 approving review, disallow direct push.
  - `staging`: require PR from `develop`, disallow direct push.
  - Cannot automate (GitHub API blocked by proxy). Write instructions as a markdown doc + present to Kranthi.

### Sprint — Next

- [x] **CLEANUP — Remove stale TODO comments** *(2026-08-25)*
  - `src/layouts/MainLayout.astro` L24: remove stale PUBLIC_SITE_URL comment.

- [ ] **SEO — Submit sitemap in Google Search Console**
  - GSC → Sitemaps → submit `https://spm.nagulapalli-kranthi.workers.dev/sitemap-index.xml`
  - Manual action by Kranthi.

- [ ] **SEO — Remove obsolete GSC property**
  - `enterprise-agile-site-prod.nagulapalli-kranthi.workers.dev` was registered by mistake.
  - Kranthi: GSC → Settings → Remove property.

- [ ] **SEO — Bing Webmaster Tools**
  - Submit `spm.nagulapalli-kranthi.workers.dev` at https://www.bing.com/webmasters

- [ ] **CONTENT — Strengthen Success Stories case studies**
  - Each story needs: Problem → Context → Intervention → Operating Model → Measurement → Outcome.
  - Ref: MOP Rule 19.

### Sprint — Following

- [ ] **PERF — Core Web Vitals baseline**
  - PageSpeed Insights on PROD. Record LCP / CLS / INP. Fix anything above threshold.

- [ ] **A11Y — Complete manual keyboard and automated WCAG audit**
  - Structural PROD regression passed; complete keyboard traversal and axe critical/serious review remain.

- [ ] **RESPONSIVE — Complete tablet + mobile visual QA**
  - Desktop passed at 1363 × 936. Verify visually at 768 × 1024 and 390 × 844 when viewport emulation is available.

- [x] **ANALYTICS — Verify existing anonymous event pipeline on PROD** *(2026-08-25)*
  - Confirm the `spm` origin is accepted and the event contains no session or persistent identifier.

---

## Completed Work

| Date | What | Commit |
|---|---|---|
| 2026-08-18 | BUG-01: Framework carousel → CSS grid on desktop (3×2), no arrows | `defcee1` |
| 2026-08-18 | BUG-02: Delivery Impact cards — flex-start + gap, removed min-height | `defcee1` |
| 2026-08-18 | Carousel .carousel-track display:flex added to global.css — fixed 19-card vertical stacking | `12f7788` |
| 2026-08-18 | Canonical/OG URLs fixed to spm across astro.config, robots.txt, deploy.yml | `a239e02` |
| 2026-08-18 | PROD worker renamed enterprise-agile-site-prod → spm in wrangler.jsonc | `193c3a6` |
| 2026-08-18 | Google Search Console meta verification tag added to MainLayout.astro | `b7ad1f8` |
| 2026-08-18 | OG/Twitter social image restored at /images/hero-portrait.png | `0dea021` |
| 2026-08-18 | Hash-based CSP via gen-headers.mjs post-build — A+ security grade | `6a2196c` |
| 2026-08-18 | 5 Dependabot PRs merged (astro 7.2.2, wrangler 4.123.0, checkout-7, setup-node-7, wrangler-action-4) | `47e1807`–`3ccf80f` |
| 2026-08-19 | ARIA, carousel, career timeline, article routing, anchor, and CSP-related audit fixes completed | `129beda`–`b18cf4b` |
| 2026-08-25 | Release 0.5.0: resume withdrawn, PROD analytics repaired, branches aligned, regression recorded | `b38e724f` |

---

## Key File Map

| File | Purpose |
|---|---|
| `src/pages/index.astro` | Main page — all sections |
| `src/layouts/MainLayout.astro` | HTML shell, CSP meta, GSC tag, OG/Twitter, structured data |
| `src/styles/global.css` | All layout CSS — cards, carousels, grids, responsive breakpoints |
| `src/components/Carousel.astro` | Reusable carousel component |
| `scripts/gen-headers.mjs` | Post-build CSP hash generator — writes `dist/_headers` |
| `public/_headers` | Dev fallback headers (unsafe-inline) |
| `wrangler.jsonc` | CF Workers deployment config — 3 envs |
| `.github/workflows/deploy.yml` | CI/CD pipeline |
| `.github/workflows/quality.yml` | Quality gates |
| `docs/SESSION_STATE.md` | **This file** |
| `docs/RELEASE_0.5.0_QA.md` | Release scope, promotion evidence, and responsive regression record |

---

## Session Bootstrap Instructions

**Start of session:**
1. Read this file.
2. Find first `- [ ]` in Next Tasks.
3. Run `git -C /tmp/enterprise-agile-site log --oneline -3` to confirm local state.
4. Clone repo fresh if /tmp is missing: `git clone https://x-access-token:$(cat C:\repos\.ssh\github_token)@github.com/nagulapallikranthi/enterprise-agile-site /tmp/enterprise-agile-site`
5. Execute. Build → DEV → Visual QA → Commit → Push → PROD.

**End of session:**
1. Mark completed tasks `- [x]` with date.
2. Add new bugs to Bug Register.
3. Add new decisions to ADR log.
4. Update Environment State table.
5. Commit this file: `docs(state): update SESSION_STATE after <what-was-done>`

**Commit convention:** `type(scope): description`  
Types: `feat fix refactor style docs chore perf test`  
Scopes: `carousel layout seo security deploy content a11y perf`

---

*Last updated: 2026-08-25 | Session: release 0.5.0 governance and regression*
