import { generateCta } from '@seo-builder/core/ai'
import { parseBody, generateCtaSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateCtaSchema)
  return withAiRoute(request, 'generate-cta', async () => {
    const result = await generateCta(
      body.postTitle,
      body.focusKeyword,
      body.excerpt || body.content || '',
    )
    return { ...result, data: { suggestions: result.data } }
  })
}
