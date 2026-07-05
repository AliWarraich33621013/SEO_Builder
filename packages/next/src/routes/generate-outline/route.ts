import { generateOutline } from '@seo-builder/core/ai'
import { parseBody, generateOutlineSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateOutlineSchema)
  return withAiRoute(request, 'generate-outline', async () => {
    const result = await generateOutline(
      body.topic,
      body.focusKeyword,
      body.audience || 'general audience',
      body.searchIntent || 'informational',
    )
    return { ...result, data: result.data }
  })
}
