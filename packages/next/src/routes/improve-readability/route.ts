import { improveReadability } from '@seo-builder/core/ai'
import { parseBody, improveReadabilitySchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, improveReadabilitySchema)
  return withAiRoute(request, 'improve-readability', async () => {
    const result = await improveReadability(body.content, body.focusKeyword || '')
    return { ...result, data: result.data }
  })
}
