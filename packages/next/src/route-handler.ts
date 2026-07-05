import type { AIGeneratorResult } from '@seo-builder/core/ai'
import { apiErrorResponse, apiSuccessResponse } from '@seo-builder/core/api-response'
import { checkRateLimit } from '@seo-builder/core'
import { aiLogger } from '@seo-builder/core/ai'

export async function withAiRoute<T>(
  request: Request,
  task: string,
  handler: () => Promise<AIGeneratorResult<T>>,
) {
  try {
    checkRateLimit(request)
    aiLogger.info('route started', { task })
    const result = await handler()
    return apiSuccessResponse(result.data, {
      provider: result.provider,
      model: result.model,
    })
  } catch (error) {
    aiLogger.error('route failed', {
      task,
      error: error instanceof Error ? error.message : 'unknown',
    })
    return apiErrorResponse(error)
  }
}

export async function withAiRouteSimple<T>(
  request: Request,
  task: string,
  handler: () => Promise<T>,
) {
  try {
    checkRateLimit(request)
    aiLogger.info('route started', { task })
    const data = await handler()
    return apiSuccessResponse(data)
  } catch (error) {
    aiLogger.error('route failed', {
      task,
      error: error instanceof Error ? error.message : 'unknown',
    })
    return apiErrorResponse(error)
  }
}
