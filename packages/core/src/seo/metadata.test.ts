import { afterEach, describe, expect, it } from 'vitest'

import { buildCanonicalUrl, generatePostMetadata } from './metadata'

describe('buildCanonicalUrl', () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL

  afterEach(() => {
    if (originalSiteUrl) {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL
    }
  })

  it('uses siteUrl from settings, not hardcoded localhost', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    const url = buildCanonicalUrl('/blog/my-post', { siteUrl: 'https://mybrand.com' })
    expect(url).toBe('https://mybrand.com/blog/my-post')
    expect(url).not.toContain('localhost')
  })

  it('falls back to NEXT_PUBLIC_SITE_URL when settings missing', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://fallback.example'
    const url = buildCanonicalUrl('/blog/post')
    expect(url).toBe('https://fallback.example/blog/post')
  })
})

describe('generatePostMetadata', () => {
  it('sets canonical from site settings', () => {
    const meta = generatePostMetadata(
      {
        title: 'Hello',
        slug: 'hello',
        metaDescription: 'A description',
      },
      { siteUrl: 'https://production.com', blogPath: '/blog' },
    )

    expect(meta.alternates?.canonical).toBe('https://production.com/blog/hello')
  })
})
