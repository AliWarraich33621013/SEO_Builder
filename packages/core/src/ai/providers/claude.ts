import Anthropic from '@anthropic-ai/sdk'

import { getProviderConfig, getProviderDisplayName, getProviderEnvKey } from '../config'
import { AIKeyMissingError, AIProviderError } from '../errors'
import { aiLogger } from '../logger'
import type { AIProvider, GenerateTextOptions, GenerateTextResult } from '../types'
import { DEFAULT_SYSTEM_PROMPT } from '../prompts'

export function createClaudeProvider(): AIProvider {
  const config = getProviderConfig('claude')
  const envKey = getProviderEnvKey('claude')

  if (!config.apiKey) {
    throw new AIKeyMissingError(getProviderDisplayName('claude'), envKey)
  }

  const client = new Anthropic({ apiKey: config.apiKey })

  return {
    name: 'claude',
    model: config.model,
    async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
      const start = Date.now()
      try {
        const response = await client.messages.create({
          model: config.model,
          max_tokens: options.maxTokens ?? 4096,
          temperature: options.temperature ?? 0.7,
          system: options.systemPrompt || DEFAULT_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: options.prompt }],
        })

        const textBlock = response.content.find((block) => block.type === 'text')
        const text = textBlock && 'text' in textBlock ? textBlock.text : ''

        if (!text) throw new AIProviderError('Empty response from Claude')

        aiLogger.info('request completed', {
          task: options.task,
          provider: 'claude',
          model: config.model,
          durationMs: Date.now() - start,
        })

        return { text, provider: 'claude', model: config.model }
      } catch (error) {
        if (error instanceof AIKeyMissingError) throw error
        aiLogger.error('request failed', {
          task: options.task,
          provider: 'claude',
          model: config.model,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : 'unknown',
        })
        throw new AIProviderError(error instanceof Error ? error.message : 'Claude request failed')
      }
    },
  }
}
