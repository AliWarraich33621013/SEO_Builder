import type { CollectionConfig, Config, Plugin } from 'payload'

import type { SeoBuilderPluginOptions } from '@seo-builder/core/config'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Tags } from './collections/Tags'
import { SiteSettings } from './globals/SiteSettings'

const defaultOptions: Required<Pick<SeoBuilderPluginOptions, 'blogPath' | 'adminPath' | 'brandName'>> = {
  blogPath: '/blog',
  adminPath: '/seo-admin',
  brandName: 'SEO Builder',
}

export function seoBuilderPlugin(options: SeoBuilderPluginOptions = {}): Plugin {
  const opts = { ...defaultOptions, ...options }
  const enable = {
    posts: options.collections?.posts !== false,
    categories: options.collections?.categories !== false,
    tags: options.collections?.tags !== false,
    authors: options.collections?.authors !== false,
    media: options.collections?.media !== false,
  }

  const collections: CollectionConfig[] = [
    enable.posts ? Posts : null,
    enable.categories ? Categories : null,
    enable.tags ? Tags : null,
    enable.authors ? Authors : null,
    enable.media ? Media : null,
  ].filter((c): c is CollectionConfig => c !== null)

  return (incomingConfig: Config): Config => {
    return {
      ...incomingConfig,
      collections: [...(incomingConfig.collections || []), ...collections],
      globals: [...(incomingConfig.globals || []), SiteSettings],
      routes: {
        ...incomingConfig.routes,
        admin: opts.adminPath,
      },
      admin: {
        ...incomingConfig.admin,
        meta: {
          titleSuffix: `- ${opts.brandName}`,
          description: `${opts.brandName} Dashboard`,
          ...incomingConfig.admin?.meta,
        },
        components: {
          ...incomingConfig.admin?.components,
          graphics: {
            Logo: '@seo-builder/payload-plugin/graphics/Logo#Logo',
            Icon: '@seo-builder/payload-plugin/graphics/Icon#Icon',
            ...incomingConfig.admin?.components?.graphics,
          },
        },
      },
    }
  }
}

export { Posts, Categories, Tags, Authors, Media, SiteSettings }
export type { SeoBuilderPluginOptions }
