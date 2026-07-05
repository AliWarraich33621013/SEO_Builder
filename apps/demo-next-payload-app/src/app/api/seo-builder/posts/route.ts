import config from '@payload-config'
import { createPostsHandler } from '@seo-builder/next'

export const GET = createPostsHandler(config)
