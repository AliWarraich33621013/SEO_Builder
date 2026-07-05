import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['packages/core/src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@seo-builder/core': path.resolve(__dirname, './packages/core/src/index.ts'),
      '@seo-builder/core/ai': path.resolve(__dirname, './packages/core/src/ai/index.ts'),
      '@seo-builder/core/seo': path.resolve(__dirname, './packages/core/src/seo/index.ts'),
    },
  },
})
