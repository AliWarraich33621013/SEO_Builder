import type { Config, SanitizedConfig } from 'payload'

import { apiErrorResponse, apiSuccessResponse } from '@seo-builder/core/api-response'
import { createQueryHelpers } from '../../queries/createQueryHelpers'

type PayloadConfigInput = Config | SanitizedConfig | Promise<SanitizedConfig>

export function createPostsHandler(payloadConfig: PayloadConfigInput) {
  const { getPublishedPosts } = createQueryHelpers(payloadConfig)

  return async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url)
      const page = Number(searchParams.get('page') || '1')
      const limit = Number(searchParams.get('limit') || '12')
      const result = await getPublishedPosts({ page, limit })
      return apiSuccessResponse({
        posts: result.docs,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
      })
    } catch (error) {
      return apiErrorResponse(error)
    }
  }
}
