import { generateMetaTitles } from '@seo-builder/core/ai'
import { parseBody, generateMetaTitleSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateMetaTitleSchema)
  return withAiRoute(request, 'generate-meta-title', async () => {
    const result = await generateMetaTitles(body.postTitle, body.focusKeyword)
    return { ...result, data: { suggestions: result.data } }
  })
}
