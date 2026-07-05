import OpenAI from 'openai'

import { getProviderConfig, getProviderDisplayName, getProviderEnvKey } from '../config'
import { AIKeyMissingError, AIProviderError } from '../errors'
import { aiLogger } from '../logger'
import type { AIProvider, GenerateTextOptions, GenerateTextResult } from '../types'
import { DEFAULT_SYSTEM_PROMPT } from '../prompts'

function createOpenAICompatibleProvider(
  providerName: 'openai' | 'groq' | 'custom',
): AIProvider {
  const config = getProviderConfig(providerName)
  const envKey = getProviderEnvKey(providerName)
  const displayName = getProviderDisplayName(providerName)

  if (!config.apiKey) {
    throw new AIKeyMissingError(displayName, envKey)
  }

  if (providerName === 'custom' && !config.baseUrl) {
    throw new AIProviderError('CUSTOM_AI_BASE_URL is required for custom provider')
  }

  const client = new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl,
  })

  return {
    name: providerName,
    model: config.model,
    async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
      const start = Date.now()
      try {
        const response = await client.chat.completions.create({
          model: config.model,
          messages: [
            { role: 'system', content: options.systemPrompt || DEFAULT_SYSTEM_PROMPT },
            { role: 'user', content: options.prompt },
          ],
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 4096,
          ...(options.responseFormat === 'json'
            ? { response_format: { type: 'json_object' as const } }
            : {}),
        })

        const text = response.choices[0]?.message?.content
        if (!text) throw new AIProviderError(`Empty response from ${displayName}`)

        aiLogger.info('request completed', {
          task: options.task,
          provider: providerName,
          model: config.model,
          durationMs: Date.now() - start,
        })

        return { text, provider: providerName, model: config.model }
      } catch (error) {
        if (error instanceof AIKeyMissingError) throw error
        aiLogger.error('request failed', {
          task: options.task,
          provider: providerName,
          model: config.model,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : 'unknown',
        })
        throw new AIProviderError(
          error instanceof Error ? error.message : `${displayName} request failed`,
        )
      }
    },
  }
}

export function createOpenAIProvider(): AIProvider {
  return createOpenAICompatibleProvider('openai')
}

export function createGroqProvider(): AIProvider {
  return createOpenAICompatibleProvider('groq')
}

export function createCustomProvider(): AIProvider {
  return createOpenAICompatibleProvider('custom')
}
