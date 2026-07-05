import { z } from 'zod';
export { seoScoreSchema } from '../validation/index.js';

type AIProviderName = 'gemini' | 'openai' | 'groq' | 'claude' | 'custom';
type ResponseFormat = 'text' | 'json';
type GenerateTextOptions = {
    task: string;
    prompt: string;
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
    responseFormat?: ResponseFormat;
};
type GenerateTextResult = {
    text: string;
    provider: AIProviderName;
    model: string;
};
type AIProvider = {
    name: AIProviderName;
    model: string;
    generateText(options: GenerateTextOptions): Promise<GenerateTextResult>;
};
type ProviderInfo = {
    provider: AIProviderName;
    model: string;
};
type OutlineResult = {
    h1: string;
    introAngle: string;
    structure: {
        heading: string;
        subheadings?: string[];
    }[];
    faqSuggestions: string[];
    ctaSuggestion: string;
};
type SocialCaptionsResult = {
    linkedin: string;
    twitter: string;
    facebook: string;
};
type ContentBriefResult = {
    targetAudience: string;
    searchIntent: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
    contentAngle: string;
    recommendedWordCount: number;
    outline: {
        heading: string;
        subheadings?: string[];
    }[];
    competitorAngles: string[];
    ctaSuggestion: string;
};
type SearchIntentResult = {
    intent: 'informational' | 'commercial' | 'transactional' | 'navigational';
    confidence: string;
    reasoning: string;
};
type ReadabilityResult = {
    improvedText: string;
    changesSummary: string;
};
type AIGeneratorResult<T> = {
    data: T;
    provider: AIProviderName;
    model: string;
};

type AIErrorCode = 'AI_PROVIDER_MISSING_KEY' | 'AI_PROVIDER_ACCESS_DENIED' | 'AI_PROVIDER_UNSUPPORTED' | 'AI_REQUEST_FAILED' | 'AI_RATE_LIMITED' | 'AI_VALIDATION_ERROR';
declare class AIError extends Error {
    code: AIErrorCode;
    status: number;
    constructor(code: AIErrorCode, message: string, status?: number);
}
declare class AIKeyMissingError extends AIError {
    constructor(provider: string, envVar: string);
}
declare class AIProviderAccessDeniedError extends AIError {
    constructor(message?: string);
}
declare class AIProviderUnsupportedError extends AIError {
    constructor(provider: string);
}
declare class AIProviderError extends AIError {
    constructor(message: string);
}
declare class AIRateLimitError extends AIError {
    constructor(message?: string);
}
declare class AIValidationError extends AIError {
    constructor(message: string);
}
declare function isAIError(error: unknown): error is AIError;

type ProviderConfig = {
    name: AIProviderName;
    apiKey: string | undefined;
    model: string;
    baseUrl?: string;
};
declare function getActiveProviderName(): AIProviderName;
declare function getProviderConfig(name?: AIProviderName): ProviderConfig;
declare function getProviderDisplayName(name: AIProviderName): string;

type LogContext = {
    task?: string;
    provider?: string;
    model?: string;
    durationMs?: number;
    error?: string;
};
declare const aiLogger: {
    info: (message: string, context?: LogContext) => void;
    warn: (message: string, context?: LogContext) => void;
    error: (message: string, context?: LogContext) => void;
};

declare const generateTitleSchema: z.ZodObject<{
    topic: z.ZodString;
    focusKeyword: z.ZodString;
    audience: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    topic: string;
    focusKeyword: string;
    audience?: string | undefined;
}, {
    topic: string;
    focusKeyword: string;
    audience?: string | undefined;
}>;
declare const generateOutlineSchema: z.ZodObject<{
    topic: z.ZodString;
    focusKeyword: z.ZodString;
    audience: z.ZodOptional<z.ZodString>;
    searchIntent: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    topic: string;
    focusKeyword: string;
    audience?: string | undefined;
    searchIntent?: string | undefined;
}, {
    topic: string;
    focusKeyword: string;
    audience?: string | undefined;
    searchIntent?: string | undefined;
}>;
declare const generateMetaTitleSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    focusKeyword: string;
    postTitle: string;
}, {
    focusKeyword: string;
    postTitle: string;
}>;
declare const generateMetaDescriptionSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
    excerpt?: string | undefined;
}, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
    excerpt?: string | undefined;
}>;
declare const generateMetaSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodString;
} & {
    type: z.ZodOptional<z.ZodEnum<["description"]>>;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    focusKeyword: string;
    postTitle: string;
    type?: "description" | undefined;
    content?: string | undefined;
    excerpt?: string | undefined;
}, {
    focusKeyword: string;
    postTitle: string;
    type?: "description" | undefined;
    content?: string | undefined;
    excerpt?: string | undefined;
}>;
declare const generateSlugSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    postTitle: string;
    focusKeyword?: string | undefined;
}, {
    postTitle: string;
    focusKeyword?: string | undefined;
}>;
declare const generateFaqSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
}, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
}>;
declare const generateAltTextSchema: z.ZodObject<{
    imageContext: z.ZodString;
    focusKeyword: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    imageContext: string;
    focusKeyword?: string | undefined;
}, {
    imageContext: string;
    focusKeyword?: string | undefined;
}>;
declare const generateSocialSchema: z.ZodObject<{
    postTitle: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    postTitle: string;
    content?: string | undefined;
    excerpt?: string | undefined;
}, {
    postTitle: string;
    content?: string | undefined;
    excerpt?: string | undefined;
}>;
declare const generateContentBriefSchema: z.ZodObject<{
    topic: z.ZodString;
    focusKeyword: z.ZodString;
    audience: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    topic: string;
    focusKeyword: string;
    audience?: string | undefined;
}, {
    topic: string;
    focusKeyword: string;
    audience?: string | undefined;
}>;
declare const detectSearchIntentSchema: z.ZodObject<{
    topic: z.ZodString;
    focusKeyword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    topic: string;
    focusKeyword: string;
}, {
    topic: string;
    focusKeyword: string;
}>;
declare const generateCtaSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
    excerpt?: string | undefined;
}, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
    excerpt?: string | undefined;
}>;
declare const improveReadabilitySchema: z.ZodObject<{
    content: z.ZodString;
    focusKeyword: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content: string;
    focusKeyword?: string | undefined;
}, {
    content: string;
    focusKeyword?: string | undefined;
}>;
declare const generateExcerptSchema: z.ZodObject<{
    postTitle: z.ZodString;
    focusKeyword: z.ZodString;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
}, {
    focusKeyword: string;
    postTitle: string;
    content?: string | undefined;
}>;
declare function parseBody<T extends z.ZodTypeAny>(request: Request, schema: T): Promise<z.infer<T>>;

declare function getAIProvider(): AIProvider;
declare function getProviderInfo(): ProviderInfo;
declare function generateText(options: GenerateTextOptions): Promise<GenerateTextResult>;
declare function generateJSON<T>(task: string, prompt: string, systemPrompt?: string): Promise<AIGeneratorResult<T>>;
declare function generateTitles(topic: string, focusKeyword: string, audience: string): Promise<AIGeneratorResult<string[]>>;
declare function generateOutline(topic: string, focusKeyword: string, audience: string, searchIntent: string): Promise<AIGeneratorResult<OutlineResult>>;
declare function generateMetaTitles(postTitle: string, focusKeyword: string): Promise<AIGeneratorResult<string[]>>;
declare function generateMetaDescriptions(postTitle: string, focusKeyword: string, excerptOrContent: string): Promise<AIGeneratorResult<string[]>>;
declare function generateSlug(postTitle: string, focusKeyword: string): Promise<AIGeneratorResult<string>>;
declare function generateFAQ(postTitle: string, focusKeyword: string, content: string): Promise<AIGeneratorResult<{
    question: string;
    answer: string;
}[]>>;
declare function generateAltText(imageContext: string, focusKeyword: string): Promise<AIGeneratorResult<string>>;
declare function generateSocialCaptions(postTitle: string, excerptOrContent: string): Promise<AIGeneratorResult<SocialCaptionsResult>>;
declare function generateContentBrief(topic: string, focusKeyword: string, audience: string): Promise<AIGeneratorResult<ContentBriefResult>>;
declare function detectSearchIntent(topic: string, focusKeyword: string): Promise<AIGeneratorResult<SearchIntentResult>>;
declare function generateCta(postTitle: string, focusKeyword: string, excerptOrContent: string): Promise<AIGeneratorResult<string[]>>;
declare function improveReadability(content: string, focusKeyword: string): Promise<AIGeneratorResult<ReadabilityResult>>;
declare function generateExcerpt(postTitle: string, focusKeyword: string, content: string): Promise<AIGeneratorResult<string[]>>;

export { AIError, type AIGeneratorResult, AIKeyMissingError, AIProviderAccessDeniedError, AIProviderError, type AIProviderName, AIProviderUnsupportedError, AIRateLimitError, AIValidationError, type ProviderInfo, aiLogger, detectSearchIntent, detectSearchIntentSchema, generateAltText, generateAltTextSchema, generateContentBrief, generateContentBriefSchema, generateCta, generateCtaSchema, generateExcerpt, generateExcerptSchema, generateFAQ, generateFaqSchema, generateJSON, generateMetaDescriptionSchema, generateMetaDescriptions, generateMetaSchema, generateMetaTitleSchema, generateMetaTitles, generateOutline, generateOutlineSchema, generateSlug, generateSlugSchema, generateSocialCaptions, generateSocialSchema, generateText, generateTitleSchema, generateTitles, getAIProvider, getActiveProviderName, getProviderConfig, getProviderDisplayName, getProviderInfo, improveReadability, improveReadabilitySchema, isAIError, parseBody };
