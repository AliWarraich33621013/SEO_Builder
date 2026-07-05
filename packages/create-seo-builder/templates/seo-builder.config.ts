import { resolveSeoBuilderConfig } from '@seo-builder/core/config'

export default resolveSeoBuilderConfig({
  site: {
    name: 'My Site',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    blogPath: '/blog',
    adminPath: '/seo-admin',
  },
})
