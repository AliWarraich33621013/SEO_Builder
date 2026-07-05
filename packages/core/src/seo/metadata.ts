import type { Metadata } from 'next'

import type { PostForSeo } from './types'

function pickImageUrl(v: unknown): string | undefined {
  if (typeof v === 'object' && v !== null && 'url' in v) {
    const url = (v as { url?: string | null }).url
    return url ?? undefined
  }
  return undefined
}

export type SiteSettingsMeta = {
  siteName?: string | null
  siteUrl?: string | null
  blogPath?: string | null
  defaultMetaTitle?: string | null
  defaultMetaDescription?: string | null
  defaultOgImage?: unknown
}

export function buildCanonicalUrl(path: string, siteSettings?: SiteSettingsMeta): string {
  const base = (siteSettings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  )
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export function generateBlogMetadata(siteSettings?: SiteSettingsMeta): Metadata {
  const title = siteSettings?.defaultMetaTitle || `${siteSettings?.siteName || 'SEO Builder'} Blog`
  const description =
    siteSettings?.defaultMetaDescription || 'Read the latest articles and SEO insights.'
  const ogImage = pickImageUrl(siteSettings?.defaultOgImage)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

export function generatePostMetadata(
  post: PostForSeo & {
    slug?: string | null
    ogTitle?: string | null
    ogDescription?: string | null
    ogImage?: unknown
    noindex?: boolean | null
    nofollow?: boolean | null
  },
  siteSettings?: SiteSettingsMeta,
): Metadata {
  const blogPath = siteSettings?.blogPath || '/blog'
  const title = post.metaTitle || post.title || 'Blog Post'
  const description = post.metaDescription || post.excerpt || ''
  const canonical = post.canonicalUrl || buildCanonicalUrl(`${blogPath}/${post.slug}`, siteSettings)
  const ogTitle = post.ogTitle || title
  const ogDescription = post.ogDescription || description
  const ogImage =
    pickImageUrl(post.ogImage) || pickImageUrl(post.featuredImage) || pickImageUrl(siteSettings?.defaultOgImage)

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: post.noindex ? false : true,
      follow: post.nofollow ? false : true,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'article',
      url: canonical,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: ogTitle,
      description: ogDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}
