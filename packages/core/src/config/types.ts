export type SeoBuilderSiteConfig = {
  name: string
  url: string
  blogPath: string
  adminPath: string
  defaultLocale: string
}

export type SeoBuilderBrandingConfig = {
  logoText: string
  logoUrl: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  mutedTextColor: string
  borderColor: string
  borderRadius: string
  fontFamily: string
}

export type SeoBuilderBlogConfig = {
  template: string
  layout: 'grid' | 'list'
  postsPerPage: number
  showAuthor: boolean
  showReadingTime: boolean
  showTableOfContents: boolean
  showRelatedPosts: boolean
  showFaq: boolean
  showBreadcrumbs: boolean
}

export type SeoBuilderCtaConfig = {
  enabled: boolean
  title: string
  description: string
  buttonText: string
  buttonUrl: string
}

export type SeoBuilderAiConfig = {
  defaultProvider: 'gemini' | 'openai' | 'groq' | 'claude' | 'custom'
}

export type SeoBuilderSeoDefaultsConfig = {
  defaultMetaTitle: string
  defaultMetaDescription: string
  defaultOgImage: string
  enableIndexing: boolean
}

export type SeoBuilderConfig = {
  site: SeoBuilderSiteConfig
  branding: SeoBuilderBrandingConfig
  blog: SeoBuilderBlogConfig
  cta: SeoBuilderCtaConfig
  ai: SeoBuilderAiConfig
  seo: SeoBuilderSeoDefaultsConfig
}

export type SeoBuilderPluginOptions = {
  blogPath?: string
  adminPath?: string
  brandName?: string
  collections?: {
    posts?: boolean
    categories?: boolean
    tags?: boolean
    authors?: boolean
    media?: boolean
  }
  aiAssistant?: boolean
}
