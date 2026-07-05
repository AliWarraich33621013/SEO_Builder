import { getActiveProviderName, getProviderConfig } from './config'
import { AIProviderUnsupportedError, AIProviderError } from './errors'
import { createClaudeProvider } from './providers/claude'
import { createCustomProvider } from './providers/custom'
import { createGeminiProvider } from './providers/gemini'
import { createGroqProvider } from './providers/openai'
import { createOpenAIProvider } from './providers/openai'
import { prompts } from './prompts'
import type {
  AIProvider,
  AIProviderName,
  AIGeneratorResult,
  AltTextResult,
  ContentBriefResult,
  CtaResult,
  ExcerptResult,
  FAQResult,
  GenerateTextOptions,
  GenerateTextResult,
  MetaSuggestions,
  OutlineResult,
  ProviderInfo,
  ReadabilityResult,
  SearchIntentResult,
  SlugResult,
  SocialCaptionsResult,
  TitleSuggestions,
} from './types'

export function getAIProvider(): AIProvider {
  const name = getActiveProviderName()

  switch (name) {
    case 'gemini':
      return createGeminiProvider()
    case 'openai':
      return createOpenAIProvider()
    case 'groq':
      return createGroqProvider()
    case 'claude':
      return createClaudeProvider()
    case 'custom':
      return createCustomProvider()
    default:
      throw new AIProviderUnsupportedError(name)
  }
}

export function getProviderInfo(): ProviderInfo {
  const config = getProviderConfig()
  return { provider: config.name, model: config.model }
}

export async function generateText(options: GenerateTextOptions): Promise<GenerateTextResult> {
  const provider = getAIProvider()
  return provider.generateText(options)
}

export async function generateJSON<T>(
  task: string,
  prompt: string,
  systemPrompt?: string,
): Promise<AIGeneratorResult<T>> {
  const result = await generateText({
    task,
    prompt,
    systemPrompt,
    responseFormat: 'json',
  })

  try {
    const data = JSON.parse(result.text) as T
    return { data, provider: result.provider, model: result.model }
  } catch {
    throw new AIProviderError('Failed to parse AI response as JSON')
  }
}

async function withAI<T>(
  task: string,
  prompt: string,
  parse: (data: unknown) => T,
): Promise<AIGeneratorResult<T>> {
  const result = await generateJSON<unknown>(task, prompt)
  return {
    data: parse(result.data),
    provider: result.provider,
    model: result.model,
  }
}

export async function generateTitles(topic: string, focusKeyword: string, audience: string) {
  const result = await withAI('generate-title', prompts.titles(topic, focusKeyword, audience), (data) => {
    const parsed = data as TitleSuggestions
    return parsed.titles?.slice(0, 5) ?? []
  })
  return result
}

export async function generateOutline(
  topic: string,
  focusKeyword: string,
  audience: string,
  searchIntent: string,
) {
  return withAI(
    'generate-outline',
    prompts.outline(topic, focusKeyword, audience, searchIntent),
    (data) => data as OutlineResult,
  )
}

export async function generateMetaTitles(postTitle: string, focusKeyword: string) {
  const result = await withAI(
    'generate-meta-title',
    prompts.metaTitles(postTitle, focusKeyword),
    (data) => {
      const parsed = data as MetaSuggestions
      return parsed.suggestions?.slice(0, 3) ?? []
    },
  )
  return result
}

export async function generateMetaDescriptions(
  postTitle: string,
  focusKeyword: string,
  excerptOrContent: string,
) {
  const result = await withAI(
    'generate-meta-description',
    prompts.metaDescriptions(postTitle, focusKeyword, excerptOrContent),
    (data) => {
      const parsed = data as MetaSuggestions
      return parsed.suggestions?.slice(0, 3) ?? []
    },
  )
  return result
}

export async function generateSlug(postTitle: string, focusKeyword: string) {
  const result = await withAI('generate-slug', prompts.slug(postTitle, focusKeyword), (data) => {
    const parsed = data as SlugResult
    return parsed.slug
  })
  return result
}

export async function generateFAQ(postTitle: string, focusKeyword: string, content: string) {
  const result = await withAI('generate-faq', prompts.faq(postTitle, focusKeyword, content), (data) => {
    const parsed = data as FAQResult
    return parsed.faqs?.slice(0, 6) ?? []
  })
  return result
}

export async function generateAltText(imageContext: string, focusKeyword: string) {
  const result = await withAI(
    'generate-alt-text',
    prompts.altText(imageContext, focusKeyword),
    (data) => (data as AltTextResult).altText,
  )
  return result
}

export async function generateSocialCaptions(postTitle: string, excerptOrContent: string) {
  return withAI(
    'generate-social-captions',
    prompts.socialCaptions(postTitle, excerptOrContent),
    (data) => data as SocialCaptionsResult,
  )
}

export async function generateContentBrief(topic: string, focusKeyword: string, audience: string) {
  return withAI(
    'generate-content-brief',
    prompts.contentBrief(topic, focusKeyword, audience),
    (data) => data as ContentBriefResult,
  )
}

export async function detectSearchIntent(topic: string, focusKeyword: string) {
  return withAI(
    'detect-search-intent',
    prompts.searchIntent(topic, focusKeyword),
    (data) => data as SearchIntentResult,
  )
}

export async function generateCta(postTitle: string, focusKeyword: string, excerptOrContent: string) {
  const result = await withAI(
    'generate-cta',
    prompts.cta(postTitle, focusKeyword, excerptOrContent),
    (data) => {
      const parsed = data as CtaResult
      return parsed.suggestions?.slice(0, 3) ?? []
    },
  )
  return result
}

export async function improveReadability(content: string, focusKeyword: string) {
  return withAI(
    'improve-readability',
    prompts.improveReadability(content, focusKeyword),
    (data) => data as ReadabilityResult,
  )
}

export async function generateExcerpt(postTitle: string, focusKeyword: string, content: string) {
  const result = await withAI(
    'generate-excerpt',
    prompts.excerpt(postTitle, focusKeyword, content),
    (data) => {
      const parsed = data as ExcerptResult
      return parsed.excerpts?.slice(0, 3) ?? []
    },
  )
  return result
}

export {
  AIError,
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderError,
  AIProviderUnsupportedError,
  AIRateLimitError,
  AIValidationError,
  isAIError,
} from './errors'
export { getActiveProviderName, getProviderConfig, getProviderDisplayName } from './config'
export { aiLogger } from './logger'
export * from './validate'
export type { AIGeneratorResult, AIProviderName, ProviderInfo } from './types'
