import type { ComponentProps } from 'react'

import { PostCard } from '@seo-builder/ui'

/** Payload post document shape for blog pages and UI */
export type BlogPostDoc = ComponentProps<typeof PostCard>['post'] & {
  id?: string | number
  content?: unknown
  updatedAt?: string | null
  faqItems?: { question?: string | null; answer?: string | null }[] | null
  metaTitle?: string | null
  metaDescription?: string | null
  focusKeyword?: string | null
}

export type BlogAuthorDoc = {
  name?: string | null
  bio?: string | null
  jobTitle?: string | null
  avatar?: unknown
  slug?: string | null
}

export function asBlogPost(doc: unknown): BlogPostDoc {
  return doc as BlogPostDoc
}

export function asBlogAuthor(doc: unknown): BlogAuthorDoc {
  return doc as BlogAuthorDoc
}
