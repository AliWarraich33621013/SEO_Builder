import { generateSlug } from '@seo-builder/core/ai'
import { parseBody, generateSlugSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateSlugSchema)
  return withAiRoute(request, 'generate-slug', async () => {
    const result = await generateSlug(body.postTitle, body.focusKeyword || '')
    return { ...result, data: { slug: result.data } }
  })
}
