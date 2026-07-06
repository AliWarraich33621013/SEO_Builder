# Deployment Guide — SEO Builder Monorepo

Deploy the demo app or a client app that consumes `@seo-builder/*` packages.

## Monorepo build

From repository root:

```bash
pnpm install
pnpm test
pnpm exec tsc --noEmit -p apps/demo-next-payload-app/tsconfig.json
pnpm build
```

Build order: all `packages/*` via tsup, then `apps/demo-next-payload-app` via Next.js.

## Demo app production start

```bash
cd apps/demo-next-payload-app
pnpm start
```

Or from root after build:

```bash
pnpm --filter demo-next-payload-app start
```

## Secrets checklist

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URI` | Yes | Managed Postgres connection string |
| `PAYLOAD_SECRET` | Yes | Long random string (32+ chars) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Production URL |
| `AI_PROVIDER` | For AI | `gemini` recommended |
| Provider API key | For AI | Without it, AI returns 503 |

## Local development (Docker Postgres)

```bash
cd apps/demo-next-payload-app
docker compose up -d
cp .env.example .env
pnpm dev
```

Default Postgres port: **5433**.

## Pre-deploy commands

```bash
pnpm generate:importmap
pnpm generate:types
```

Run `generate:importmap` after changing admin UI components in the payload plugin.

## Vercel (live demo + landing page)

1. Push repo to GitHub: [AliWarraich33621013/SEO_Builder](https://github.com/AliWarraich33621013/SEO_Builder)
2. [Vercel](https://vercel.com) → **Add New Project** → import `https://github.com/AliWarraich33621013/SEO_Builder`
3. **Root Directory:** `apps/demo-next-payload-app`
4. `vercel.json` configures pnpm install + monorepo build automatically
5. Set environment variables:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URI` | Yes | [Neon](https://neon.tech) Postgres URL with `?sslmode=require` |
| `PAYLOAD_SECRET` | Yes | Random 32+ characters |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://your-project.vercel.app` |
| `AI_PROVIDER` | For AI | `gemini` |
| `GEMINI_API_KEY` | For AI | [Google AI Studio](https://aistudio.google.com/apikey) |
| `NEXT_PUBLIC_GITHUB_REPO` | Recommended | `https://github.com/AliWarraich33621013/SEO_Builder` |

6. Deploy → test `/` (product landing), `/blog`, `/seo-admin`

**Neon (free DB):** Create project → copy connection string → paste as `DATABASE_URI`.

**Custom domain:** Vercel Domains → add DNS records → update `NEXT_PUBLIC_SITE_URL` → redeploy.

**Note:** In-memory rate limiting resets per serverless invocation. See [SECURITY.md](./SECURITY.md).

## VPS / Docker

1. Node.js 20+, pnpm 9+
2. Managed or self-hosted Postgres
3. `pnpm build && pnpm --filter demo-next-payload-app start`
4. Nginx/Caddy reverse proxy with TLS
5. PM2 or systemd for process management

## Package consumption in client apps

Client apps need `transpilePackages` for all `@seo-builder/*` in `next.config.ts`. See [PACKAGE_INSTALLATION.md](./PACKAGE_INSTALLATION.md).

## Sitemap and robots (production)

1. Set `NEXT_PUBLIC_SITE_URL` to live domain
2. Update SEO Settings in dashboard
3. Confirm `/sitemap.xml` and `/robots.txt`

## Post-deploy smoke test

- [ ] `/seo-admin` loads
- [ ] Blog Manager + AI Assistant work
- [ ] `/blog` and `/blog/[slug]` render
- [ ] `GET /api/seo-builder/provider-info`
- [ ] Canonical URLs use production domain

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Workspace package not found in CI | Install from monorepo root with pnpm |
| Admin component missing | `pnpm generate:importmap` + rebuild |
| Wrong blog URLs | `seo-builder.config.ts` + SEO Settings site URL |
