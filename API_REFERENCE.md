# API Reference — `/api/seo-builder/*`

All AI POST routes are rate-limited (30 requests / 15 minutes / IP) and validate input with Zod. Responses use `{ success, data }` or `{ success: false, error }` from `@seo-builder/core/api-response`.

Base path: `/api/seo-builder`

## Public

### `GET /provider-info`

Returns active AI provider and model. No auth required.

### `GET /posts`

Returns published posts (paginated). Query: `?page=1&limit=10`.

## AI generation (POST)

Each route accepts JSON validated by its schema. Common fields often include `title`, `content`, `keywords`, `topic`.

| Route | Purpose |
|-------|---------|
| `POST /generate-title` | Blog post title suggestions |
| `POST /generate-outline` | Article outline |
| `POST /generate-meta-title` | SEO meta title |
| `POST /generate-meta-description` | Meta description |
| `POST /generate-meta` | Meta title + description |
| `POST /generate-slug` | URL slug |
| `POST /generate-faq` | FAQ pairs |
| `POST /generate-excerpt` | Post excerpt |
| `POST /generate-alt-text` | Image alt text |
| `POST /generate-social` | Social share copy |
| `POST /generate-social-captions` | Platform-specific captions |
| `POST /generate-content-brief` | Content brief |
| `POST /detect-search-intent` | Search intent classification |
| `POST /generate-cta` | CTA copy |
| `POST /improve-readability` | Readability improvements |
| `POST /seo-score` | SEO score + grade (no external AI call) |

## SEO score

`POST /seo-score` accepts post fields and optional `siteSettings`. Returns score breakdown and letter grade from `@seo-builder/core/seo`.

## Wiring in your app

Thin re-export pattern:

```ts
// app/api/seo-builder/generate-title/route.ts
export { POST } from '@seo-builder/next/routes/generate-title/route'
```

Or from main package:

```ts
export { generateTitlePOST as POST } from '@seo-builder/next'
```

## Implementation location

Route handlers live in `packages/next/src/routes/`. Shared wrapper: `withAiRoute` / `withAiRouteSimple` in `packages/next/src/route-handler.ts`.

## Security note

These routes are public by default. Add auth middleware or reverse-proxy restrictions if needed. See [SECURITY.md](./SECURITY.md).
