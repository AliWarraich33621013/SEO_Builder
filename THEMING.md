# Theming — SEO Builder

SEO Builder themes public blog pages with CSS variables. No Tailwind plugin required — use the variables in your layout or override components from `@seo-builder/ui`.

## Theme provider

```tsx
'use client'

import { SeoBuilderThemeProvider } from '@seo-builder/ui'
import seoBuilderConfig from '../seo-builder.config'

export function AppTheme({ children }: { children: React.ReactNode }) {
  return <SeoBuilderThemeProvider config={seoBuilderConfig}>{children}</SeoBuilderThemeProvider>
}
```

`SeoBuilderThemeProvider` maps `seo-builder.config.ts` branding fields to CSS custom properties on `:root`.

## CSS variables

| Variable | Typical use |
|----------|-------------|
| `--seo-builder-primary` | Links, buttons, accents |
| `--seo-builder-secondary` | Headings, dark accents |
| `--seo-builder-bg` | Page background |
| `--seo-builder-text` | Body text |
| `--seo-builder-muted` | Meta text, footer |
| `--seo-builder-border` | Cards, dividers |
| `--seo-builder-radius` | Card/button radius |
| `--seo-builder-font` | Font stack |

Use in your layout:

```tsx
<body style={{
  background: 'var(--seo-builder-bg)',
  color: 'var(--seo-builder-text)',
  fontFamily: 'var(--seo-builder-font)',
}}>
```

## Example themes

### Local service (towing)

```ts
branding: {
  logoText: 'Flat Bed Car Towing',
  primaryColor: '#dc2626',
  secondaryColor: '#1f2937',
  backgroundColor: '#ffffff',
  textColor: '#111827',
  mutedTextColor: '#6b7280',
  borderColor: '#e5e7eb',
  borderRadius: '14px',
  fontFamily: 'Inter, sans-serif',
}
```

### SaaS

```ts
branding: {
  logoText: 'Acme SaaS',
  primaryColor: '#6366f1',
  secondaryColor: '#0f172a',
  backgroundColor: '#f8fafc',
  textColor: '#0f172a',
  mutedTextColor: '#64748b',
  borderColor: '#e2e8f0',
  borderRadius: '12px',
  fontFamily: 'system-ui, sans-serif',
}
```

### Agency

```ts
branding: {
  logoText: 'Northline Digital',
  primaryColor: '#0d9488',
  secondaryColor: '#134e4a',
  backgroundColor: '#ffffff',
  textColor: '#1c1917',
  mutedTextColor: '#78716c',
  borderColor: '#d6d3d1',
  borderRadius: '8px',
  fontFamily: 'Georgia, serif',
}
```

### E-commerce

```ts
branding: {
  logoText: 'ShopWave',
  primaryColor: '#ea580c',
  secondaryColor: '#292524',
  backgroundColor: '#fffbeb',
  textColor: '#1c1917',
  mutedTextColor: '#a8a29e',
  borderColor: '#fde68a',
  borderRadius: '16px',
  fontFamily: 'Inter, sans-serif',
}
```

## Component overrides

Import individual components from `@seo-builder/ui`:

- `BlogCard`, `BlogList`, `BlogPost`, `BlogCTA`
- `Breadcrumbs`, `FAQBlock`, `AuthorBox`, `RelatedPosts`

Aliases `PostCard` / `PostList` remain for backward compatibility.

For full visual control, copy component patterns from `packages/ui/src/` into your app and customize while keeping data fetching from `@seo-builder/next`.

## Header / footer

The demo app (`apps/demo-next-payload-app`) shows a minimal branded shell in `src/app/(frontend)/layout.tsx` using `seoBuilderConfig.branding.logoText` and `site.blogPath`. Replace with your site chrome.
