# AI Providers — SEO Builder

SEO Builder supports multiple AI providers through `@seo-builder/core`. Set `AI_PROVIDER` and the matching API key in `.env`.

## Supported providers

| Provider | `AI_PROVIDER` | Key env var | Default model env |
|----------|---------------|-------------|-------------------|
| Google Gemini | `gemini` | `GEMINI_API_KEY` | `GEMINI_MODEL` |
| OpenAI | `openai` | `OPENAI_API_KEY` | `OPENAI_MODEL` |
| Groq | `groq` | `GROQ_API_KEY` | `GROQ_MODEL` |
| Anthropic Claude | `claude` | `ANTHROPIC_API_KEY` | `ANTHROPIC_MODEL` |
| Custom OpenAI-compatible | `custom` | `CUSTOM_AI_API_KEY` | `CUSTOM_AI_MODEL` |

**Default:** `gemini` with `gemini-1.5-flash`.

## Example `.env`

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your-key-here
GEMINI_MODEL=gemini-1.5-flash

# Optional alternates
# AI_PROVIDER=openai
# OPENAI_API_KEY=sk-...
# OPENAI_MODEL=gpt-4o-mini
```

## Verify provider

```bash
curl http://localhost:3000/api/seo-builder/provider-info
```

Response:

```json
{
  "success": true,
  "data": {
    "provider": "gemini",
    "providerLabel": "Google Gemini",
    "model": "gemini-1.5-flash"
  }
}
```

## Admin UI

The AI Assistant tab in Blog Manager shows the active provider badge from this endpoint.

## Error handling

| Code | Meaning | Action |
|------|---------|--------|
| `503` + `AI_PROVIDER_MISSING_KEY` | No API key for selected provider | Set the key in `.env` |
| `403` (Gemini) | API key denied or region restricted | Enable Generative Language API; check billing |
| `400` | Invalid request body | Check Zod validation errors in response |
| `429` | Rate limit exceeded | Wait 15 minutes (in-memory limit: 30 req / 15 min / IP) |

Gemini 403 responses include a user-friendly message — see `packages/core/src/ai/providers/gemini-errors.ts`.

## Custom OpenAI-compatible endpoint

```env
AI_PROVIDER=custom
CUSTOM_AI_API_KEY=your-key
CUSTOM_AI_BASE_URL=https://your-host/v1
CUSTOM_AI_MODEL=your-model-name
```

## Data privacy

Content sent to AI endpoints (titles, body, keywords) is transmitted to your configured provider. Review provider data policies before production use.

See [API_REFERENCE.md](./API_REFERENCE.md) for all endpoints.
