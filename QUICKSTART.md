# SEO Builder — Quickstart

Run the demo app in about 10 minutes.

## Prerequisites

- Node.js 20+
- pnpm 9+ (`corepack enable && corepack prepare pnpm@9.15.4 --activate`)
- Docker (for local PostgreSQL)

## 1. Install

```bash
git clone <your-repo-url>
cd SEO_AI
pnpm install
```

## 2. Environment

```bash
cp apps/demo-next-payload-app/.env.example apps/demo-next-payload-app/.env
```

Set at minimum:

- `DATABASE_URI` — default uses port **5433** (see `docker-compose.yml`)
- `PAYLOAD_SECRET` — long random string
- `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000`
- `GEMINI_API_KEY` — for AI features (optional for first login)

## 3. Database

```bash
cd apps/demo-next-payload-app
docker compose up -d
```

## 4. Start dev server

From repo root:

```bash
pnpm dev
```

Or from the demo app:

```bash
cd apps/demo-next-payload-app
pnpm dev
```

## 5. Open the app

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Home |
| http://localhost:3000/seo-admin | SEO Builder Dashboard |
| http://localhost:3000/blog | Public blog |
| http://localhost:3000/sitemap.xml | Sitemap |
| http://localhost:3000/robots.txt | Robots |

Create your first admin account at `/seo-admin`, or run:

```bash
pnpm --filter demo-next-payload-app reset:admin
```

## 6. Verify AI (optional)

```bash
curl http://localhost:3000/api/seo-builder/provider-info
```

## Next steps

- Customize branding in `apps/demo-next-payload-app/seo-builder.config.ts`
- Read [PACKAGE_INSTALLATION.md](./PACKAGE_INSTALLATION.md) to add SEO Builder to your own Next.js + Payload app
- Read [CONFIGURATION.md](./CONFIGURATION.md) and [THEMING.md](./THEMING.md)
