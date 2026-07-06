import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  transpilePackages: [
    '@seo-builder/core',
    '@seo-builder/ui',
    '@seo-builder/next',
    '@seo-builder/payload-plugin',
  ],
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

const payloadConfig = withPayload(nextConfig, { devBundleServerPackages: false })

// Next.js 15 does not support top-level `turbopack`; @payloadcms/next adds it for Next 16+.
const { turbopack: _turbopack, ...configForNext15 } = payloadConfig as NextConfig & {
  turbopack?: unknown
}

export default configForNext15
