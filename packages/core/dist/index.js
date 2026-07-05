import {
  aiLogger,
  detectSearchIntent,
  detectSearchIntentSchema,
  generateAltText,
  generateAltTextSchema,
  generateContentBrief,
  generateContentBriefSchema,
  generateCta,
  generateCtaSchema,
  generateExcerpt,
  generateExcerptSchema,
  generateFAQ,
  generateFaqSchema,
  generateJSON,
  generateMetaDescriptionSchema,
  generateMetaDescriptions,
  generateMetaSchema,
  generateMetaTitleSchema,
  generateMetaTitles,
  generateOutline,
  generateOutlineSchema,
  generateSlug,
  generateSlugSchema,
  generateSocialCaptions,
  generateSocialSchema,
  generateText,
  generateTitleSchema,
  generateTitles,
  getAIProvider,
  getActiveProviderName,
  getProviderConfig,
  getProviderDisplayName,
  getProviderInfo,
  improveReadability,
  improveReadabilitySchema,
  parseBody
} from "./chunk-YI7RHPFW.js";
import {
  buildCanonicalUrl,
  calculateSeoScore,
  generateArticleSchema,
  generateBlogMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePostMetadata,
  scoreToGrade
} from "./chunk-IVXRUDGV.js";
import {
  defaultSeoBuilderConfig,
  resolveSeoBuilderConfig
} from "./chunk-COMPWLC5.js";
import "./chunk-DAMXOWOQ.js";
import {
  seoScoreSchema
} from "./chunk-BNXSTWJD.js";
import {
  aiErrorResponse,
  aiSuccessResponse,
  apiErrorResponse,
  apiSuccessResponse
} from "./chunk-TZ62V7RR.js";
import {
  AIError,
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderError,
  AIProviderUnsupportedError,
  AIRateLimitError,
  AIValidationError,
  isAIError
} from "./chunk-MBZD5R4K.js";

// src/rate-limit.ts
var store = /* @__PURE__ */ new Map();
var WINDOW_MS = 15 * 60 * 1e3;
var MAX_REQUESTS = 30;
function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
function checkRateLimit(request, keyPrefix = "seo-builder-ai") {
  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  if (entry.count >= MAX_REQUESTS) {
    throw new AIRateLimitError(
      `Rate limit exceeded. Maximum ${MAX_REQUESTS} AI requests per 15 minutes.`
    );
  }
  entry.count += 1;
  store.set(key, entry);
}
function resetRateLimitStore() {
  store.clear();
}

// src/utils.ts
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function getMediaUrl(media) {
  if (!media) return void 0;
  if (typeof media === "string") return void 0;
  return media.url ?? void 0;
}
export {
  AIError,
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderError,
  AIProviderUnsupportedError,
  AIRateLimitError,
  AIValidationError,
  aiErrorResponse,
  aiLogger,
  aiSuccessResponse,
  apiErrorResponse,
  apiSuccessResponse,
  buildCanonicalUrl,
  calculateSeoScore,
  checkRateLimit,
  defaultSeoBuilderConfig,
  detectSearchIntent,
  detectSearchIntentSchema,
  generateAltText,
  generateAltTextSchema,
  generateArticleSchema,
  generateBlogMetadata,
  generateBreadcrumbSchema,
  generateContentBrief,
  generateContentBriefSchema,
  generateCta,
  generateCtaSchema,
  generateExcerpt,
  generateExcerptSchema,
  generateFAQ,
  generateFAQSchema,
  generateFaqSchema,
  generateJSON,
  generateMetaDescriptionSchema,
  generateMetaDescriptions,
  generateMetaSchema,
  generateMetaTitleSchema,
  generateMetaTitles,
  generateOutline,
  generateOutlineSchema,
  generatePostMetadata,
  generateSlug,
  generateSlugSchema,
  generateSocialCaptions,
  generateSocialSchema,
  generateText,
  generateTitleSchema,
  generateTitles,
  getAIProvider,
  getActiveProviderName,
  getClientIp,
  getMediaUrl,
  getProviderConfig,
  getProviderDisplayName,
  getProviderInfo,
  improveReadability,
  improveReadabilitySchema,
  isAIError,
  parseBody,
  resetRateLimitStore,
  resolveSeoBuilderConfig,
  scoreToGrade,
  seoScoreSchema,
  slugify
};
//# sourceMappingURL=index.js.map