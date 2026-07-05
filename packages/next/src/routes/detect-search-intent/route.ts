import { detectSearchIntent } from '@seo-builder/core/ai'
import { parseBody, detectSearchIntentSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, detectSearchIntentSchema)
  return withAiRoute(request, 'detect-search-intent', async () => {
    const result = await detectSearchIntent(body.topic, body.focusKeyword)
    return { ...result, data: result.data }
  })
}
