import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'SEO Settings',
  admin: {
    group: 'SEO Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'SEO Builder',
    },
    {
      name: 'siteUrl',
      type: 'text',
      required: true,
      defaultValue: 'http://localhost:3000',
      label: 'Site URL',
    },
    {
      name: 'blogPath',
      type: 'text',
      defaultValue: '/blog',
      label: 'Blog Path',
    },
    {
      name: 'defaultMetaTitle',
      type: 'text',
      label: 'Default Meta Title',
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      label: 'Default Meta Description',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Default OG Image',
    },
    {
      name: 'organizationName',
      type: 'text',
      label: 'Organization Name',
    },
    {
      name: 'organizationLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Organization Logo',
    },
    {
      name: 'robotsIndexingEnabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Allow Search Engine Indexing',
    },
    {
      name: 'defaultAuthor',
      type: 'relationship',
      relationTo: 'authors',
      label: 'Default Author',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Facebook', value: 'facebook' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
