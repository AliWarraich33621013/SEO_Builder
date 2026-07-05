export type AIErrorCode =
  | 'AI_PROVIDER_MISSING_KEY'
  | 'AI_PROVIDER_ACCESS_DENIED'
  | 'AI_PROVIDER_UNSUPPORTED'
  | 'AI_REQUEST_FAILED'
  | 'AI_RATE_LIMITED'
  | 'AI_VALIDATION_ERROR'

export const AI_PROVIDER_ACCESS_DENIED_MESSAGE =
  'Gemini denied access for this project/API key. Create a new key/project in Google AI Studio, check billing/region access, or switch AI_PROVIDER to another provider.'

export class AIError extends Error {
  code: AIErrorCode
  status: number

  constructor(code: AIErrorCode, message: string, status = 500) {
    super(message)
    this.name = 'AIError'
    this.code = code
    this.status = status
  }
}

export class AIKeyMissingError extends AIError {
  constructor(provider: string, envVar: string) {
    super(
      'AI_PROVIDER_MISSING_KEY',
      `${provider} API key is missing. Add ${envVar} to your .env file.`,
      503,
    )
    this.name = 'AIKeyMissingError'
  }
}

export class AIProviderAccessDeniedError extends AIError {
  constructor(message = AI_PROVIDER_ACCESS_DENIED_MESSAGE) {
    super('AI_PROVIDER_ACCESS_DENIED', message, 403)
    this.name = 'AIProviderAccessDeniedError'
  }
}

export class AIProviderUnsupportedError extends AIError {
  constructor(provider: string) {
    super('AI_PROVIDER_UNSUPPORTED', `Unsupported AI provider: ${provider}`, 500)
    this.name = 'AIProviderUnsupportedError'
  }
}

export class AIProviderError extends AIError {
  constructor(message: string) {
    super('AI_REQUEST_FAILED', message, 500)
    this.name = 'AIProviderError'
  }
}

export class AIRateLimitError extends AIError {
  constructor(message = 'Rate limit exceeded. Please try again later.') {
    super('AI_RATE_LIMITED', message, 429)
    this.name = 'AIRateLimitError'
  }
}

export class AIValidationError extends AIError {
  constructor(message: string) {
    super('AI_VALIDATION_ERROR', message, 400)
    this.name = 'AIValidationError'
  }
}

export function isAIError(error: unknown): error is AIError {
  return error instanceof AIError
}
