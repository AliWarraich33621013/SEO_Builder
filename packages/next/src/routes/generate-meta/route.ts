import { generateMetaDescriptions, generateMetaTitles } from '@seo-builder/core/ai'
import { parseBody, generateMetaSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateMetaSchema)
  return withAiRoute(request, 'generate-meta', async () => {
    if (body.type === 'description') {
      const result = await generateMetaDescriptions(
        body.postTitle,
        body.focusKeyword,
        body.excerpt || body.content || '',
      )
      return { ...result, data: { suggestions: result.data } }
    }
    const result = await generateMetaTitles(body.postTitle, body.focusKeyword)
    return { ...result, data: { suggestions: result.data } }
  })
}
