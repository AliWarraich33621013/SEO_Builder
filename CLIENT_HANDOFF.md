# Client Handoff — SEO Builder

Checklist for agencies delivering SEO Builder to a client.

## Deliverables

- [ ] Repository or deployment access
- [ ] `seo-builder.config.ts` with client branding
- [ ] `.env` / hosting secrets documented (not committed)
- [ ] Admin URL (`/seo-admin`) and initial admin account
- [ ] This documentation set (or client-facing subset)

## Documentation to share

| Doc | Client needs it? |
|-----|------------------|
| [QUICKSTART.md](./QUICKSTART.md) | Yes — run locally |
| [PACKAGE_INSTALLATION.md](./PACKAGE_INSTALLATION.md) | If they self-integrate |
| [CONFIGURATION.md](./CONFIGURATION.md) | Yes — site settings |
| [THEMING.md](./THEMING.md) | Yes — brand colors |
| [AI_PROVIDERS.md](./AI_PROVIDERS.md) | Yes — API keys |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Yes — go live |
| [SECURITY.md](./SECURITY.md) | Yes — responsibilities |
| [API_REFERENCE.md](./API_REFERENCE.md) | Optional — developers |

## Client training (30 min)

1. **Dashboard** — `/seo-admin`: Blog Manager, SEO Settings, AI Assistant tab
2. **Publishing** — draft → publish, SEO score on save
3. **AI** — generate title, meta, FAQ from AI Assistant
4. **Public blog** — `/blog`, categories, tags
5. **Go-live** — `NEXT_PUBLIC_SITE_URL`, enable indexing in SEO Settings

## Environment handoff

Provide a secure channel for:

- `PAYLOAD_SECRET`
- `DATABASE_URI`
- AI provider API key(s)
- Production `NEXT_PUBLIC_SITE_URL`

## Post-launch verification

- [ ] `/seo-admin` login works
- [ ] Create/edit post — SEO grade updates
- [ ] `/blog` and post page canonical URLs correct
- [ ] `sitemap.xml` lists published posts
- [ ] `robots.txt` reflects indexing preference
- [ ] `GET /api/seo-builder/provider-info` works
- [ ] HTTPS enabled

## Support boundaries

- Client owns hosting, database backups, API key billing
- AI content should be reviewed before publish
- Rate limits are in-memory per instance — note for multi-region deploys

## Customization scope

| In scope (config) | Out of scope (custom dev) |
|-------------------|---------------------------|
| `seo-builder.config.ts` branding | Custom collection schemas |
| SEO Settings global | Non-Payload CMS |
| CTA copy / colors | Auth beyond Payload users |
| Blog path / admin path | Redis rate limiting |

## Monorepo vs installed packages

This repo uses `workspace:*` links. Client projects install published packages (future) or receive a fork with the same structure under `apps/` + `packages/`.
