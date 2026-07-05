import config from '@payload-config'
import { createSitemap } from '@seo-builder/next/sitemap'
import seoBuilderConfig from '../../seo-builder.config'

export const dynamic = 'force-dynamic'

export default createSitemap(config, seoBuilderConfig)
