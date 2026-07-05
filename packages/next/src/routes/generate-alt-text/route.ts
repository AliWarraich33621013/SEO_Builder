import { generateAltText } from '@seo-builder/core/ai'
import { parseBody, generateAltTextSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateAltTextSchema)
  return withAiRoute(request, 'generate-alt-text', async () => {
    const result = await generateAltText(body.imageContext, body.focusKeyword || '')
    return { ...result, data: { altText: result.data } }
  })
}
