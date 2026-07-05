#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const templatesDir = join(__dirname, '../templates')

const targetDir = process.argv[2] || process.cwd()

const files: { template: string; dest: string }[] = [
  { template: 'seo-builder.config.ts', dest: 'seo-builder.config.ts' },
  { template: 'blog-page.tsx', dest: 'app/blog/[[...slug]]/page.tsx' },
  { template: 'sitemap.ts', dest: 'app/sitemap.ts' },
  { template: 'robots.ts', dest: 'app/robots.ts' },
  { template: 'api-route.ts', dest: 'app/api/seo-builder/provider-info/route.ts' },
  { template: 'env.example.additions', dest: 'SEO_BUILDER_ENV.example' },
  { template: 'SEO_BUILDER_SETUP.md', dest: 'SEO_BUILDER_SETUP.md' },
]

console.log('SEO Builder — scaffolding wrapper files for an existing Next.js + Payload project')
console.log(`Target: ${targetDir}\n`)

for (const { template, dest } of files) {
  const src = join(templatesDir, template)
  const out = join(targetDir, dest)
  const outDir = dirname(out)
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  if (existsSync(out)) {
    console.log(`skip (exists): ${dest}`)
    continue
  }
  copyFileSync(src, out)
  console.log(`created: ${dest}`)
}

writeFileSync(
  join(targetDir, 'SEO_BUILDER_SETUP.md'),
  `# SEO Builder setup\n\nSee PACKAGE_INSTALLATION.md in the SEO Builder repo for full steps.\n\n1. Install packages\n2. Add seoBuilderPlugin() to payload.config.ts\n3. Wire blog/sitemap/robots routes (files scaffolded here)\n4. Configure seo-builder.config.ts and .env\n`,
  { flag: 'a' },
)

console.log('\nDone. Next: read SEO_BUILDER_SETUP.md and PACKAGE_INSTALLATION.md')
