# Enterprise Agile

Enterprise Agile is a modern web platform showcasing enterprise program management, CloudOps, DevOps, AI adoption, Jira governance, executive dashboards, delivery transformation, and operational excellence.

## Technology Stack

- Astro
- HTML5
- CSS3
- GitHub
- Cloudflare Workers

## Environments

| Environment | Git branch | Cloudflare Worker | Deployment |
|---|---|---|---|
| DEV | `develop` | `enterprise-agile-site-dev` | Automatic after validation |
| STG | `staging` | `enterprise-agile-site` | Automatic after validation |
| PROD | `main` | `enterprise-agile-site-prod` | Automatic after validation and GitHub environment approval |

The existing site at `https://enterprise-agile-site.nagulapalli-kranthi.workers.dev/` is STG.

Promotion follows one path: feature branch → `develop` → `staging` → `main`. Changes must be validated in each environment before promotion to the next.

GitHub Actions requires the repository secrets `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN`. The token must be restricted to this Cloudflare account and Worker deployment permissions. Configure GitHub environments named `DEV`, `STG`, and `PROD`; require approval on `PROD`.

## Local Development

Install dependencies

```bash
npm install
```

Run locally

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview

```bash
npm run preview
```

## Project Status

Release 0.2.0 — stable DEV candidate

- ✅ Homepage Foundation
- ✅ DEV/STG/PROD deployment workflow
- ✅ About, Success Stories, Frameworks, Articles and Contact
- ✅ Responsive and accessible navigation
- ✅ Resume download and contact destinations
- ✅ Footer, SEO, social metadata, sitemap, robots and custom 404
- ✅ Automated build, link, anchor and accessibility smoke validation

Run the complete local quality gate with `npm run check`.

## Repository

https://github.com/nagulapallikranthi/enterprise-agile-site
