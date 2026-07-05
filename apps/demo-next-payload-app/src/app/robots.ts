import config from '@payload-config'
import { createRobots } from '@seo-builder/next/robots'
import seoBuilderConfig from '../../seo-builder.config'

export const dynamic = 'force-dynamic'

export default createRobots(config, seoBuilderConfig)
