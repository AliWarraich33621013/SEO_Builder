import Link from 'next/link'

import { DOC_LINKS, GITHUB_REPO, NPM_PACKAGES, githubDocUrl } from '@/lib/site'

const features = [
  {
    title: 'Blog Manager',
    description: 'Posts, categories, tags, authors, and media — with SEO fields on every post.',
  },
  {
    title: 'AI SEO Assistant',
    description: 'Generate titles, meta, FAQs, slugs, and more from the admin panel or API.',
  },
  {
    title: 'SEO score & grade',
    description: 'Automatic checklist scoring with letter grades saved on every post.',
  },
  {
    title: 'Technical SEO',
    description: 'JSON-LD schema, dynamic sitemap.xml, robots.txt, and canonical URLs.',
  },
]

export default function HomePage() {
  return (
    <div className="space-y-20 pb-8">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <p
          className="mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium"
          style={{
            background: 'color-mix(in srgb, var(--seo-builder-primary) 12%, white)',
            color: 'var(--seo-builder-primary)',
          }}
        >
          Open source · MIT · npm packages
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          SEO Builder
        </h1>
        <p className="mt-2 text-lg font-medium" style={{ color: 'var(--seo-builder-muted)' }}>
          AI SEO Blog Kit for Next.js
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--seo-builder-muted)' }}>
          Self-hosted blog with multi-provider AI, SEO scoring, admin dashboard, and production-ready
          public pages. Built on Next.js 15 and Payload CMS 3 — branded as SEO Builder, not Payload.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/blog"
            className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ background: 'var(--seo-builder-primary)' }}
          >
            View demo blog
          </Link>
          <Link
            href="/seo-admin"
            className="rounded-xl border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
            style={{
              borderColor: 'var(--seo-builder-border)',
              color: 'var(--seo-builder-text)',
              background: 'var(--seo-builder-bg)',
            }}
          >
            Open dashboard
          </Link>
          <a
            href={NPM_PACKAGES[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-6 py-3 text-sm font-semibold transition hover:opacity-80"
            style={{
              borderColor: 'var(--seo-builder-border)',
              color: 'var(--seo-builder-text)',
              background: 'white',
            }}
          >
            Install from npm
          </a>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="mb-8 text-center text-2xl font-bold">Everything you need for SEO content</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border p-6"
              style={{
                borderColor: 'var(--seo-builder-border)',
                background: 'white',
              }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--seo-builder-muted)' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section
        className="rounded-2xl border p-8"
        style={{ borderColor: 'var(--seo-builder-border)', background: 'white' }}
      >
        <h2 className="text-2xl font-bold">Quick install</h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--seo-builder-muted)' }}>
          Add to an existing Next.js 15 + Payload 3 project:
        </p>
        <pre
          className="mt-4 overflow-x-auto rounded-xl p-4 text-sm leading-relaxed"
          style={{
            background: 'var(--seo-builder-secondary)',
            color: '#f9fafb',
          }}
        >
          {`pnpm add @seo-builder/core @seo-builder/payload-plugin @seo-builder/ui @seo-builder/next

# Scaffold route wrappers
pnpm create seo-builder .`}
        </pre>
        <p className="mt-4 text-sm" style={{ color: 'var(--seo-builder-muted)' }}>
          See{' '}
          <a
            href={githubDocUrl('PACKAGE_INSTALLATION.md')}
            className="font-medium underline"
            style={{ color: 'var(--seo-builder-primary)' }}
          >
            Package installation guide
          </a>{' '}
          for the full 8-step setup.
        </p>
      </section>

      {/* Packages */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">npm packages</h2>
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--seo-builder-border)' }}>
          <table className="w-full text-left text-sm">
            <thead style={{ background: 'color-mix(in srgb, var(--seo-builder-border) 40%, white)' }}>
              <tr>
                <th className="px-4 py-3 font-semibold">Package</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white" style={{ borderColor: 'var(--seo-builder-border)' }}>
              {[
                ['@seo-builder/core', 'AI providers, SEO scoring, config'],
                ['@seo-builder/payload-plugin', 'Collections, globals, AI Assistant panel'],
                ['@seo-builder/ui', 'Blog components + theme'],
                ['@seo-builder/next', 'API routes, sitemap, robots, queries'],
                ['create-seo-builder', 'CLI scaffolder for route wrappers'],
              ].map(([name, purpose]) => (
                <tr key={name}>
                  <td className="px-4 py-3 font-mono text-xs sm:text-sm">
                    <a
                      href={NPM_PACKAGES.find((p) => p.name === name)?.href ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: 'var(--seo-builder-primary)' }}
                    >
                      {name}
                    </a>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--seo-builder-muted)' }}>
                    {purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Docs */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Documentation</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_LINKS.map((doc) => (
            <a
              key={doc.path}
              href={githubDocUrl(doc.path)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border px-4 py-3 text-sm font-medium transition hover:opacity-80"
              style={{
                borderColor: 'var(--seo-builder-border)',
                background: 'white',
                color: 'var(--seo-builder-text)',
              }}
            >
              {doc.label} →
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t pt-8 text-center text-sm"
        style={{ borderColor: 'var(--seo-builder-border)', color: 'var(--seo-builder-muted)' }}
      >
        <p>
          MIT License ·{' '}
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer" className="underline">
            GitHub
          </a>
        </p>
        <p className="mt-2">
          Live demo: blog, dashboard, and AI API routes running on this deployment.
        </p>
      </footer>
    </div>
  )
}
