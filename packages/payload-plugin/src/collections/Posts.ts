import type { CollectionConfig } from 'payload'

import { calculateSeoScore } from '@seo-builder/core/seo'
import { slugify } from '@seo-builder/core'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Manager',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Blog Manager',
    defaultColumns: ['title', 'status', 'author', 'publishedAt', 'seoScore'],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return {
        status: { equals: 'published' },
      }
    },
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          return { ...data, slug: slugify(data.title) }
        }
        return data
      },
    ],
    beforeChange: [
      async ({ data, req }) => {
        let siteSettings
        try {
          siteSettings = await req.payload.findGlobal({ slug: 'site-settings' })
        } catch {
          siteSettings = undefined
        }

        const scoreResult = calculateSeoScore(
          {
            title: data?.title,
            slug: data?.slug,
            excerpt: data?.excerpt,
            content: data?.content,
            status: data?.status,
            publishedAt: data?.publishedAt,
            focusKeyword: data?.focusKeyword,
            metaTitle: data?.metaTitle,
            metaDescription: data?.metaDescription,
            canonicalUrl: data?.canonicalUrl,
            noindex: data?.noindex,
            ogTitle: data?.ogTitle,
            ogDescription: data?.ogDescription,
            ogImage: data?.ogImage,
            featuredImage: data?.featuredImage,
            author: data?.author,
            faqItems: data?.faqItems,
          },
          {
            siteUrl: siteSettings?.siteUrl,
            blogPath: siteSettings?.blogPath,
          },
        )

        return {
          ...data,
          seoScore: scoreResult.score,
          seoChecklist: scoreResult,
        }
      },
    ],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: { position: 'sidebar' },
            },
            {
              name: 'excerpt',
              type: 'textarea',
            },
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'authors',
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
            },
            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'tags',
              hasMany: true,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'focusKeyword',
              type: 'text',
              label: 'Focus Keyword',
            },
            {
              name: 'secondaryKeywords',
              type: 'text',
              label: 'Secondary Keywords',
              admin: { description: 'Comma-separated keywords' },
            },
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
            },
            {
              name: 'ogTitle',
              type: 'text',
              label: 'OG Title',
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              label: 'OG Description',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image',
            },
            {
              name: 'noindex',
              type: 'checkbox',
              label: 'Noindex',
              defaultValue: false,
            },
            {
              name: 'nofollow',
              type: 'checkbox',
              label: 'Nofollow',
              defaultValue: false,
            },
            {
              name: 'seoScore',
              type: 'number',
              label: 'SEO Score',
              admin: { readOnly: true, position: 'sidebar' },
            },
            {
              name: 'seoChecklist',
              type: 'json',
              label: 'SEO Checklist Result',
              admin: { readOnly: true },
            },
          ],
        },
        {
          label: 'AI Assistant',
          fields: [
            {
              name: 'aiAssistantPanel',
              type: 'ui',
              admin: {
                components: {
                  Field: '@seo-builder/payload-plugin/components/admin/AiAssistantPanel#AiAssistantPanel',
                },
              },
            },
            {
              name: 'aiSuggestions',
              type: 'json',
              label: 'AI Suggestions',
              admin: {
                description:
                  'Stored AI suggestions (use "Save suggestions" in the panel above).',
              },
            },
          ],
        },
        {
          label: 'Publishing',
          fields: [
            {
              name: 'status',
              type: 'select',
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ],
              admin: { position: 'sidebar' },
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: {
                position: 'sidebar',
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
            {
              name: 'scheduledAt',
              type: 'date',
              admin: {
                position: 'sidebar',
                date: { pickerAppearance: 'dayAndTime' },
              },
            },
          ],
        },
        {
          label: 'Schema/Advanced',
          fields: [
            {
              name: 'faqItems',
              type: 'array',
              label: 'FAQ Items',
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
