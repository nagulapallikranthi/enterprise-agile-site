# Release 0.5.0 — Release and QA Record

Release date: 25 August 2026  
Release path: `develop` → `staging` → `main`  
Status: Released — functional and desktop visual gates passed

## Scope

- Permanently remove the public resume PDF and prevent accidental reintroduction.
- Include the Aug 19 accessibility, carousel, CSP, anchor, Insights, and model-layout fixes.
- Allow anonymous event analytics from the PROD `spm` origin.
- Re-establish identical release commits across DEV, STG, and PROD.
- Refresh release identity and operational state records.

## Automated gates

| Gate | Expected result | Evidence |
|---|---|---|
| Astro production build | Pass | GitHub Actions runs 113–116; final release run 116 passed |
| Build validator | Pass; withdrawn resume absent | DEV, STG, and PROD CI passed |
| Astro type check | Not independently executed | Production build and component compilation passed |
| Dependency audit | Pass | `npm audit --audit-level=high` passed in deployment CI |
| Cloudflare dry run | Pass | DEV, STG, and PROD validation jobs passed |
| Release metadata | Pass | Live tested pages report `data-release="0.5.0"` |

## Functional and accessibility regression

| Viewport | Coverage | Result |
|---|---|---|
| Desktop — browser viewport 1363 × 936 | Navigation, hero, carousel controls, models, Insights, legal pages, contact | Pass |
| Tablet — 768 × 1024 | Responsive rules and breakpoint coverage reviewed; cloud browser could not emulate viewport | Visual check outstanding |
| Mobile — 390 × 844 | Responsive rules and breakpoint coverage reviewed; cloud browser could not emulate viewport | Visual check outstanding |

Additional checks:

- Keyboard-visible focus rules present; complete manual keyboard traversal remains outstanding.
- Skip link targets the present `#main-content` landmark: pass.
- Carousel previous/next controls update position and disabled state: pass.
- Carousel uses a named region and concise atomic live status: pass.
- Structural accessibility regression found no missing alt text, unnamed controls, or duplicate IDs on tested routes.
- No uncaught first-party console errors: pass.
- PROD analytics accepted one controlled `0.5.0 PROD verification` event: pass (`200`, `accepted:true`).
- Former resume URL returns `404`: pass.
- PROD retains HSTS, DENY framing, nosniff, permissions policy, cross-origin policies, and hash-based CSP: pass.

## Promotion evidence

| Environment | Branch | Commit | Deployment | Verification |
|---|---|---|---|---|
| DEV | `develop` | `b38e724f` | GitHub Actions passed | `0.5.0`; resume 404; analytics accepted; desktop visual passed |
| STG | `staging` | `b38e724f` | GitHub Actions passed | `0.5.0`; resume 404; analytics accepted |
| PROD | `main` | `b38e724f` | GitHub Actions run 116 passed | `0.5.0`; route, security, analytics, accessibility, and desktop visual checks passed |

## Residual risks

- Cloudflare edge caching may briefly retain the withdrawn PDF; confirm again after cache expiry if the first request is not a 404/410.
- The in-memory analytics rate limiter is per Worker instance and is not a durable global rate-limit control.
- Branch protection remains an administrative GitHub setting and must be verified separately from branch alignment.
- Tablet/mobile visual emulation and a full manual keyboard traversal remain follow-up QA; they were not represented as completed without evidence.
