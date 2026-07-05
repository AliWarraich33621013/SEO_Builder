import config from '@payload-config'
import { createQueryHelpers } from '@seo-builder/next'

import { asBlogAuthor, asBlogPost } from './types'

const helpers = createQueryHelpers(config)

export const POSTS_PER_PAGE = helpers.POSTS_PER_PAGE
export const getPayloadClient = helpers.getPayloadClient
export const getSiteSettings = helpers.getSiteSettings

export async function getPublishedPosts(
  ...args: Parameters<typeof helpers.getPublishedPosts>
) {
  const result = await helpers.getPublishedPosts(...args)
  return { ...result, docs: result.docs.map(asBlogPost) }
}

export async function getPostBySlug(...args: Parameters<typeof helpers.getPostBySlug>) {
  const post = await helpers.getPostBySlug(...args)
  return post ? asBlogPost(post) : null
}

export async function getRelatedPosts(...args: Parameters<typeof helpers.getRelatedPosts>) {
  const docs = await helpers.getRelatedPosts(...args)
  return docs.map(asBlogPost)
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
