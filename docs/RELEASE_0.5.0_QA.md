# Release 0.5.0 — Release and QA Record

Release date: 25 August 2026  
Release path: `develop` → `staging` → `main`  
Status: Candidate under verification

## Scope

- Permanently remove the public resume PDF and prevent accidental reintroduction.
- Include the Aug 19 accessibility, carousel, CSP, anchor, Insights, and model-layout fixes.
- Allow anonymous event analytics from the PROD `spm` origin.
- Re-establish identical release commits across DEV, STG, and PROD.
- Refresh release identity and operational state records.

## Automated gates

| Gate | Expected result | Evidence |
|---|---|---|
| Astro production build | Pass | Pending |
| Build validator | Pass; withdrawn resume absent | Pending |
| Astro type check | Pass | Pending |
| Dependency audit | No high/critical findings | Pending |
| Cloudflare dry run | Pass for each environment | Pending |
| Release metadata | Every HTML page reports `0.5.0` | Pending |

## Functional and accessibility regression

| Viewport | Coverage | Result |
|---|---|---|
| Desktop — 1440 × 900 | Navigation, hero, carousels, models, Insights, legal links, contact | Pending |
| Tablet — 768 × 1024 | Responsive navigation, content padding, cards, overflow, touch controls | Pending |
| Mobile — 390 × 844 | Menu, reading order, carousels, focus visibility, horizontal overflow | Pending |

Additional checks:

- Keyboard-only traversal and visible focus.
- Skip link reaches `#main-content`.
- Carousel previous/next controls update slide state and disabled state.
- Carousel live status is announced without duplicate control names.
- No critical or serious automated accessibility findings.
- No uncaught console errors or blocked first-party scripts.
- PROD analytics accepts the approved PROD origin during the controlled post-release test.
- Former resume URL returns `404` or `410` after deployment.
- PROD security headers retain the generated hash-based CSP.

## Promotion evidence

| Environment | Branch | Commit | Deployment | Verification |
|---|---|---|---|---|
| DEV | `develop` | Pending | Pending | Pending |
| STG | `staging` | Pending | Pending | Pending |
| PROD | `main` | Pending | Pending | Pending |

## Residual risks

- Cloudflare edge caching may briefly retain the withdrawn PDF; confirm again after cache expiry if the first request is not a 404/410.
- The in-memory analytics rate limiter is per Worker instance and is not a durable global rate-limit control.
- Branch protection remains an administrative GitHub setting and must be verified separately from branch alignment.

