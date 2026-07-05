import { calculateSeoScore, type PostForSeo, type SiteSettingsForSeo } from '@seo-builder/core/seo'
import { parseBody } from '@seo-builder/core/ai'
import { seoScoreSchema } from '@seo-builder/core/validation'
import { withAiRouteSimple } from '../../route-handler'

export async function POST(request: Request) {
  const body = await parseBody(request, seoScoreSchema)
  return withAiRouteSimple(request, 'seo-score', async () => {
    const post = (body.post ?? body) as PostForSeo
    const siteSettings = body.siteSettings as SiteSettingsForSeo | undefined
    return calculateSeoScore(post, siteSettings)
  })
}
