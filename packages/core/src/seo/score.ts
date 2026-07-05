import type { PostForSeo, SeoCheckItem, SeoGrade, SeoScoreResult, SiteSettingsForSeo } from './types'

const TOTAL_CHECKS = 20
const CHECK_WEIGHT = Math.floor(100 / TOTAL_CHECKS)

function extractTextFromContent(content: unknown): string {
  if (!content) return ''
  if (typeof content === 'string') return content

  try {
    const json = typeof content === 'object' ? content : JSON.parse(String(content))
    const texts: string[] = []

    const walk = (node: unknown) => {
      if (!node || typeof node !== 'object') return
      const n = node as Record<string, unknown>
      if (typeof n.text === 'string') texts.push(n.text)
      if (Array.isArray(n.children)) n.children.forEach(walk)
      if (Array.isArray(n.root)) n.root.forEach(walk)
      if (n.root && typeof n.root === 'object') walk(n.root)
    }

    walk(json)
    return texts.join(' ')
  } catch {
    return ''
  }
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function countH1InContent(content: unknown): number {
  const text = extractTextFromContent(content)
  const h1Matches = text.match(/<h1[^>]*>/gi)
  return h1Matches?.length ?? 0
}

function hasInternalLinks(content: unknown, siteUrl?: string | null): boolean {
  const text = extractTextFromContent(content)
  if (text.includes('href="/') || text.includes("href='/")) return true
  if (siteUrl && text.includes(siteUrl)) return true
  return /href=["']https?:\/\/[^"']+["']/.test(text)
}

function isCleanSlug(slug?: string | null): boolean {
  if (!slug) return false
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

function keywordInText(keyword: string | null | undefined, ...texts: (string | null | undefined)[]): boolean {
  if (!keyword) return false
  const lower = keyword.toLowerCase()
  return texts.some((t) => t?.toLowerCase().includes(lower))
}

function buildCanonical(path: string, settings?: SiteSettingsForSeo): string {
  const base = (settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(
    /\/$/,
    '',
  )
  const blogPath = settings?.blogPath || '/blog'
  return `${base}${blogPath}/${path}`.replace(/([^:]\/)\/+/g, '$1')
}

export function scoreToGrade(score: number): SeoGrade {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

export function calculateSeoScore(post: PostForSeo, siteSettings?: SiteSettingsForSeo): SeoScoreResult {
  const checks: SeoCheckItem[] = []
  const suggestions: string[] = []

  const addCheck = (id: string, label: string, passed: boolean, message?: string, suggestion?: string) => {
    checks.push({ id, label, passed, message })
    if (!passed && suggestion) suggestions.push(suggestion)
  }

  const metaTitle = post.metaTitle || post.title
  addCheck(
    'meta-title-exists',
    'Meta title exists',
    Boolean(metaTitle?.trim()),
    undefined,
    'Add a meta title between 30–60 characters.',
  )

  const metaTitleLen = metaTitle?.length ?? 0
  addCheck(
    'meta-title-length',
    'Meta title length is reasonable',
    metaTitleLen >= 30 && metaTitleLen <= 60,
    `Current length: ${metaTitleLen}`,
    'Aim for 30–60 characters in the meta title.',
  )

  addCheck(
    'meta-description-exists',
    'Meta description exists',
    Boolean(post.metaDescription?.trim()),
    undefined,
    'Write a compelling meta description.',
  )

  const metaDescLen = post.metaDescription?.length ?? 0
  addCheck(
    'meta-description-length',
    'Meta description length is reasonable',
    metaDescLen >= 120 && metaDescLen <= 160,
    `Current length: ${metaDescLen}`,
    'Aim for 120–160 characters in the meta description.',
  )

  addCheck(
    'slug-clean',
    'Slug exists and is clean',
    isCleanSlug(post.slug),
    post.slug || 'Missing slug',
    'Use lowercase letters, numbers, and hyphens only.',
  )

  addCheck(
    'focus-keyword',
    'Focus keyword exists',
    Boolean(post.focusKeyword?.trim()),
    undefined,
    'Set a primary focus keyword for this post.',
  )

  addCheck(
    'keyword-in-title',
    'Focus keyword in title or meta title',
    keywordInText(post.focusKeyword, post.title, post.metaTitle),
    undefined,
    'Include the focus keyword in the title or meta title.',
  )

  const canonical =
    post.canonicalUrl || (post.slug ? buildCanonical(post.slug, siteSettings) : '')
  addCheck(
    'canonical-url',
    'Canonical URL exists or can be generated',
    Boolean(canonical),
    undefined,
    'Set a canonical URL or ensure slug is present.',
  )

  const accidentalNoindex = post.status === 'published' && post.noindex === true
  addCheck(
    'noindex-check',
    'No accidental noindex on published post',
    !accidentalNoindex,
    accidentalNoindex ? 'Published post has noindex enabled' : undefined,
    'Remove noindex for published posts you want indexed.',
  )

  const hasFeaturedImage = Boolean(post.featuredImage)
  addCheck(
    'featured-image',
    'Featured image exists',
    hasFeaturedImage,
    undefined,
    'Add a featured image for better social sharing and CTR.',
  )

  const featuredAlt =
    typeof post.featuredImage === 'object' && post.featuredImage !== null && 'alt' in post.featuredImage
      ? (post.featuredImage as { alt?: string | null }).alt
      : null
  addCheck(
    'featured-image-alt',
    'Featured image alt text exists',
    !hasFeaturedImage || Boolean(featuredAlt?.trim()),
    undefined,
    'Add descriptive alt text to the featured image.',
  )

  addCheck(
    'author-exists',
    'Author exists',
    Boolean(post.author),
    undefined,
    'Assign an author to build E-E-A-T signals.',
  )

  addCheck(
    'published-date',
    'Published date exists',
    Boolean(post.publishedAt),
    undefined,
    'Set a published date for published posts.',
  )

  const contentText = extractTextFromContent(post.content)
  addCheck(
    'content-exists',
    'Content exists',
    contentText.trim().length > 50,
    undefined,
    'Add substantial body content.',
  )

  addCheck(
    'content-length',
    'Content length is substantial (300+ words)',
    wordCount(contentText) >= 300,
    `Current word count: ${wordCount(contentText)}`,
    'Aim for at least 300 words of quality content.',
  )

  addCheck(
    'excerpt-exists',
    'Excerpt exists',
    Boolean(post.excerpt?.trim()),
    undefined,
    'Add a compelling excerpt for listings and social previews.',
  )

  const hasOgTitle = Boolean(post.ogTitle?.trim() || post.metaTitle?.trim() || post.title?.trim())
  const hasOgDescription = Boolean(
    post.ogDescription?.trim() || post.metaDescription?.trim() || post.excerpt?.trim(),
  )
  const hasOgImage = Boolean(post.ogImage || post.featuredImage)
  addCheck(
    'og-metadata',
    'Open Graph metadata is complete',
    hasOgTitle && hasOgDescription && hasOgImage,
    undefined,
    'Set OG title, description, and image (or use meta/featured fallbacks).',
  )

  addCheck(
    'faq-exists',
    'FAQ section exists',
    Boolean(post.faqItems && post.faqItems.length > 0),
    undefined,
    'Add FAQ items to target featured snippets.',
  )

  addCheck(
    'internal-links',
    'Internal links detected',
    hasInternalLinks(post.content, siteSettings?.siteUrl),
    undefined,
    'Link to other relevant pages on your site.',
  )

  const h1Count = countH1InContent(post.content)
  addCheck(
    'single-h1',
    'Only one H1 in content (if detectable)',
    h1Count <= 1,
    h1Count > 1 ? `Found ${h1Count} H1 tags` : undefined,
    'Use a single H1 per page.',
  )

  addCheck(
    'article-schema',
    'Article schema can be generated',
    Boolean(post.title && post.slug && (post.publishedAt || post.status === 'published')),
    undefined,
    'Ensure title, slug, and publish date are set.',
  )

  const passed = checks.filter((c) => c.passed)
  const failed = checks.filter((c) => !c.passed)
  const score = Math.min(
    100,
    passed.length * CHECK_WEIGHT +
      (passed.length === checks.length ? 100 - CHECK_WEIGHT * checks.length : 0),
  )

  return {
    score,
    grade: scoreToGrade(score),
    passed,
    failed,
    suggestions,
  }
}
