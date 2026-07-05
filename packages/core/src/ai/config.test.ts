import { afterEach, describe, expect, it } from 'vitest'

import { getActiveProviderName, getProviderConfig, getProviderEnvKey } from './config'

describe('ai config', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  it('defaults to gemini when AI_PROVIDER is unset', () => {
    delete process.env.AI_PROVIDER
    expect(getActiveProviderName()).toBe('gemini')
  })

  it('respects AI_PROVIDER when valid', () => {
    process.env.AI_PROVIDER = 'openai'
    expect(getActiveProviderName()).toBe('openai')
  })

  it('falls back to gemini for unsupported provider', () => {
    process.env.AI_PROVIDER = 'invalid-provider'
    expect(getActiveProviderName()).toBe('gemini')
  })

  it('returns provider config with default model', () => {
    process.env.AI_PROVIDER = 'gemini'
    delete process.env.GEMINI_MODEL
    const config = getProviderConfig()
    expect(config.name).toBe('gemini')
    expect(config.model).toBe('gemini-1.5-flash')
  })

  it('detects missing API key', () => {
    process.env.AI_PROVIDER = 'gemini'
    delete process.env.GEMINI_API_KEY
    const config = getProviderConfig('gemini')
    expect(config.apiKey).toBeUndefined()
    expect(getProviderEnvKey('gemini')).toBe('GEMINI_API_KEY')
  })
})
