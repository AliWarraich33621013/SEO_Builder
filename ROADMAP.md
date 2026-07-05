# SEO Builder Roadmap

## Version 1 (MVP) — Done

- [x] Payload blog system (Posts, Categories, Tags, Authors, Media)
- [x] SEO fields on every post
- [x] AI metadata generation endpoints
- [x] AI outline generation
- [x] AI FAQ generation
- [x] SEO checklist and score
- [x] Sitemap, robots, and JSON-LD schema
- [x] Public blog pages
- [x] Branded SEO Builder Dashboard (`/seo-admin`)

## Version 2 (Production AI) — Done

- [x] Multi-provider AI architecture (Gemini default, OpenAI, Groq, Claude, custom)
- [x] Zod validation and structured API errors on all AI routes
- [x] In-memory rate limiting on `/api/seo-builder/*`
- [x] SEO score grade (A–F) plus excerpt, OG, and content-length checks
- [x] Admin AI Assistant panel (Posts → AI Assistant tab)
- [x] New endpoints: meta title/description split, content brief, search intent, CTA, readability, excerpt, provider-info
- [x] DEPLOYMENT.md, SECURITY.md, updated README and `.env.example`
- [x] Vitest unit tests for config, errors, SEO score, schema, metadata

## Version 2.5 (Next)

- Internal linking suggestions
- Content refresh suggestions
- Redirect manager
- Redis-backed rate limiting for multi-instance deploys

## Version 3

- Google Search Console integration
- Keyword tracking
- Content gap finder
- Topical map builder
- Internal linking engine
- Agency dashboard
- White-label reports
- Client license system
- npm package extraction (`src/lib/seo`, `src/lib/ai`, collection configs)
