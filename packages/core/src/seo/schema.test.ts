import { describe, expect, it } from 'vitest'

import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from './schema'

describe('generateArticleSchema', () => {
  it('returns Article schema with required fields', () => {
    const schema = generateArticleSchema(
      {
        title: 'Test Post',
        slug: 'test-post',
        excerpt: 'An excerpt',
        publishedAt: '2026-01-01',
        featuredImage: { url: 'https://example.com/img.jpg' },
        author: { name: 'Jane Doe' },
      },
      { siteUrl: 'https://example.com', blogPath: '/blog', organizationName: 'Acme' },
    )

    expect(schema['@type']).toBe('Article')
    expect(schema.headline).toBe('Test Post')
    expect(schema.image).toEqual(['https://example.com/img.jpg'])
    expect(schema.author).toEqual({ '@type': 'Person', name: 'Jane Doe' })
    expect(schema.mainEntityOfPage['@id']).toBe('https://example.com/blog/test-post')
  })
})

describe('generateFAQSchema', () => {
  it('returns FAQPage when items exist', () => {
    const schema = generateFAQSchema({
      faqItems: [
        { question: 'What is SEO?', answer: 'Search optimization.' },
        { question: 'Why SEO?', answer: 'Visibility.' },
      ],
    })

    expect(schema?.['@type']).toBe('FAQPage')
    expect(schema?.mainEntity).toHaveLength(2)
    expect(schema?.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: 'What is SEO?',
      acceptedAnswer: { '@type': 'Answer', text: 'Search optimization.' },
    })
  })

  it('returns null when no FAQ items', () => {
    expect(generateFAQSchema({ faqItems: [] })).toBeNull()
  })
})

describe('generateBreadcrumbSchema', () => {
  it('returns BreadcrumbList with blog path', () => {
    const schema = generateBreadcrumbSchema(
      { title: 'My Post', slug: 'my-post' },
      { siteName: 'Acme', siteUrl: 'https://example.com', blogPath: '/blog' },
    )

    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toHaveLength(3)
    expect(schema.itemListElement[0].item).toBe('https://example.com/')
    expect(schema.itemListElement[1].item).toBe('https://example.com/blog')
    expect(schema.itemListElement[2].item).toBe('https://example.com/blog/my-post')
  })
})
