#!/usr/bin/env node
/**
 * Build and publish all SEO Builder packages to npm in dependency order.
 * Requires: npm login, pnpm install, write access to @seo-builder scope.
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const packages = [
  'core',
  'ui',
  'payload-plugin',
  'next',
  'create-seo-builder',
]

function run(cmd, cwd = root) {
  console.log(`\n> ${cmd}`)
  execSync(cmd, { cwd, stdio: 'inherit', env: process.env })
}

try {
  run('npm whoami')
} catch {
  console.error('\n❌ Not logged in to npm. Run: npm login')
  console.error('   Enable 2FA on npmjs.com, then retry: pnpm publish:packages\n')
  process.exit(1)
}

console.log('\n📦 Building packages...')
for (const pkg of packages) {
  const dir = join(root, 'packages', pkg)
  run('pnpm build', dir)
  const distDir = join(dir, 'dist')
  if (!existsSync(distDir)) {
    console.error(`❌ Missing dist/ in packages/${pkg}`)
    process.exit(1)
  }
}

run('node scripts/check-publish.mjs')

console.log('\n🚀 Publishing to npm (public)...')
const otpFlag = process.env.NPM_OTP ? `--otp=${process.env.NPM_OTP}` : ''
for (const pkg of packages) {
  const dir = join(root, 'packages', pkg)
  run(`npm publish --access public ${otpFlag}`.trim(), dir)
}

console.log('\n✅ All packages published at 0.1.1')
console.log('   https://www.npmjs.com/package/@seo-builder/core')
console.log('   https://www.npmjs.com/package/create-seo-builder')
