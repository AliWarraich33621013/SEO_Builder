import { resolveSeoBuilderConfig } from '@seo-builder/core/config'

const seoBuilderConfig = resolveSeoBuilderConfig({
  site: {
    name: 'Flat Bed Car Towing',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    blogPath: '/blog',
    adminPath: '/seo-admin',
    defaultLocale: 'en',
  },
  branding: {
    logoText: 'Flat Bed Car Towing',
    logoUrl: '',
    primaryColor: '#dc2626',
    secondaryColor: '#1f2937',
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
    title: 'Need a tow right now?',
    description: 'Flat Bed Car Towing provides fast, reliable roadside assistance in your area.',
    buttonText: 'Call Now',
    buttonUrl: 'tel:+1234567890',
  },
  ai: {
    defaultProvider: 'gemini',
  },
  seo: {
    defaultMetaTitle: 'Flat Bed Car Towing Blog',
    defaultMetaDescription: 'Roadside assistance tips, towing guides, and local service updates.',
    defaultOgImage: '',
    enableIndexing: true,
  },
})

export default seoBuilderConfig
