export const DEFAULT_SYSTEM_PROMPT =
  'You are an expert SEO content strategist for SEO Builder. Respond with valid JSON only when asked for JSON.'

export const prompts = {
  titles: (topic: string, focusKeyword: string, audience: string) =>
    `Generate 5 SEO-optimized blog title suggestions.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Audience: ${audience}
Return JSON: { "titles": ["title1", ...] }`,

  outline: (topic: string, focusKeyword: string, audience: string, searchIntent: string) =>
    `Create a blog outline.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Audience: ${audience}
Search intent: ${searchIntent}
Return JSON: { "h1": "...", "introAngle": "...", "structure": [{"heading":"H2","subheadings":["H3"]}], "faqSuggestions": ["..."], "ctaSuggestion": "..." }`,

  metaTitles: (postTitle: string, focusKeyword: string) =>
    `Generate 3 SEO meta title suggestions (max 60 chars each).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Return JSON: { "suggestions": ["...", "...", "..."] }`,

  metaDescriptions: (postTitle: string, focusKeyword: string, excerptOrContent: string) =>
    `Generate 3 SEO meta description suggestions (120-160 chars each).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content excerpt: ${excerptOrContent.slice(0, 500)}
Return JSON: { "suggestions": ["...", "...", "..."] }`,

  slug: (postTitle: string, focusKeyword: string) =>
    `Generate a clean SEO-friendly URL slug (lowercase, hyphens only).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Return JSON: { "slug": "your-slug-here" }`,

  faq: (postTitle: string, focusKeyword: string, content: string) =>
    `Generate 4-6 FAQ questions and answers for this blog post.
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content summary: ${content.slice(0, 1500)}
Return JSON: { "faqs": [{"question":"...","answer":"..."}] }`,

  altText: (imageContext: string, focusKeyword: string) =>
    `Generate descriptive image alt text for SEO and accessibility.
Image context: ${imageContext}
Focus keyword: ${focusKeyword}
Return JSON: { "altText": "..." }`,

  socialCaptions: (postTitle: string, excerptOrContent: string) =>
    `Generate social media captions for this blog post.
Post title: ${postTitle}
Content: ${excerptOrContent.slice(0, 800)}
Return JSON: { "linkedin": "...", "twitter": "...", "facebook": "..." }`,

  contentBrief: (topic: string, focusKeyword: string, audience: string) =>
    `Create a comprehensive SEO content brief.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Audience: ${audience}
Return JSON: { "targetAudience": "...", "searchIntent": "...", "primaryKeyword": "...", "secondaryKeywords": ["..."], "contentAngle": "...", "recommendedWordCount": 1500, "outline": [{"heading":"H2","subheadings":["H3"]}], "competitorAngles": ["..."], "ctaSuggestion": "..." }`,

  searchIntent: (topic: string, focusKeyword: string) =>
    `Detect the primary search intent for this topic and keyword.
Topic: ${topic}
Focus keyword: ${focusKeyword}
Return JSON: { "intent": "informational|commercial|transactional|navigational", "confidence": "high|medium|low", "reasoning": "..." }`,

  cta: (postTitle: string, focusKeyword: string, excerptOrContent: string) =>
    `Generate 3 compelling call-to-action suggestions for this blog post.
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content: ${excerptOrContent.slice(0, 500)}
Return JSON: { "suggestions": ["...", "...", "..."] }`,

  improveReadability: (content: string, focusKeyword: string) =>
    `Improve the readability of this content while preserving SEO value and the focus keyword.
Focus keyword: ${focusKeyword}
Content: ${content.slice(0, 3000)}
Return JSON: { "improvedText": "...", "changesSummary": "..." }`,

  excerpt: (postTitle: string, focusKeyword: string, content: string) =>
    `Generate 3 compelling blog post excerpts (120-160 chars each).
Post title: ${postTitle}
Focus keyword: ${focusKeyword}
Content: ${content.slice(0, 1500)}
Return JSON: { "excerpts": ["...", "...", "..."] }`,
}
