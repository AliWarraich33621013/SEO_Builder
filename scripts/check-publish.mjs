#!/usr/bin/env node
/**
 * Fail if published packages or CLI templates contain non-npm dependency protocols.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const FORBIDDEN = /(?:workspace:|link:|file:)/

const DEP_FIELDS = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
  'bundledDependencies',
]

function collectJsonFiles(dir) {
  const files = []
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return files

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...collectJsonFiles(full))
    } else if (entry.name === 'package.json') {
      files.push(full)
    }
  }
  return files
}

function scanPackageJson(filePath) {
  const issues = []
  const raw = readFileSync(filePath, 'utf8')
  if (FORBIDDEN.test(raw)) {
    const pkg = JSON.parse(raw)
    for (const field of DEP_FIELDS) {
      const deps = pkg[field]
      if (!deps || typeof deps !== 'object') continue
      for (const [name, version] of Object.entries(deps)) {
        if (typeof version === 'string' && FORBIDDEN.test(version)) {
          issues.push(`${field}.${name} = "${version}"`)
        }
      }
    }
    if (issues.length === 0) {
      issues.push('contains forbidden protocol in package.json (non-dependency field)')
    }
  }
  return issues
}

function scanTextFile(filePath) {
  const raw = readFileSync(filePath, 'utf8')
  if (!FORBIDDEN.test(raw)) return []
  return ['contains workspace:/link:/file: reference']
}

const packageJsonFiles = [
  ...collectJsonFiles(join(root, 'packages', 'core')),
  ...collectJsonFiles(join(root, 'packages', 'ui')),
  ...collectJsonFiles(join(root, 'packages', 'payload-plugin')),
  ...collectJsonFiles(join(root, 'packages', 'next')),
  ...collectJsonFiles(join(root, 'packages', 'create-seo-builder')),
]

const templateDir = join(root, 'packages', 'create-seo-builder', 'templates')
const templateFiles = statSync(templateDir, { throwIfNoEntry: false })?.isDirectory()
  ? readdirSync(templateDir).map((name) => join(templateDir, name))
  : []

const failures = []

for (const file of packageJsonFiles) {
  const issues = scanPackageJson(file)
  if (issues.length) {
    failures.push({ file, issues })
  }
}

for (const file of templateFiles) {
  if (!file.endsWith('.json') && !file.endsWith('.ts') && !file.endsWith('.tsx')) continue
  const issues = scanTextFile(file)
  if (issues.length) {
    failures.push({ file, issues })
  }
}

if (failures.length) {
  console.error('\n❌ check:publish failed — published packages must not use workspace:/link:/file:\n')
  for (const { file, issues } of failures) {
    console.error(`  ${file}`)
    for (const issue of issues) {
      console.error(`    - ${issue}`)
    }
  }
  console.error('\nUse npm semver ranges (e.g. "^0.1.1") in packages/* before publishing.\n')
  process.exit(1)
}

console.log('✅ check:publish passed — no workspace:/link:/file: in published package metadata')
