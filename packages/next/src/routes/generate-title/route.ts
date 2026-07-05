import { generateTitles } from '@seo-builder/core/ai'
import { parseBody, generateTitleSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateTitleSchema)
  return withAiRoute(request, 'generate-title', async () => {
    const result = await generateTitles(body.topic, body.focusKeyword, body.audience || 'general audience')
    return { ...result, data: { titles: result.data } }
  })
}
