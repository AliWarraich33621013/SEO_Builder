import {
  AIKeyMissingError,
  AIProviderAccessDeniedError,
  AIProviderError,
  AIProviderUnsupportedError,
  AIValidationError
} from "./chunk-MBZD5R4K.js";

// src/ai/config.ts
var PROVIDER_ENV_KEYS = {
  gemini: "GEMINI_API_KEY",
  openai: "OPENAI_API_KEY",
  groq: "GROQ_API_KEY",
  claude: "ANTHROPIC_API_KEY",
  custom: "CUSTOM_AI_API_KEY"
};
var DEFAULT_MODELS = {
  gemini: "gemini-1.5-flash",
  openai: "gpt-4o-mini",
  groq: "llama-3.1-70b-versatile",
  claude: "claude-3-5-sonnet-latest",
  custom: "gpt-4o-mini"
};
function getActiveProviderName() {
  const provider = (process.env.AI_PROVIDER || "gemini").toLowerCase();
  const valid = ["gemini", "openai", "groq", "claude", "custom"];
  if (valid.includes(provider)) {
    return provider;
  }
  return "gemini";
}
function getProviderConfig(name) {
  const providerName = name ?? getActiveProviderName();
  const envKey = PROVIDER_ENV_KEYS[providerName];
  let model = DEFAULT_MODELS[providerName];
  let baseUrl;
  switch (providerName) {
    case "gemini":
      model = process.env.GEMINI_MODEL || model;
      break;
    case "openai":
      model = process.env.OPENAI_MODEL || model;
      break;
    case "groq":
      model = process.env.GROQ_MODEL || model;
      baseUrl = "https://api.groq.com/openai/v1";
      break;
    case "claude":
      model = process.env.ANTHROPIC_MODEL || model;
      break;
    case "custom":
      model = process.env.CUSTOM_AI_MODEL || model;
      baseUrl = process.env.CUSTOM_AI_BASE_URL;
      break;
  }
  return {
    name: providerName,
    apiKey: process.env[envKey],
    model,
    baseUrl
  };
}
function getProviderEnvKey(name) {
  return PROVIDER_ENV_KEYS[name];
}
function getProviderDisplayName(name) {
  const names = {
    gemini: "Gemini",
    openai: "OpenAI",
    groq: "Groq",
    claude: "Claude",
    custom: "Custom"
  };
  return names[name];
}

// src/ai/providers/claude.ts
import Anthropic from "@anthropic-ai/sdk";

// src/ai/logger.ts
function log(level, message, context = {}) {
  const parts = [
    "[seo-builder:ai]",
    context.provider ? `provider=${context.provider}` : "",
    context.model ? `model=${context.model}` : "",
    context.task ? `task=${context.task}` : "",
    context.durationMs !== void 0 ? `durationMs=${context.durationMs}` : "",
    message,
    context.error ? `error=${context.error}` : ""
  ].filter(Boolean);
  const line = parts.join(" ");
  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }
}
var aiLogger = {
  info: (message, context) => log("info", message, context),
  warn: (message, context) => log("warn", message, context),
  error: (message, context) => log("error", message, context)
};

// src/ai/prompts.ts
var DEFAULT_SYSTEM_PROMPT = "You are an expert SEO content strategist for SEO Builder. Respond with valid JSON only when asked for JSON.";
var prompts = {
  titles: (topic, focusKeyword, audience) => `Generate 5 SEO-optimized blog title suggestions.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Audience: ${audience}
Return JSON: { "titles": ["title1", ...] }`,
  outline: (topic, focusKeyword, audience, searchIntent) => `Create a blog outline.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Audience: ${audience}
Search intent: ${searchIntent}
Return JSON: { "h1": "...", "introAngle": "...", "structure": [{"heading":"H2","subheadings":["H3"]}], "faqSuggestions": ["..."], "ctaSuggestion": "..." }`,
  metaTitles: (postTitle, focusKeyword) => `Generate 3 SEO meta title suggestions (max 60 chars each).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Return JSON: { "suggestions": ["...", "...", "..."] }`,
  metaDescriptions: (postTitle, focusKeyword, excerptOrContent) => `Generate 3 SEO meta description suggestions (120-160 chars each).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content excerpt: ${excerptOrContent.slice(0, 500)}
Return JSON: { "suggestions": ["...", "...", "..."] }`,
  slug: (postTitle, focusKeyword) => `Generate a clean SEO-friendly URL slug (lowercase, hyphens only).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Return JSON: { "slug": "your-slug-here" }`,
  faq: (postTitle, focusKeyword, content) => `Generate 4-6 FAQ questions and answers for this blog post.
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content summary: ${content.slice(0, 1500)}
Return JSON: { "faqs": [{"question":"...","answer":"..."}] }`,
  altText: (imageContext, focusKeyword) => `Generate descriptive image alt text for SEO and accessibility.
Image context: ${imageContext}
Focus keyword: ${focusKeyword}
Return JSON: { "altText": "..." }`,
  socialCaptions: (postTitle, excerptOrContent) => `Generate social media captions for this blog post.
Post title: ${postTitle}
Content: ${excerptOrContent.slice(0, 800)}
Return JSON: { "linkedin": "...", "twitter": "...", "facebook": "..." }`,
  contentBrief: (topic, focusKeyword, audience) => `Create a comprehensive SEO content brief.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Audience: ${audience}
Return JSON: { "targetAudience": "...", "searchIntent": "...", "primaryKeyword": "...", "secondaryKeywords": ["..."], "contentAngle": "...", "recommendedWordCount": 1500, "outline": [{"heading":"H2","subheadings":["H3"]}], "competitorAngles": ["..."], "ctaSuggestion": "..." }`,
  searchIntent: (topic, focusKeyword) => `Detect the primary search intent for this topic and keyword.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Return JSON: { "intent": "informational|commercial|transactional|navigational", "confidence": "high|medium|low", "reasoning": "..." }`,
  cta: (postTitle, focusKeyword, excerptOrContent) => `Generate 3 compelling call-to-action suggestions for this blog post.
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content: ${excerptOrContent.slice(0, 500)}
Return JSON: { "suggestions": ["...", "...", "..."] }`,
  improveReadability: (content, focusKeyword) => `Improve the readability of this content while preserving SEO value and the focus keyword.
Focus keyword: ${focusKeyword}
Content: ${content.slice(0, 3e3)}
Return JSON: { "improvedText": "...", "changesSummary": "..." }`,
  excerpt: (postTitle, focusKeyword, content) => `Generate 3 compelling blog post excerpts (120-160 chars each).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content: ${content.slice(0, 1500)}
Return JSON: { "excerpts": ["...", "...", "..."] }`
};

// src/ai/providers/claude.ts
function createClaudeProvider() {
  const config = getProviderConfig("claude");
  const envKey = getProviderEnvKey("claude");
  if (!config.apiKey) {
    throw new AIKeyMissingError(getProviderDisplayName("claude"), envKey);
  }
  const client = new Anthropic({ apiKey: config.apiKey });
  return {
    name: "claude",
    model: config.model,
    async generateText(options) {
      const start = Date.now();
      try {
        const response = await client.messages.create({
          model: config.model,
          max_tokens: options.maxTokens ?? 4096,
          temperature: options.temperature ?? 0.7,
          system: options.systemPrompt || DEFAULT_SYSTEM_PROMPT,
          messages: [{ role: "user", content: options.prompt }]
        });
        const textBlock = response.content.find((block) => block.type === "text");
        const text = textBlock && "text" in textBlock ? textBlock.text : "";
        if (!text) throw new AIProviderError("Empty response from Claude");
        aiLogger.info("request completed", {
          task: options.task,
          provider: "claude",
          model: config.model,
          durationMs: Date.now() - start
        });
        return { text, provider: "claude", model: config.model };
      } catch (error) {
        if (error instanceof AIKeyMissingError) throw error;
        aiLogger.error("request failed", {
          task: options.task,
          provider: "claude",
          model: config.model,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : "unknown"
        });
        throw new AIProviderError(error instanceof Error ? error.message : "Claude request failed");
      }
    }
  };
}

// src/ai/providers/openai.ts
import OpenAI from "openai";
function createOpenAICompatibleProvider(providerName) {
  const config = getProviderConfig(providerName);
  const envKey = getProviderEnvKey(providerName);
  const displayName = getProviderDisplayName(providerName);
  if (!config.apiKey) {
    throw new AIKeyMissingError(displayName, envKey);
  }
  if (providerName === "custom" && !config.baseUrl) {
    throw new AIProviderError("CUSTOM_AI_BASE_URL is required for custom provider");
  }
  const client = new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl
  });
  return {
    name: providerName,
    model: config.model,
    async generateText(options) {
      const start = Date.now();
      try {
        const response = await client.chat.completions.create({
          model: config.model,
          messages: [
            { role: "system", content: options.systemPrompt || DEFAULT_SYSTEM_PROMPT },
            { role: "user", content: options.prompt }
          ],
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 4096,
          ...options.responseFormat === "json" ? { response_format: { type: "json_object" } } : {}
        });
        const text = response.choices[0]?.message?.content;
        if (!text) throw new AIProviderError(`Empty response from ${displayName}`);
        aiLogger.info("request completed", {
          task: options.task,
          provider: providerName,
          model: config.model,
          durationMs: Date.now() - start
        });
        return { text, provider: providerName, model: config.model };
      } catch (error) {
        if (error instanceof AIKeyMissingError) throw error;
        aiLogger.error("request failed", {
          task: options.task,
          provider: providerName,
          model: config.model,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : "unknown"
        });
        throw new AIProviderError(
          error instanceof Error ? error.message : `${displayName} request failed`
        );
      }
    }
  };
}
function createOpenAIProvider() {
  return createOpenAICompatibleProvider("openai");
}
function createGroqProvider() {
  return createOpenAICompatibleProvider("groq");
}
function createCustomProvider() {
  return createOpenAICompatibleProvider("custom");
}

// src/ai/providers/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// src/ai/providers/gemini-errors.ts
function isGeminiAccessDeniedError(error) {
  if (!error) return false;
  if (typeof error === "object") {
    const e = error;
    if (e.status === 403) return true;
    const statusText = String(e.statusText || "").toLowerCase();
    if (statusText === "forbidden") return true;
    const details = e.errorDetails;
    if (Array.isArray(details)) {
      const denied = details.some((detail) => {
        if (!detail || typeof detail !== "object") return false;
        const d = detail;
        const reason = String(d.reason || d["@type"] || "").toUpperCase();
        return reason.includes("PERMISSION_DENIED");
      });
      if (denied) return true;
    }
  }
  const message = error instanceof Error ? error.message : String(error);
  const lower = message.toLowerCase();
  if (lower.includes("your project has been denied access")) return true;
  if (lower.includes("permission_denied")) return true;
  if (lower.includes("403 forbidden") && lower.includes("denied")) return true;
  if (lower.includes("403") && lower.includes("forbidden") && lower.includes("denied access")) {
    return true;
  }
  return false;
}

// src/ai/providers/gemini.ts
function createGeminiProvider() {
  const config = getProviderConfig("gemini");
  const envKey = getProviderEnvKey("gemini");
  if (!config.apiKey) {
    throw new AIKeyMissingError(getProviderDisplayName("gemini"), envKey);
  }
  const client = new GoogleGenerativeAI(config.apiKey);
  return {
    name: "gemini",
    model: config.model,
    async generateText(options) {
      const start = Date.now();
      try {
        const model = client.getGenerativeModel({
          model: config.model,
          systemInstruction: options.systemPrompt || DEFAULT_SYSTEM_PROMPT,
          generationConfig: {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 4096,
            responseMimeType: options.responseFormat === "json" ? "application/json" : "text/plain"
          }
        });
        const result = await model.generateContent(options.prompt);
        const text = result.response.text();
        if (!text) throw new AIProviderError("Empty response from Gemini");
        aiLogger.info("request completed", {
          task: options.task,
          provider: "gemini",
          model: config.model,
          durationMs: Date.now() - start
        });
        return { text, provider: "gemini", model: config.model };
      } catch (error) {
        if (error instanceof AIKeyMissingError || error instanceof AIProviderAccessDeniedError) {
          throw error;
        }
        if (isGeminiAccessDeniedError(error)) {
          throw new AIProviderAccessDeniedError();
        }
        aiLogger.error("request failed", {
          task: options.task,
          provider: "gemini",
          model: config.model,
          durationMs: Date.now() - start,
          error: error instanceof Error ? error.message : "unknown"
        });
        throw new AIProviderError(error instanceof Error ? error.message : "Gemini request failed");
      }
    }
  };
}

// src/ai/validate.ts
import { z } from "zod";
var generateTitleSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
  audience: z.string().optional()
});
var generateOutlineSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
  audience: z.string().optional(),
  searchIntent: z.string().optional()
});
var generateMetaTitleSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1)
});
var generateMetaDescriptionSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional()
});
var generateMetaSchema = generateMetaTitleSchema.extend({
  type: z.enum(["description"]).optional(),
  excerpt: z.string().optional(),
  content: z.string().optional()
});
var generateSlugSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().optional()
});
var generateFaqSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  content: z.string().optional()
});
var generateAltTextSchema = z.object({
  imageContext: z.string().min(1),
  focusKeyword: z.string().optional()
});
var generateSocialSchema = z.object({
  postTitle: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional()
});
var generateContentBriefSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1),
  audience: z.string().optional()
});
var detectSearchIntentSchema = z.object({
  topic: z.string().min(1),
  focusKeyword: z.string().min(1)
});
var generateCtaSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional()
});
var improveReadabilitySchema = z.object({
  content: z.string().min(1),
  focusKeyword: z.string().optional()
});
var generateExcerptSchema = z.object({
  postTitle: z.string().min(1),
  focusKeyword: z.string().min(1),
  content: z.string().optional()
});
async function parseBody(request, schema) {
  let body;
  try {
    body = await request.json();
  } catch {
    throw new AIValidationError("Invalid JSON body");
  }
  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join("; ");
    throw new AIValidationError(message || "Validation failed");
  }
  return result.data;
}

// src/ai/index.ts
function getAIProvider() {
  const name = getActiveProviderName();
  switch (name) {
    case "gemini":
      return createGeminiProvider();
    case "openai":
      return createOpenAIProvider();
    case "groq":
      return createGroqProvider();
    case "claude":
      return createClaudeProvider();
    case "custom":
      return createCustomProvider();
    default:
      throw new AIProviderUnsupportedError(name);
  }
}
function getProviderInfo() {
  const config = getProviderConfig();
  return { provider: config.name, model: config.model };
}
async function generateText(options) {
  const provider = getAIProvider();
  return provider.generateText(options);
}
async function generateJSON(task, prompt, systemPrompt) {
  const result = await generateText({
    task,
    prompt,
    systemPrompt,
    responseFormat: "json"
  });
  try {
    const data = JSON.parse(result.text);
    return { data, provider: result.provider, model: result.model };
  } catch {
    throw new AIProviderError("Failed to parse AI response as JSON");
  }
}
async function withAI(task, prompt, parse) {
  const result = await generateJSON(task, prompt);
  return {
    data: parse(result.data),
    provider: result.provider,
    model: result.model
  };
}
async function generateTitles(topic, focusKeyword, audience) {
  const result = await withAI("generate-title", prompts.titles(topic, focusKeyword, audience), (data) => {
    const parsed = data;
    return parsed.titles?.slice(0, 5) ?? [];
  });
  return result;
}
async function generateOutline(topic, focusKeyword, audience, searchIntent) {
  return withAI(
    "generate-outline",
    prompts.outline(topic, focusKeyword, audience, searchIntent),
    (data) => data
  );
}
async function generateMetaTitles(postTitle, focusKeyword) {
  const result = await withAI(
    "generate-meta-title",
    prompts.metaTitles(postTitle, focusKeyword),
    (data) => {
      const parsed = data;
      return parsed.suggestions?.slice(0, 3) ?? [];
    }
  );
  return result;
}
async function generateMetaDescriptions(postTitle, focusKeyword, excerptOrContent) {
  const result = await withAI(
    "generate-meta-description",
    prompts.metaDescriptions(postTitle, focusKeyword, excerptOrContent),
    (data) => {
      const parsed = data;
      return parsed.suggestions?.slice(0, 3) ?? [];
    }
  );
  return result;
}
async function generateSlug(postTitle, focusKeyword) {
  const result = await withAI("generate-slug", prompts.slug(postTitle, focusKeyword), (data) => {
    const parsed = data;
    return parsed.slug;
  });
  return result;
}
async function generateFAQ(postTitle, focusKeyword, content) {
  const result = await withAI("generate-faq", prompts.faq(postTitle, focusKeyword, content), (data) => {
    const parsed = data;
    return parsed.faqs?.slice(0, 6) ?? [];
  });
  return result;
}
async function generateAltText(imageContext, focusKeyword) {
  const result = await withAI(
    "generate-alt-text",
    prompts.altText(imageContext, focusKeyword),
    (data) => data.altText
  );
  return result;
}
async function generateSocialCaptions(postTitle, excerptOrContent) {
  return withAI(
    "generate-social-captions",
    prompts.socialCaptions(postTitle, excerptOrContent),
    (data) => data
  );
}
async function generateContentBrief(topic, focusKeyword, audience) {
  return withAI(
    "generate-content-brief",
    prompts.contentBrief(topic, focusKeyword, audience),
    (data) => data
  );
}
async function detectSearchIntent(topic, focusKeyword) {
  return withAI(
    "detect-search-intent",
    prompts.searchIntent(topic, focusKeyword),
    (data) => data
  );
}
async function generateCta(postTitle, focusKeyword, excerptOrContent) {
  const result = await withAI(
    "generate-cta",
    prompts.cta(postTitle, focusKeyword, excerptOrContent),
    (data) => {
      const parsed = data;
      return parsed.suggestions?.slice(0, 3) ?? [];
    }
  );
  return result;
}
async function improveReadability(content, focusKeyword) {
  return withAI(
    "improve-readability",
    prompts.improveReadability(content, focusKeyword),
    (data) => data
  );
}
async function generateExcerpt(postTitle, focusKeyword, content) {
  const result = await withAI(
    "generate-excerpt",
    prompts.excerpt(postTitle, focusKeyword, content),
    (data) => {
      const parsed = data;
      return parsed.excerpts?.slice(0, 3) ?? [];
    }
  );
  return result;
}

export {
  getActiveProviderName,
  getProviderConfig,
  getProviderDisplayName,
  aiLogger,
  generateTitleSchema,
  generateOutlineSchema,
  generateMetaTitleSchema,
  generateMetaDescriptionSchema,
  generateMetaSchema,
  generateSlugSchema,
  generateFaqSchema,
  generateAltTextSchema,
  generateSocialSchema,
  generateContentBriefSchema,
  detectSearchIntentSchema,
  generateCtaSchema,
  improveReadabilitySchema,
  generateExcerptSchema,
  parseBody,
  getAIProvider,
  getProviderInfo,
  generateText,
  generateJSON,
  generateTitles,
  generateOutline,
  generateMetaTitles,
  generateMetaDescriptions,
  generateSlug,
  generateFAQ,
  generateAltText,
  generateSocialCaptions,
  generateContentBrief,
  detectSearchIntent,
  generateCta,
  improveReadability,
  generateExcerpt
};
//# sourceMappingURL=chunk-YI7RHPFW.js.map