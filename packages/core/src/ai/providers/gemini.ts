import { GoogleGenerativeAI } from '@google/generative-ai'

import { getProviderConfig, getProviderDisplayName, getProviderEnvKey } from '../config'
import {
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderError,
} from '../errors'
import { aiLogger } from '../logger'
import type { AIProvider, GenerateTextOptions, GenerateTextResult } from '../types'
import { DEFAULT_SYSTEM_PROMPT } from '../prompts'
import { isGeminiAccessDeniedError } from './gemini-errors'

export function createGeminiProvider(): AIProvider {
  const config = getProviderConfig('gemini')
  const envKey = getProviderEnvKey('gemini')

  if (!config.apiKey) {
    throw new AIKeyMissingError(getProviderDisplayName('gemini'), envKey)
  }

  const client = new GoogleGenerativeAI(config.apiKey)

  return {
    name: 'gemini',
    model: config.model,
    async generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
      const start = Date.now()
      try {
        const model = client.getGenerativeModel({
          model: config.model,
          systemInstruction: options.systemPrompt || DEFAULT_SYSTEM_PROMPT,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 4096,
            responseMimeType:
              options.responseFormat === 'json' ? 'application/json' : 'text/plain',
          },
        })

        const result = await model.generateContent(options.prompt)
        const text = result.response.text()

        if (!text) throw new AIProviderError('Empty response from Gemini')

        aiLogger.info('request completed', {
          task: options.task,
          provider: 'gemini',
          model: config.model,
          durationMs: Date.now() - start,
        })

        return { text, provider: 'gemini', model: config.model }
      } catch (error) {
        if (error instanceof AIKeyMissingError || error instanceof AIProviderAccessDeniedError) {
          throw error
        }
        if (isGeminiAccessDeniedError(error)) {
          throw new AIProviderAccessDeniedError()
        }
        aiLogger.error('request failed', {
          task: options.task,
          provider: 'gemini',
          model: config.model,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : 'unknown',
        })
        throw new AIProviderError(error instanceof Error ? error.message : 'Gemini request failed')
      }
    },
  }
}
