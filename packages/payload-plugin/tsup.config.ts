import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'components/admin/AiAssistantPanel': 'src/components/admin/AiAssistantPanel.tsx',
    'graphics/Logo/index': 'src/graphics/Logo/index.tsx',
    'graphics/Icon/index': 'src/graphics/Icon/index.tsx',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    'payload',
    '@payloadcms/ui',
    '@payloadcms/richtext-lexical',
    'react',
    'react-dom',
    '@seo-builder/core',
  ],
})
