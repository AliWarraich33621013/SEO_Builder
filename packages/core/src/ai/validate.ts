import { z } from 'zod'

import { AIValidationError } from './errors'
import { seoScoreSchema } from '../validation/seo-score'

export { seoScoreSchema }

export const generateTitleSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
  audience: z.string().optional(),
})

export const generateOutlineSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
  audience: z.string().optional(),
  searchIntent: z.string().optional(),
})

export const generateMetaTitleSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
})

export const generateMetaDescriptionSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
})

export const generateMetaSchema = generateMetaTitleSchema.extend({
  type: z.enum(['description']).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
})

export const generateSlugSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().optional(),
})

export const generateFaqSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  content: z.string().optional(),
})

export const generateAltTextSchema = z.object({
  imageContext: z.string().min(1),
  focusKeyword: z.string().optional(),
})

export const generateSocialSchema = z.object({
  postTitle: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
})

export const generateContentBriefSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
  audience: z.string().optional(),
})

export const detectSearchIntentSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
})

export const generateCtaSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
})

export const improveReadabilitySchema = z.object({
  content: z.string().min(1),
  focusKeyword: z.string().optional(),
})

export const generateExcerptSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  content: z.string().optional(),
})
export async function parseBody<T extends z.ZodTypeAny>(
  request: Request,
  schema: T,
): Promise<z.infer<T>> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    throw new AIValidationError('Invalid JSON body')
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join('; ')
    throw new AIValidationError(message || 'Validation failed')
  }

  return result.data
}
