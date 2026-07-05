import { generateSocialCaptions } from '@seo-builder/core/ai'
import { parseBody, generateSocialSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateSocialSchema)
  return withAiRoute(request, 'generate-social-captions', async () => {
    const result = await generateSocialCaptions(body.postTitle, body.excerpt || body.content || '')
    return { ...result, data: result.data }
  })
}
