import type { MetadataRoute } from 'next'
import type { Config, SanitizedConfig } from 'payload'

import type { SeoBuilderConfig } from '@seo-builder/core/config'
import { buildCanonicalUrl } from '@seo-builder/core/seo'
import { createQueryHelpers } from './queries/createQueryHelpers'

type PayloadConfigInput = Config | SanitizedConfig | Promise<SanitizedConfig>

export function createRobots(payloadConfig: PayloadConfigInput, seoConfig?: SeoBuilderConfig) {
  const queries = createQueryHelpers(payloadConfig)

  return async function robots(): Promise<MetadataRoute.Robots> {
    const siteSettings = await queries.getSiteSettings()
    const baseUrl =
      seoConfig?.site.url || siteSettings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const adminPath = seoConfig?.site.adminPath || '/seo-admin'
    const indexingEnabled =
      seoConfig?.seo.enableIndexing !== false && siteSettings.robotsIndexingEnabled !== false

    if (!indexingEnabled) {
      return {
        rules: {
          userAgent: '*',
          disallow: '/',
        },
      }
    }

    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [`${adminPath}/`, '/api/'],
        },
      ],
      sitemap: buildCanonicalUrl('/sitemap.xml', { siteUrl: baseUrl }),
    }
  }
}
