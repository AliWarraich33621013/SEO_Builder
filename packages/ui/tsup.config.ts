import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.tsx', 'src/theme.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  tsconfig: 'tsconfig.json',
  external: ['react', 'react-dom', '@payloadcms/richtext-lexical', '@payloadcms/richtext-lexical/react'],
})
