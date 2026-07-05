import Link from 'next/link'
import React from 'react'

import { SeoBuilderRoot } from '@/components/SeoBuilderRoot'
import seoBuilderConfig from '../../../seo-builder.config'
import './globals.css'

export const metadata = {
  title: seoBuilderConfig.site.name,
  description: seoBuilderConfig.seo.defaultMetaDescription,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen antialiased"
        style={{
          background: 'var(--seo-builder-bg, #f8fafc)',
          color: 'var(--seo-builder-text, #111827)',
          fontFamily: 'var(--seo-builder-font, Inter, sans-serif)',
        }}
      >
        <SeoBuilderRoot>
          <header
            className="border-b bg-white"
            style={{ borderColor: 'var(--seo-builder-border, #e5e7eb)' }}
          >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <Link href="/" className="text-lg font-bold tracking-tight">
                {seoBuilderConfig.branding.logoText}
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium" style={{ color: 'var(--seo-builder-muted)' }}>
                <Link href={seoBuilderConfig.site.blogPath} className="hover:opacity-80">
                  Blog
                </Link>
                <Link href={seoBuilderConfig.site.adminPath} className="hover:opacity-80">
                  Dashboard
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
          <footer className="border-t bg-white" style={{ borderColor: 'var(--seo-builder-border, #e5e7eb)' }}>
            <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm" style={{ color: 'var(--seo-builder-muted)' }}>
              © {new Date().getFullYear()} {seoBuilderConfig.site.name}
            </div>
          </footer>
        </SeoBuilderRoot>
      </body>
    </html>
  )
}
