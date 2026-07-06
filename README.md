# SEO Builder

**SEO Builder** is a branded AI SEO Blog Kit for Next.js. Payload CMS powers the backend; the product UI is branded as SEO Builder.

[![npm version](https://img.shields.io/npm/v/@seo-builder/core.svg)](https://www.npmjs.com/package/@seo-builder/core)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## Live demo

Deploy the demo app to Vercel or run locally — see [QUICKSTART.md](./QUICKSTART.md).

Set `NEXT_PUBLIC_SITE_URL` to your deployment URL (e.g. `https://your-app.vercel.app`).

## npm packages

| Package | Install |
|---------|---------|
| `@seo-builder/core` | `pnpm add @seo-builder/core` |
| `@seo-builder/payload-plugin` | `pnpm add @seo-builder/payload-plugin` |
| `@seo-builder/ui` | `pnpm add @seo-builder/ui` |
| `@seo-builder/next` | `pnpm add @seo-builder/next` |
| `create-seo-builder` | `pnpm create seo-builder` |

```bash
pnpm add @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next
```

Publishing: [PUBLISHING.md](./PUBLISHING.md)

## Monorepo structure

```
SEO_AI/
├── apps/demo-next-payload-app/   # Live demo + product landing page
├── packages/                     # Published npm packages
├── pnpm-workspace.yaml
└── package.json
```

## Features

- SEO Builder Dashboard at `/seo-admin`
- Blog Manager + AI Assistant tab
- Multi-provider AI (Gemini, OpenAI, Groq, Claude, custom)
- SEO score + letter grade
- Public `/blog` with schema, sitemap, robots
- Theming via `seo-builder.config.ts`

## Quick start (monorepo)

```bash
pnpm install
cp apps/demo-next-payload-app/.env.example apps/demo-next-payload-app/.env
cd apps/demo-next-payload-app && docker compose up -d
pnpm dev
```

## Deploy to Vercel

1. Push this repo to GitHub: [AliWarraich33621013/SEO_Builder](https://github.com/AliWarraich33621013/SEO_Builder)
2. [Vercel](https://vercel.com) → Import project from `https://github.com/AliWarraich33621013/SEO_Builder`
3. **Root Directory:** `apps/demo-next-payload-app`
4. Add env vars (see [DEPLOYMENT.md](./DEPLOYMENT.md)):
   - `DATABASE_URI` — [Neon](https://neon.tech) Postgres connection string
   - `PAYLOAD_SECRET` — random 32+ char string
   - `NEXT_PUBLIC_SITE_URL` — your Vercel URL
   - `NEXT_PUBLIC_GITHUB_REPO` — `https://github.com/AliWarraich33621013/SEO_Builder`
   - `GEMINI_API_KEY` — for AI features
5. Deploy

`vercel.json` in the demo app runs `pnpm build` from the monorepo root.

## Documentation

| Doc | Purpose |
|-----|---------|
| [QUICKSTART.md](./QUICKSTART.md) | Run demo locally |
| [PACKAGE_INSTALLATION.md](./PACKAGE_INSTALLATION.md) | Add to your Next + Payload app |
| [PUBLISHING.md](./PUBLISHING.md) | Publish packages to npm |
| [CONFIGURATION.md](./CONFIGURATION.md) | `seo-builder.config.ts` |
| [THEMING.md](./THEMING.md) | CSS variables |
| [AI_PROVIDERS.md](./AI_PROVIDERS.md) | Provider env vars |
| [API_REFERENCE.md](./API_REFERENCE.md) | API endpoints |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deploy |
| [SECURITY.md](./SECURITY.md) | Secrets + rate limits |

## Scripts

| Command | Action |
|---------|--------|
| `pnpm dev` | Build packages + start demo |
| `pnpm build` | Build packages + demo |
| `pnpm test` | Run tests |
| `pnpm publish:packages` | Publish all packages to npm |

## License

MIT
