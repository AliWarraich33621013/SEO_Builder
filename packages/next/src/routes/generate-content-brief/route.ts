import { generateContentBrief } from '@seo-builder/core/ai'
import { parseBody, generateContentBriefSchema } from '@seo-builder/core/ai'
import { withAiRoute } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, generateContentBriefSchema)
  return withAiRoute(request, 'generate-content-brief', async () => {
    const result = await generateContentBrief(
      body.topic,
      body.focusKeyword,
      body.audience || 'general audience',
    )
    return { ...result, data: result.data }
  })
}
