import { defineConfig } from 'tsup'

const routes = [
  'generate-title',
  'generate-outline',
  'generate-meta-title',
  'generate-meta-description',
  'generate-meta',
  'generate-slug',
  'generate-faq',
  'generate-excerpt',
  'generate-alt-text',
  'generate-social',
  'generate-social-captions',
  'generate-content-brief',
  'detect-search-intent',
  'generate-cta',
  'improve-readability',
  'seo-score',
  'provider-info',
]

const routeEntries = Object.fromEntries(
  routes.map((name) => [`routes/${name}/route`, `src/routes/${name}/route.ts`]),
)

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    sitemap: 'src/sitemap.ts',
    robots: 'src/robots.ts',
    'route-handler': 'src/route-handler.ts',
    ...routeEntries,
  },
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  external: [
    'next',
    'next/server',
    'payload',
    '@payloadcms/next',
    '@seo-builder/core',
    '@seo-builder/ui',
  ],
})
