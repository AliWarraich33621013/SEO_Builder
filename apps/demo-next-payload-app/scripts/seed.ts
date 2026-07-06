import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

async function findBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'authors' | 'categories' | 'tags' | 'posts',
  slug: string,
) {
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

async function seed() {
  const payload = await getPayload({ config })

  let author = await findBySlug(payload, 'authors', 'alex-morgan')
  if (author) {
    console.log('Author already exists: alex-morgan')
  } else {
    author = await payload.create({
      collection: 'authors',
      data: {
        name: 'Alex Morgan',
        slug: 'alex-morgan',
        bio: 'SEO strategist and content marketer helping brands grow organic traffic.',
        jobTitle: 'Head of Content',
      },
    })
    console.log('Created author: alex-morgan')
  }

  const categoryDefs = [
    {
      slug: 'seo',
      data: {
        name: 'SEO',
        slug: 'seo',
        description: 'Search engine optimization tips and strategies.',
        metaTitle: 'SEO Articles',
        metaDescription: 'Learn SEO best practices and strategies.',
      },
    },
    {
      slug: 'content-marketing',
      data: {
        name: 'Content Marketing',
        slug: 'content-marketing',
        description: 'Content marketing insights and guides.',
      },
    },
  ]

  const categories = await Promise.all(
    categoryDefs.map(async ({ slug, data }) => {
      const existing = await findBySlug(payload, 'categories', slug)
      if (existing) {
        console.log(`Category already exists: ${slug}`)
        return existing
      }
      const created = await payload.create({ collection: 'categories', data })
      console.log(`Created category: ${slug}`)
      return created
    }),
  )

  const tagDefs = [
    { slug: 'keywords', data: { name: 'Keywords', slug: 'keywords' } },
    { slug: 'technical-seo', data: { name: 'Technical SEO', slug: 'technical-seo' } },
  ]

  const tags = await Promise.all(
    tagDefs.map(async ({ slug, data }) => {
      const existing = await findBySlug(payload, 'tags', slug)
      if (existing) {
        console.log(`Tag already exists: ${slug}`)
        return existing
      }
      const created = await payload.create({ collection: 'tags', data })
      console.log(`Created tag: ${slug}`)
      return created
    }),
  )

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'SEO Builder',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      blogPath: '/blog',
      defaultMetaTitle: 'SEO Builder Blog',
      defaultMetaDescription: 'AI-powered SEO insights and content marketing strategies.',
      organizationName: 'SEO Builder',
      robotsIndexingEnabled: true,
      defaultAuthor: author.id,
    },
  })
  console.log('Updated site-settings global')

  const postContent = {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        {
          type: 'heading',
          tag: 'h2',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: 'Why technical SEO matters in 2026',
              format: 0,
              version: 1,
            },
          ],
        },
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'text',
              text: 'Technical SEO forms the foundation of every successful content strategy. From crawlability to structured data, getting the basics right helps search engines understand and rank your content.',
              format: 0,
              version: 1,
            },
          ],
        },
      ],
      direction: 'ltr',
    },
  }

  const postDefs = [
    {
      slug: 'complete-guide-technical-seo',
      data: {
        title: 'Complete Guide to Technical SEO for Modern Blogs',
        slug: 'complete-guide-technical-seo',
        excerpt:
          'Learn the essential technical SEO practices every blog needs for better rankings and visibility.',
        content: postContent,
        author: author.id,
        categories: [categories[0].id],
        tags: [tags[0].id, tags[1].id],
        status: 'published' as const,
        publishedAt: new Date().toISOString(),
        focusKeyword: 'technical SEO',
        secondaryKeywords: 'SEO checklist, blog SEO',
        metaTitle: 'Complete Guide to Technical SEO for Modern Blogs',
        metaDescription:
          'Master technical SEO for your blog with this complete guide covering metadata, schema, sitemaps, and more.',
        faqItems: [
          {
            question: 'What is technical SEO?',
            answer:
              'Technical SEO refers to optimizing your website infrastructure so search engines can crawl, index, and rank your content effectively.',
          },
          {
            question: 'Why is a sitemap important?',
            answer:
              'A sitemap helps search engines discover all your important pages, especially new blog posts and category pages.',
          },
        ],
      },
    },
    {
      slug: 'write-seo-friendly-blog-posts',
      data: {
        title: 'How to Write SEO-Friendly Blog Posts',
        slug: 'write-seo-friendly-blog-posts',
        excerpt: 'Practical tips for writing blog content that ranks and converts.',
        content: postContent,
        author: author.id,
        categories: [categories[1].id],
        tags: [tags[0].id],
        status: 'published' as const,
        publishedAt: new Date().toISOString(),
        focusKeyword: 'SEO blog posts',
        metaTitle: 'How to Write SEO-Friendly Blog Posts | SEO Builder',
        metaDescription:
          'Discover how to write SEO-friendly blog posts with focus keywords, meta tags, and structured content.',
      },
    },
  ]

  for (const { slug, data } of postDefs) {
    const existing = await findBySlug(payload, 'posts', slug)
    if (existing) {
      console.log(`Post already exists: ${slug}`)
      continue
    }
    await payload.create({ collection: 'posts', data })
    console.log(`Created post: ${slug}`)
  }

  console.log('Seed completed successfully.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
