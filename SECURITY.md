# Security — SEO Builder

SEO Builder is a self-hosted product. You are responsible for securing deployment, secrets, and admin access.

## Package boundaries

| Package | Sensitive data |
|---------|----------------|
| `@seo-builder/core` | AI keys read from `process.env` only |
| `@seo-builder/next` | Route handlers; no secrets in responses |
| `@seo-builder/payload-plugin` | Admin auth via Payload |
| `@seo-builder/ui` | Public components only |

Never commit `.env`, API keys, or `PAYLOAD_SECRET`.

## Admin access

- Dashboard at `/seo-admin` (configurable via plugin)
- Protected by Payload authentication
- Use HTTPS in production
- Limit team accounts in production

## API routes (`/api/seo-builder/*`)

Implemented in `packages/next` with utilities from `packages/core/src/rate-limit.ts`.

- **Rate limiting:** 30 requests / 15 minutes / IP (in-memory)
- **Validation:** Zod on all POST bodies; invalid input → `400`
- **Missing AI keys:** `503` with `AI_PROVIDER_MISSING_KEY` — no stack traces
- **`provider-info`:** Returns provider name and model only

### Public exposure

By default, anyone who can reach your server can call AI routes within rate limits. Add authentication middleware or reverse-proxy restrictions if needed.

## Self-host responsibilities

- Keep Node.js and dependencies updated
- Use managed Postgres with backups
- Enable TLS/HTTPS
- Monitor unusual API usage
- Consider IP allowlisting for `/seo-admin` on internal deployments

## Rate limiting at scale

Default limiter is **in-memory** per server instance. Multi-instance deployments do not share limits.

**Future:** Redis-backed rate limiting (see [PACKAGE_ROADMAP.md](./PACKAGE_ROADMAP.md)).

## AI provider data

Content sent to AI endpoints is transmitted to your configured provider (Google, OpenAI, Anthropic, etc.). Review provider privacy policies.

## Reporting issues

Report security issues privately to the repository maintainer rather than public issues with exploit details.
