import { buildCanonicalUrl } from './metadata'
import type { PostForSeo, SiteSettingsForSeo } from './types'

function pickImageUrl(v: unknown): string | undefined {
  if (typeof v === 'object' && v !== null && 'url' in v) {
    const url = (v as { url?: string | null }).url
    return url ?? undefined
  }
  return undefined
}

type PostWithRelations = PostForSeo & {
  slug?: string | null
  excerpt?: string | null
  updatedAt?: string | null
  publishedAt?: string | null
  featuredImage?: unknown
  author?: unknown
  categories?: unknown
}

type SiteSettingsSchema = SiteSettingsForSeo & {
  siteName?: string | null
  organizationName?: string | null
  organizationLogo?: unknown
  blogPath?: string | null
}

export function generateArticleSchema(post: PostWithRelations, siteSettings?: SiteSettingsSchema) {
  const blogPath = siteSettings?.blogPath || '/blog'
  const url = buildCanonicalUrl(`${blogPath}/${post.slug}`, siteSettings)
  const authorName =
    typeof post.author === 'object' && post.author && 'name' in post.author
      ? post.author.name
      : siteSettings?.siteName

  const imageUrl = pickImageUrl(post.featuredImage)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: authorName
      ? {
          '@type': 'Person',
          name: authorName,
        }
      : undefined,
    publisher: siteSettings?.organizationName
      ? {
          '@type': 'Organization',
          name: siteSettings.organizationName,
          logo: pickImageUrl(siteSettings.organizationLogo)
            ? {
                '@type': 'ImageObject',
                url: pickImageUrl(siteSettings.organizationLogo),
              }
            : undefined,
        }
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function generateFAQSchema(post: PostForSeo & { faqItems?: { question?: string | null; answer?: string | null }[] | null }) {
  if (!post.faqItems?.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqItems
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
  }
}

export function generateBreadcrumbSchema(post: PostWithRelations, siteSettings?: SiteSettingsSchema) {
  const blogPath = siteSettings?.blogPath || '/blog'
  const siteName = siteSettings?.siteName || 'Home'
  const postUrl = buildCanonicalUrl(`${blogPath}/${post.slug}`, siteSettings)
  const categories = Array.isArray(post.categories) ? post.categories : []
  const category = categories.length > 0 ? categories[0] : null
  const categoryName =
    typeof category === 'object' && category !== null && 'name' in category
      ? (category as { name?: string | null }).name
      : null
  const categorySlug =
    typeof category === 'object' && category !== null && 'slug' in category
      ? (category as { slug?: string | null }).slug
      : null

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: siteName,
      item: buildCanonicalUrl('/', siteSettings),
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: buildCanonicalUrl(blogPath, siteSettings),
    },
  ]

  if (categoryName && categorySlug) {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: categoryName,
      item: buildCanonicalUrl(`${blogPath}/category/${categorySlug}`, siteSettings),
    })
    items.push({
      '@type': 'ListItem',
      position: 4,
      name: post.title || 'Post',
      item: postUrl,
    })
  } else {
    items.push({
      '@type': 'ListItem',
      position: 3,
      name: post.title || 'Post',
      item: postUrl,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}
