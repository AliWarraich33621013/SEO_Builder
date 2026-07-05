import { generateFAQ } from '@seo-builder/core/ai'
import { parseBody, generateFaqSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateFaqSchema)
  return withAiRoute(request, 'generate-faq', async () => {
    const result = await generateFAQ(body.postTitle, body.focusKeyword, body.content || '')
    return { ...result, data: { faqs: result.data } }
  })
}
