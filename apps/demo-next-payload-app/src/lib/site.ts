export const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || 'https://github.com/AliWarraich33621013/SEO_Builder'

export const NPM_PACKAGES = [
  { name: '@seo-builder/core', href: 'https://www.npmjs.com/package/@seo-builder/core' },
  { name: '@seo-builder/payload-plugin', href: 'https://www.npmjs.com/package/@seo-builder/payload-plugin' },
  { name: '@seo-builder/ui', href: 'https://www.npmjs.com/package/@seo-builder/ui' },
  { name: '@seo-builder/next', href: 'https://www.npmjs.com/package/@seo-builder/next' },
  { name: 'create-seo-builder', href: 'https://www.npmjs.com/package/create-seo-builder' },
] as const

export const DOC_LINKS = [
  { label: 'README', path: 'README.md' },
  { label: 'Quickstart', path: 'QUICKSTART.md' },
  { label: 'Package installation', path: 'PACKAGE_INSTALLATION.md' },
  { label: 'Configuration', path: 'CONFIGURATION.md' },
  { label: 'AI providers', path: 'AI_PROVIDERS.md' },
  { label: 'API reference', path: 'API_REFERENCE.md' },
  { label: 'Publishing', path: 'PUBLISHING.md' },
] as const

export function githubDocUrl(path: string) {
  return `${GITHUB_REPO}/blob/main/${path}`
}
