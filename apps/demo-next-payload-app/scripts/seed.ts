import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

async function seed() {
  const payload = await getPayload({ config })

  const author = await payload.create({
    collection: 'authors',
    data: {
      name: 'Alex Morgan',
      slug: 'alex-morgan',
      bio: 'SEO strategist and content marketer helping brands grow organic traffic.',
      jobTitle: 'Head of Content',
    },
  })

  const categories = await Promise.all([
    payload.create({
      collection: 'categories',
      data: {
        name: 'SEO',
        slug: 'seo',
        description: 'Search engine optimization tips and strategies.',
        metaTitle: 'SEO Articles',
        metaDescription: 'Learn SEO best practices and strategies.',
      },
    }),
    payload.create({
      collection: 'categories',
      data: {
        name: 'Content Marketing',
        slug: 'content-marketing',
        description: 'Content marketing insights and guides.',
      },
    }),
  ])

  const tags = await Promise.all([
    payload.create({ collection: 'tags', data: { name: 'Keywords', slug: 'keywords' } }),
    payload.create({ collection: 'tags', data: { name: 'Technical SEO', slug: 'technical-seo' } }),
  ])

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

  await payload.create({
    collection: 'posts',
    data: {
      title: 'Complete Guide to Technical SEO for Modern Blogs',
      slug: 'complete-guide-technical-seo',
      excerpt:
        'Learn the essential technical SEO practices every blog needs for better rankings and visibility.',
      content: postContent,
      author: author.id,
      categories: [categories[0].id],
      tags: [tags[0].id, tags[1].id],
      status: 'published',
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
  })

  await payload.create({
    collection: 'posts',
    data: {
      title: 'How to Write SEO-Friendly Blog Posts',
      slug: 'write-seo-friendly-blog-posts',
      excerpt: 'Practical tips for writing blog content that ranks and converts.',
      content: postContent,
      author: author.id,
      categories: [categories[1].id],
      tags: [tags[0].id],
      status: 'published',
      publishedAt: new Date().toISOString(),
      focusKeyword: 'SEO blog posts',
      metaTitle: 'How to Write SEO-Friendly Blog Posts | SEO Builder',
      metaDescription:
        'Discover how to write SEO-friendly blog posts with focus keywords, meta tags, and structured content.',
    },
  })

  console.log('Seed data created successfully.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
