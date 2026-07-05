import { generateMetaDescriptions } from '@seo-builder/core/ai'
import { parseBody, generateMetaDescriptionSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateMetaDescriptionSchema)
  return withAiRoute(request, 'generate-meta-description', async () => {
    const result = await generateMetaDescriptions(
      body.postTitle,
      body.focusKeyword,
      body.excerpt || body.content || '',
    )
    return { ...result, data: { suggestions: result.data } }
  })
}
