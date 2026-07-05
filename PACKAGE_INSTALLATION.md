# Package Installation — SEO Builder

Add SEO Builder to an **existing** Next.js 15 + Payload CMS 3 project.

## Overview

| Package | Purpose |
|---------|---------|
| `@seo-builder/core` | AI providers, SEO scoring, config, utilities |
| `@seo-builder/payload-plugin` | Collections, globals, admin AI panel |
| `@seo-builder/ui` | Public blog components + theme |
| `@seo-builder/next` | API routes, sitemap, robots, query helpers |
| `create-seo-builder` | Scaffold thin route wrappers (optional) |

## Step 1 — Install packages

```bash
pnpm add @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next
```

For local monorepo development, use `workspace:*` in a pnpm workspace instead.

## Step 2 — Transpile packages

In `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: [
    '@seo-builder/core',
    '@seo-builder/ui',
    '@seo-builder/next',
    '@seo-builder/payload-plugin',
  ],
}
```

## Step 3 — Add the Payload plugin

In `payload.config.ts`:

```ts
import { seoBuilderPlugin } from '@seo-builder/payload-plugin'

export default buildConfig({
  // your db adapter, secret, Users collection, etc.
  plugins: [
    seoBuilderPlugin({
      blogPath: '/blog',
      adminPath: '/seo-admin',
      brandName: 'SEO Builder',
    }),
  ],
})
```

The plugin adds Posts, Categories, Tags, Authors, Media collections, SEO Settings global, and the AI Assistant panel. **You keep ownership of** Users, database adapter, and `PAYLOAD_SECRET`.

## Step 4 — Generate import map

After adding the plugin:

```bash
pnpm payload generate:importmap
```

Re-run whenever admin UI components change.

## Step 5 — Add `seo-builder.config.ts`

```ts
import { resolveSeoBuilderConfig } from '@seo-builder/core/config'

export default resolveSeoBuilderConfig({
  site: { name: 'My Site', url: 'https://example.com', blogPath: '/blog' },
  branding: { logoText: 'My Site', primaryColor: '#2563eb', /* ... */ },
})
```

See [CONFIGURATION.md](./CONFIGURATION.md).

## Step 6 — Wire route wrappers

### Sitemap & robots

```ts
// app/sitemap.ts
import config from '@payload-config'
import seoBuilderConfig from '../seo-builder.config'
import { createSitemap } from '@seo-builder/next/sitemap'

export default createSitemap(config, seoBuilderConfig)
```

```ts
// app/robots.ts
import config from '@payload-config'
import seoBuilderConfig from '../seo-builder.config'
import { createRobots } from '@seo-builder/next/robots'

export default createRobots(config, seoBuilderConfig)
```

### API routes (thin re-exports)

Copy from `apps/demo-next-payload-app/src/app/api/seo-builder/` or scaffold with:

```bash
pnpm exec create-seo-builder .
```

Example:

```ts
// app/api/seo-builder/generate-title/route.ts
export { POST } from '@seo-builder/next/routes/generate-title/route'
```

### Blog pages

Copy blog routes from `apps/demo-next-payload-app/src/app/(frontend)/blog/` or build custom pages using `@seo-builder/ui` components and `createQueryHelpers` from `@seo-builder/next`.

```ts
import config from '@payload-config'
import { createQueryHelpers } from '@seo-builder/next'

const { getPublishedPosts, getSiteSettings } = createQueryHelpers(config)
```

### Theme

Wrap your frontend layout:

```tsx
import { SeoBuilderThemeProvider } from '@seo-builder/ui'
import seoBuilderConfig from '../../seo-builder.config'

export function Root({ children }) {
  return (
    <SeoBuilderThemeProvider config={seoBuilderConfig}>
      {children}
    </SeoBuilderThemeProvider>
  )
}
```

## Step 7 — Environment variables

Add AI provider keys to `.env`. See [AI_PROVIDERS.md](./AI_PROVIDERS.md) and `SEO_BUILDER_ENV.example` from the CLI scaffold.

## Step 8 — Smoke test

- [ ] `/seo-admin` loads
- [ ] Blog Manager + AI Assistant tab work
- [ ] `/blog` renders
- [ ] `/sitemap.xml` and `/robots.txt` work
- [ ] `GET /api/seo-builder/provider-info` returns provider info

## Payload config injection

Factory APIs in `@seo-builder/next` accept your `payload.config` explicitly — no hidden globals required. Pass `config` from `@payload-config` to `createQueryHelpers`, `createSitemap`, and `createRobots`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Admin component not found | Run `generate:importmap` |
| Module not found for `@seo-builder/*` | Add `transpilePackages` |
| Type errors on route imports | Use explicit exports from `@seo-builder/next/routes/<name>/route` |

See also [DEPLOYMENT.md](./DEPLOYMENT.md) and [SECURITY.md](./SECURITY.md).
