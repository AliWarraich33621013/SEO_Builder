import type { AIProviderName } from './types'

export type ProviderConfig = {
  name: AIProviderName
  apiKey: string | undefined
  model: string
  baseUrl?: string
}

const PROVIDER_ENV_KEYS: Record<AIProviderName, string> = {
  gemini: 'GEMINI_API_KEY',
  openai: 'OPENAI_API_KEY',
  groq: 'GROQ_API_KEY',
  claude: 'ANTHROPIC_API_KEY',
  custom: 'CUSTOM_AI_API_KEY',
}

const DEFAULT_MODELS: Record<AIProviderName, string> = {
  gemini: 'gemini-1.5-flash',
  openai: 'gpt-4o-mini',
  groq: 'llama-3.1-70b-versatile',
  claude: 'claude-3-5-sonnet-latest',
  custom: 'gpt-4o-mini',
}

export function getActiveProviderName(): AIProviderName {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase()
  const valid: AIProviderName[] = ['gemini', 'openai', 'groq', 'claude', 'custom']
  if (valid.includes(provider as AIProviderName)) {
    return provider as AIProviderName
  }
  return 'gemini'
}

export function getProviderConfig(name?: AIProviderName): ProviderConfig {
  const providerName = name ?? getActiveProviderName()
  const envKey = PROVIDER_ENV_KEYS[providerName]

  let model = DEFAULT_MODELS[providerName]
  let baseUrl: string | undefined

  switch (providerName) {
    case 'gemini':
      model = process.env.GEMINI_MODEL || model
      break
    case 'openai':
      model = process.env.OPENAI_MODEL || model
      break
    case 'groq':
      model = process.env.GROQ_MODEL || model
      baseUrl = 'https://api.groq.com/openai/v1'
      break
    case 'claude':
      model = process.env.ANTHROPIC_MODEL || model
      break
    case 'custom':
      model = process.env.CUSTOM_AI_MODEL || model
      baseUrl = process.env.CUSTOM_AI_BASE_URL
      break
  }

  return {
    name: providerName,
    apiKey: process.env[envKey],
    model,
    baseUrl,
  }
}

export function getProviderEnvKey(name: AIProviderName): string {
  return PROVIDER_ENV_KEYS[name]
}

export function getProviderDisplayName(name: AIProviderName): string {
  const names: Record<AIProviderName, string> = {
    gemini: 'Gemini',
    openai: 'OpenAI',
    groq: 'Groq',
    claude: 'Claude',
    custom: 'Custom',
  }
  return names[name]
}
