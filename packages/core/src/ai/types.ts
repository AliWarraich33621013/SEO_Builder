export type AIProviderName = 'gemini' | 'openai' | 'groq' | 'claude' | 'custom'

export type ResponseFormat = 'text' | 'json'

export type GenerateTextOptions = {
  task: string
  prompt: string
  systemPrompt?: string
  temperature?: number
  maxTokens?: number
  responseFormat?: ResponseFormat
}

export type GenerateTextResult = {
  text: string
  provider: AIProviderName
  model: string
}

export type AIProvider = {
  name: AIProviderName
  model: string
  generateText(options: GenerateTextOptions): Promise<GenerateTextResult>
}

export type ProviderInfo = {
  provider: AIProviderName
  model: string
}

export type TitleSuggestions = { titles: string[] }
export type OutlineResult = {
  h1: string
  introAngle: string
  structure: { heading: string; subheadings?: string[] }[]
  faqSuggestions: string[]
  ctaSuggestion: string
}
export type MetaSuggestions = { suggestions: string[] }
export type SlugResult = { slug: string }
export type FAQResult = { faqs: { question: string; answer: string }[] }
export type AltTextResult = { altText: string }
export type SocialCaptionsResult = {
  linkedin: string
  twitter: string
  facebook: string
}
export type ContentBriefResult = {
  targetAudience: string
  searchIntent: string
  primaryKeyword: string
  secondaryKeywords: string[]
  contentAngle: string
  recommendedWordCount: number
  outline: { heading: string; subheadings?: string[] }[]
  competitorAngles: string[]
  ctaSuggestion: string
}
export type SearchIntentResult = {
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  confidence: string
  reasoning: string
}
export type CtaResult = { suggestions: string[] }
export type ReadabilityResult = {
  improvedText: string
  changesSummary: string
}
export type ExcerptResult = { excerpts: string[] }

export type AIGeneratorResult<T> = {
  data: T
  provider: AIProviderName
  model: string
}
