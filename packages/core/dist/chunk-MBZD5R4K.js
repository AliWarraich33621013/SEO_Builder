// src/ai/errors.ts
var AI_PROVIDER_ACCESS_DENIED_MESSAGE = "Gemini denied access for this project/API key. Create a new key/project in Google AI Studio, check billing/region access, or switch AI_PROVIDER to another provider.";
var AIError = class extends Error {
  code;
  status;
  constructor(code, message, status = 500) {
    super(message);
    this.name = "AIError";
    this.code = code;
    this.status = status;
  }
};
var AIKeyMissingError = class extends AIError {
  constructor(provider, envVar) {
    super(
      "AI_PROVIDER_MISSING_KEY",
      `${provider} API key is missing. Add ${envVar} to your .env file.`,
      503
    );
    this.name = "AIKeyMissingError";
  }
};
var AIProviderAccessDeniedError = class extends AIError {
  constructor(message = AI_PROVIDER_ACCESS_DENIED_MESSAGE) {
    super("AI_PROVIDER_ACCESS_DENIED", message, 403);
    this.name = "AIProviderAccessDeniedError";
  }
};
var AIProviderUnsupportedError = class extends AIError {
  constructor(provider) {
    super("AI_PROVIDER_UNSUPPORTED", `Unsupported AI provider: ${provider}`, 500);
    this.name = "AIProviderUnsupportedError";
  }
};
var AIProviderError = class extends AIError {
  constructor(message) {
    super("AI_REQUEST_FAILED", message, 500);
    this.name = "AIProviderError";
  }
};
var AIRateLimitError = class extends AIError {
  constructor(message = "Rate limit exceeded. Please try again later.") {
    super("AI_RATE_LIMITED", message, 429);
    this.name = "AIRateLimitError";
  }
};
var AIValidationError = class extends AIError {
  constructor(message) {
    super("AI_VALIDATION_ERROR", message, 400);
    this.name = "AIValidationError";
  }
};
function isAIError(error) {
  return error instanceof AIError;
}

export {
  AIError,
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderUnsupportedError,
  AIProviderError,
  AIRateLimitError,
  AIValidationError,
  isAIError
};
//# sourceMappingURL=chunk-MBZD5R4K.js.map