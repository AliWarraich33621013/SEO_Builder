export { SeoBuilderAiConfig, SeoBuilderBlogConfig, SeoBuilderBrandingConfig, SeoBuilderConfig, SeoBuilderCtaConfig, SeoBuilderPluginOptions, SeoBuilderSeoDefaultsConfig, SeoBuilderSiteConfig, defaultSeoBuilderConfig, resolveSeoBuilderConfig } from './config/index.js';
export { PostForSeo, SeoCheckItem, SeoGrade, SeoScoreResult, SiteSettingsForSeo, SiteSettingsMeta, buildCanonicalUrl, calculateSeoScore, generateArticleSchema, generateBlogMetadata, generateBreadcrumbSchema, generateFAQSchema, generatePostMetadata, scoreToGrade } from './seo/index.js';
export { AIError, AIGeneratorResult, AIKeyMissingError, AIProviderAccessDeniedError, AIProviderError, AIProviderName, AIProviderUnsupportedError, AIRateLimitError, AIValidationError, ProviderInfo, aiLogger, detectSearchIntent, detectSearchIntentSchema, generateAltText, generateAltTextSchema, generateContentBrief, generateContentBriefSchema, generateCta, generateCtaSchema, generateExcerpt, generateExcerptSchema, generateFAQ, generateFaqSchema, generateJSON, generateMetaDescriptionSchema, generateMetaDescriptions, generateMetaSchema, generateMetaTitleSchema, generateMetaTitles, generateOutline, generateOutlineSchema, generateSlug, generateSlugSchema, generateSocialCaptions, generateSocialSchema, generateText, generateTitleSchema, generateTitles, getAIProvider, getActiveProviderName, getProviderConfig, getProviderDisplayName, getProviderInfo, improveReadability, improveReadabilitySchema, isAIError, parseBody } from './ai/index.js';
export { seoScoreSchema } from './validation/index.js';
export { ApiErrorBody, ApiSuccessBody, aiErrorResponse, aiSuccessResponse, apiErrorResponse, apiSuccessResponse } from './api-response.js';
import 'next';
import 'zod';
import 'next/server';

declare function getClientIp(request: Request): string;
declare function checkRateLimit(request: Request, keyPrefix?: string): void;
declare function resetRateLimitStore(): void;

declare function slugify(text: string): string;
declare function getMediaUrl(media: {
    url?: string | null;
    filename?: string | null;
} | string | null | undefined): string | undefined;

export { checkRateLimit, getClientIp, getMediaUrl, resetRateLimitStore, slugify };
