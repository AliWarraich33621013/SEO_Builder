import { z } from 'zod'

export const seoScoreSchema = z.object({
  post: z.record(z.unknown()).optional(),
  siteSettings: z.record(z.unknown()).optional(),
})
