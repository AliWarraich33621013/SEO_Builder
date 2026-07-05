export type SeoCheckItem = {
  id: string
  label: string
  passed: boolean
  message?: string
}

export type SeoGrade = 'A' | 'B' | 'C' | 'D' | 'F'

export type SeoScoreResult = {
  score: number
  grade: SeoGrade
  passed: SeoCheckItem[]
  failed: SeoCheckItem[]
  suggestions: string[]
}

export type PostForSeo = {
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  content?: unknown
  status?: string | null
  publishedAt?: string | null
  focusKeyword?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  canonicalUrl?: string | null
  noindex?: boolean | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogImage?: unknown
  featuredImage?: unknown
  author?: unknown
  faqItems?: { question?: string | null; answer?: string | null }[] | null
}

export type SiteSettingsForSeo = {
  siteUrl?: string | null
  blogPath?: string | null
}
