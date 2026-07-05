import { describe, expect, it } from 'vitest'

import { calculateSeoScore, scoreToGrade } from './score'

describe('scoreToGrade', () => {
  it('assigns letter grades by threshold', () => {
    expect(scoreToGrade(95)).toBe('A')
    expect(scoreToGrade(85)).toBe('B')
    expect(scoreToGrade(75)).toBe('C')
    expect(scoreToGrade(65)).toBe('D')
    expect(scoreToGrade(50)).toBe('F')
  })
})

describe('calculateSeoScore', () => {
  const basePost = {
    title: 'Best SEO Tips for Small Business Owners',
    slug: 'best-seo-tips-small-business',
    excerpt: 'Learn practical SEO strategies that work for small businesses.',
    focusKeyword: 'seo tips',
    metaTitle: 'Best SEO Tips for Small Business Owners in 2026',
    metaDescription:
      'Discover proven SEO tips for small business owners. Improve rankings, traffic, and conversions with this practical guide to search optimization today.',
    status: 'published',
    publishedAt: '2026-01-01T00:00:00.000Z',
    author: '1',
    featuredImage: { alt: 'SEO dashboard screenshot', url: '/media/seo.jpg' },
    ogTitle: 'SEO Tips Guide',
    ogDescription: 'Practical SEO for small business',
    ogImage: { url: '/media/og.jpg' },
    faqItems: [{ question: 'What is SEO?', answer: 'Search engine optimization.' }],
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [{ text: Array(350).fill('word').join(' ') }],
          },
        ],
      },
    },
  }

  it('includes grade in result', () => {
    const result = calculateSeoScore(basePost)
    expect(result.grade).toBeDefined()
    expect(['A', 'B', 'C', 'D', 'F']).toContain(result.grade)
  })

  it('checks excerpt exists', () => {
    const withExcerpt = calculateSeoScore(basePost)
    const withoutExcerpt = calculateSeoScore({ ...basePost, excerpt: '' })
    expect(withExcerpt.passed.some((c) => c.id === 'excerpt-exists')).toBe(true)
    expect(withoutExcerpt.failed.some((c) => c.id === 'excerpt-exists')).toBe(true)
  })

  it('checks OG metadata completeness', () => {
    const complete = calculateSeoScore(basePost)
    const incomplete = calculateSeoScore({
      ...basePost,
      ogTitle: '',
      ogDescription: '',
      ogImage: null,
      metaTitle: '',
      metaDescription: '',
      excerpt: '',
      featuredImage: null,
    })
    expect(complete.passed.some((c) => c.id === 'og-metadata')).toBe(true)
    expect(incomplete.failed.some((c) => c.id === 'og-metadata')).toBe(true)
  })

  it('checks content word count threshold', () => {
    const long = calculateSeoScore(basePost)
    const short = calculateSeoScore({
      ...basePost,
      content: { root: { children: [{ type: 'paragraph', children: [{ text: 'too short' }] }] } },
    })
    expect(long.passed.some((c) => c.id === 'content-length')).toBe(true)
    expect(short.failed.some((c) => c.id === 'content-length')).toBe(true)
  })
})
