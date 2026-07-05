import type { MetadataRoute } from 'next'
import type { Config, SanitizedConfig } from 'payload'

import type { SeoBuilderConfig } from '@seo-builder/core/config'
import { buildCanonicalUrl } from '@seo-builder/core/seo'
import { createQueryHelpers } from './queries/createQueryHelpers'

type PayloadConfigInput = Config | SanitizedConfig | Promise<SanitizedConfig>

export function createSitemap(payloadConfig: PayloadConfigInput, seoConfig?: SeoBuilderConfig) {
  const queries = createQueryHelpers(payloadConfig)

  return async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteSettings = await queries.getSiteSettings()
    const blogPath = seoConfig?.site.blogPath || siteSettings.blogPath || '/blog'
    const baseUrl =
      seoConfig?.site.url || siteSettings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const [posts, categories, tags, authors] = await Promise.all([
      queries.getAllPublishedPostSlugs(),
      queries.getAllCategories(),
      queries.getAllTags(),
      queries.getAllAuthors(),
    ])

    const staticRoutes: MetadataRoute.Sitemap = [
      {
        url: buildCanonicalUrl('/', { siteUrl: baseUrl }),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: buildCanonicalUrl(blogPath, { siteUrl: baseUrl }),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]

    const postRoutes: MetadataRoute.Sitemap = posts.docs.map((post) => {
      const slug = String(post.slug ?? '')
      return {
        url: buildCanonicalUrl(`${blogPath}/${slug}`, { siteUrl: baseUrl }),
        lastModified: post.updatedAt ? new Date(String(post.updatedAt)) : undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }
    })

    const categoryRoutes: MetadataRoute.Sitemap = categories.docs.map((cat) => ({
      url: buildCanonicalUrl(`${blogPath}/category/${String(cat.slug ?? '')}`, { siteUrl: baseUrl }),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const tagRoutes: MetadataRoute.Sitemap = tags.docs.map((tag) => ({
      url: buildCanonicalUrl(`${blogPath}/tag/${String(tag.slug ?? '')}`, { siteUrl: baseUrl }),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

    const authorRoutes: MetadataRoute.Sitemap = authors.docs.map((author) => ({
      url: buildCanonicalUrl(`${blogPath}/author/${String(author.slug ?? '')}`, { siteUrl: baseUrl }),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes, ...authorRoutes]
  }
}
