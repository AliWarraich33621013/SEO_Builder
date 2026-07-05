import { describe, expect, it } from 'vitest'

import { isGeminiAccessDeniedError } from './gemini-errors'

describe('isGeminiAccessDeniedError', () => {
  it('detects GoogleGenerativeAIFetchError-style 403', () => {
    expect(
      isGeminiAccessDeniedError({
        status: 403,
        statusText: 'Forbidden',
        message: '[GoogleGenerativeAI Error]: Error fetching from ...',
      }),
    ).toBe(true)
  })

  it('detects denied access message from Gemini API', () => {
    expect(
      isGeminiAccessDeniedError(
        new Error(
          '[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [403 Forbidden] Your project has been denied access. Please contact support.',
        ),
      ),
    ).toBe(true)
  })

  it('detects PERMISSION_DENIED in error details', () => {
    expect(
      isGeminiAccessDeniedError({
        message: 'Request failed',
        errorDetails: [{ reason: 'PERMISSION_DENIED' }],
      }),
    ).toBe(true)
  })

  it('returns false for unrelated errors', () => {
    expect(isGeminiAccessDeniedError(new Error('Network timeout'))).toBe(false)
    expect(isGeminiAccessDeniedError({ status: 500, message: 'Internal error' })).toBe(false)
  })
})
