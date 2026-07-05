import { describe, expect, it } from 'vitest'

import {
  AIError,
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderError,
  AIProviderUnsupportedError,
  AIRateLimitError,
  AIValidationError,
  isAIError,
} from './errors'

describe('ai errors', () => {
  it('maps missing key to 503', () => {
    const err = new AIKeyMissingError('Gemini', 'GEMINI_API_KEY')
    expect(err.code).toBe('AI_PROVIDER_MISSING_KEY')
    expect(err.status).toBe(503)
    expect(isAIError(err)).toBe(true)
  })

  it('maps provider access denied to 403', () => {
    const err = new AIProviderAccessDeniedError()
    expect(err.code).toBe('AI_PROVIDER_ACCESS_DENIED')
    expect(err.status).toBe(403)
    expect(err.message).toContain('Gemini denied access')
  })

  it('maps unsupported provider', () => {
    const err = new AIProviderUnsupportedError('unknown')
    expect(err.code).toBe('AI_PROVIDER_UNSUPPORTED')
    expect(err.status).toBe(500)
  })

  it('maps provider failure', () => {
    const err = new AIProviderError('Network error')
    expect(err.code).toBe('AI_REQUEST_FAILED')
    expect(err.status).toBe(500)
  })

  it('maps rate limit to 429', () => {
    const err = new AIRateLimitError()
    expect(err.code).toBe('AI_RATE_LIMITED')
    expect(err.status).toBe(429)
  })

  it('maps validation error to 400', () => {
    const err = new AIValidationError('topic is required')
    expect(err.code).toBe('AI_VALIDATION_ERROR')
    expect(err.status).toBe(400)
  })

  it('isAIError returns false for generic errors', () => {
    expect(isAIError(new Error('nope'))).toBe(false)
    expect(isAIError(new AIError('AI_REQUEST_FAILED', 'fail'))).toBe(true)
  })
})
