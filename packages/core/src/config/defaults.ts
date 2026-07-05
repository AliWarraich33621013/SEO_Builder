import type { SeoBuilderConfig } from './types'

export const defaultSeoBuilderConfig: SeoBuilderConfig = {
  site: {
    name: 'SEO Builder',
    url: 'http://localhost:3000',
    blogPath: '/blog',
    adminPath: '/seo-admin',
    defaultLocale: 'en',
  },
  branding: {
    logoText: 'SEO Builder',
    logoUrl: '',
    primaryColor: '#2563eb',
    secondaryColor: '#111827',
    backgroundColor: '#ffffff',
    textColor: '#111827',
    mutedTextColor: '#6b7280',
    borderColor: '#e5e7eb',
    borderRadius: '14px',
    fontFamily: 'Inter, sans-serif',
  },
  blog: {
    template: 'default',
    layout: 'grid',
    postsPerPage: 9,
    showAuthor: true,
    showReadingTime: true,
    showTableOfContents: true,
    showRelatedPosts: true,
    showFaq: true,
    showBreadcrumbs: true,
  },
  cta: {
    enabled: true,
    title: 'Ready to grow your organic traffic?',
    description: 'Use SEO Builder to publish optimized blog content faster.',
    buttonText: 'Get Started',
    buttonUrl: '/contact',
  },
  ai: {
    defaultProvider: 'groq',
  },
  seo: {
    defaultMetaTitle: 'SEO Builder Blog',
    defaultMetaDescription: 'AI-powered SEO blog system.',
    defaultOgImage: '',
    enableIndexing: true,
  },
}
