import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'ai/index': 'src/ai/index.ts',
    'seo/index': 'src/seo/index.ts',
    'config/index': 'src/config/index.ts',
    'validation/index': 'src/validation/index.ts',
    'api-response': 'src/api-response.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['next', 'next/server'],
})
