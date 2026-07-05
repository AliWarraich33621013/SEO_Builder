# Configuration — `seo-builder.config.ts`

SEO Builder centralizes product settings in a single config file resolved via `resolveSeoBuilderConfig()` from `@seo-builder/core/config`.

## Basic structure

```ts
import { resolveSeoBuilderConfig } from '@seo-builder/core/config'

export default resolveSeoBuilderConfig({
  site: { /* ... */ },
  branding: { /* ... */ },
  blog: { /* ... */ },
  cta: { /* ... */ },
  ai: { /* ... */ },
  seo: { /* ... */ },
})
```

Partial overrides merge with `defaultSeoBuilderConfig`.

## `site`

| Field | Description |
|-------|-------------|
| `name` | Site / brand name |
| `url` | Canonical base URL (use `NEXT_PUBLIC_SITE_URL` in production) |
| `blogPath` | Public blog path (default `/blog`) |
| `adminPath` | Dashboard path (default `/seo-admin`) |
| `defaultLocale` | Locale code (e.g. `en`) |

## `branding`

Controls CSS variables via `SeoBuilderThemeProvider`. See [THEMING.md](./THEMING.md).

| Field | CSS variable |
|-------|--------------|
| `primaryColor` | `--seo-builder-primary` |
| `secondaryColor` | `--seo-builder-secondary` |
| `backgroundColor` | `--seo-builder-bg` |
| `textColor` | `--seo-builder-text` |
| `mutedTextColor` | `--seo-builder-muted` |
| `borderColor` | `--seo-builder-border` |
| `borderRadius` | `--seo-builder-radius` |
| `fontFamily` | `--seo-builder-font` |

## `blog`

| Field | Description |
|-------|-------------|
| `template` | Template identifier (`default`) |
| `layout` | `grid` or `list` |
| `postsPerPage` | Pagination size |
| `showAuthor` | Show author on post pages |
| `showReadingTime` | Show reading time |
| `showTableOfContents` | TOC on long posts |
| `showRelatedPosts` | Related posts block |
| `showFaq` | FAQ block + schema |
| `showBreadcrumbs` | Breadcrumb nav + schema |

## `cta`

Call-to-action block on blog pages.

| Field | Description |
|-------|-------------|
| `enabled` | Show/hide CTA |
| `title`, `description` | CTA copy |
| `buttonText`, `buttonUrl` | Button label and link (`tel:` for phone) |

## `ai`

| Field | Description |
|-------|-------------|
| `defaultProvider` | `gemini`, `openai`, `groq`, `claude`, or `custom` |

Runtime provider is selected by `AI_PROVIDER` env var; config documents the intended default.

## `seo`

| Field | Description |
|-------|-------------|
| `defaultMetaTitle` | Fallback meta title |
| `defaultMetaDescription` | Fallback meta description |
| `defaultOgImage` | Default OG image URL |
| `enableIndexing` | Whether robots should allow indexing |

Also configure per-site values in **SEO Settings** global (`/seo-admin`).

## Plugin options (separate from config file)

In `payload.config.ts`:

```ts
seoBuilderPlugin({
  blogPath: '/blog',
  adminPath: '/seo-admin',
  brandName: 'SEO Builder',
  collections: { posts: true, categories: true, tags: true, authors: true, media: true },
  aiAssistant: true,
})
```

## Demo reference

See `apps/demo-next-payload-app/seo-builder.config.ts` — **Flat Bed Car Towing** local service sample.
