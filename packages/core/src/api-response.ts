import { NextResponse } from 'next/server'

import { isAIError } from './ai/errors'

export type ApiErrorBody = {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ApiSuccessBody<T> = {
  success: true
  provider?: string
  model?: string
  data: T
}

export function apiErrorResponse(error: unknown) {
  if (isAIError(error)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: error.code, message: error.message },
      } satisfies ApiErrorBody,
      { status: error.status },
    )
  }

  const message = error instanceof Error ? error.message : 'Request failed'
  return NextResponse.json(
    {
      success: false,
      error: { code: 'AI_REQUEST_FAILED', message },
    } satisfies ApiErrorBody,
    { status: 500 },
  )
}

export function apiSuccessResponse<T>(
  data: T,
  meta?: { provider?: string; model?: string },
) {
  return NextResponse.json({
    success: true,
    provider: meta?.provider,
    model: meta?.model,
    data,
  } satisfies ApiSuccessBody<T>)
}

// Backward-compatible aliases
export const aiErrorResponse = apiErrorResponse
export const aiSuccessResponse = apiSuccessResponse
