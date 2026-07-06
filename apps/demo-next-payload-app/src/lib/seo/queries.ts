import config from '@payload-config'
import { createQueryHelpers } from '@seo-builder/next'

import seoBuilderConfig from '../../../seo-builder.config'
import { asBlogAuthor, asBlogPost } from './types'

const helpers = createQueryHelpers(config)

export class DatabaseNotInitializedError extends Error {
  constructor(message = 'Database not initialized. Run db:setup against your Postgres database.') {
    super(message)
    this.name = 'DatabaseNotInitializedError'
  }
}

function isMissingRelationError(err: unknown): boolean {
  if (!(err instanceof Error)) return false
  const message = err.message.toLowerCase()
  return (
    message.includes('relation') && message.includes('does not exist') ||
    message.includes('42p01') ||
    message.includes('undefined_table')
  )
}

function getDefaultSiteSettings() {
  return {
    siteName: seoBuilderConfig.site.name,
    siteUrl: seoBuilderConfig.site.url || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    blogPath: seoBuilderConfig.site.blogPath || '/blog',
    defaultMetaTitle: seoBuilderConfig.seo.defaultMetaTitle,
    defaultMetaDescription: seoBuilderConfig.seo.defaultMetaDescription,
    defaultOgImage: seoBuilderConfig.seo.defaultOgImage || null,
    organizationName: seoBuilderConfig.site.name,
    robotsIndexingEnabled: seoBuilderConfig.seo.enableIndexing ?? true,
  }
}

function hasSiteSettingsData(settings: Record<string, unknown>): boolean {
  return Boolean(settings.siteName || settings.siteUrl || settings.defaultMetaTitle)
}

export const POSTS_PER_PAGE = helpers.POSTS_PER_PAGE
export const getPayloadClient = helpers.getPayloadClient

export async function getSiteSettings() {
  try {
    const settings = await helpers.getSiteSettings()
    if (!hasSiteSettingsData(settings as Record<string, unknown>)) {
      return getDefaultSiteSettings()
    }
    return settings
  } catch (err) {
    if (isMissingRelationError(err)) {
      throw new DatabaseNotInitializedError()
    }
    return getDefaultSiteSettings()
  }
}

export async function getPublishedPosts(
  ...args: Parameters<typeof helpers.getPublishedPosts>
) {
  try {
    const result = await helpers.getPublishedPosts(...args)
    return { ...result, docs: result.docs.map(asBlogPost) }
  } catch (err) {
    if (isMissingRelationError(err)) {
      throw new DatabaseNotInitializedError()
    }
    return {
      docs: [],
      page: args[0]?.page ?? 1,
      totalPages: 0,
      totalDocs: 0,
      hasNextPage: false,
      hasPrevPage: false,
      limit: args[0]?.limit ?? POSTS_PER_PAGE,
      pagingCounter: 0,
      prevPage: null,
      nextPage: null,
    }
  }
}

export async function getPostBySlug(...args: Parameters<typeof helpers.getPostBySlug>) {
  const post = await helpers.getPostBySlug(...args)
  return post ? asBlogPost(post) : null
}

export async function getRelatedPosts(...args: Parameters<typeof helpers.getRelatedPosts>) {
  try {
    const docs = await helpers.getRelatedPosts(...args)
    return docs.map(asBlogPost)
  } catch {
    return []
  }
}

export async function getCategoryBySlug(...args: Parameters<typeof helpers.getCategoryBySlug>) {
  return helpers.getCategoryBySlug(...args)
}

export async function getTagBySlug(...args: Parameters<typeof helpers.getTagBySlug>) {
  return helpers.getTagBySlug(...args)
}

export async function getAuthorBySlug(...args: Parameters<typeof helpers.getAuthorBySlug>) {
  const author = await helpers.getAuthorBySlug(...args)
  return author ? asBlogAuthor(author) : null
}

export const getAllCategories = helpers.getAllCategories
export const getAllTags = helpers.getAllTags
export const getAllAuthors = helpers.getAllAuthors
export const getAllPublishedPostSlugs = helpers.getAllPublishedPostSlugs
