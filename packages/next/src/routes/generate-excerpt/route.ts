import { generateExcerpt } from '@seo-builder/core/ai'
import { parseBody, generateExcerptSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateExcerptSchema)
  return withAiRoute(request, 'generate-excerpt', async () => {
    const result = await generateExcerpt(
      body.postTitle,
      body.focusKeyword,
      body.content || '',
    )
    return { ...result, data: { excerpts: result.data } }
  })
}
