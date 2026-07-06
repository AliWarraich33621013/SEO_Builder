import * as payload from 'payload';
import { Config, SanitizedConfig } from 'payload';
export { withAiRoute, withAiRouteSimple } from './route-handler.js';
export { createSitemap } from './sitemap.js';
export { createRobots } from './robots.js';
import * as next_server from 'next/server';
export { POST as generateTitlePOST } from './routes/generate-title/route.js';
export { POST as generateOutlinePOST } from './routes/generate-outline/route.js';
export { POST as generateMetaTitlePOST } from './routes/generate-meta-title/route.js';
export { POST as generateMetaDescriptionPOST } from './routes/generate-meta-description/route.js';
export { POST as generateMetaPOST } from './routes/generate-meta/route.js';
export { POST as generateSlugPOST } from './routes/generate-slug/route.js';
export { POST as generateFaqPOST } from './routes/generate-faq/route.js';
export { POST as generateExcerptPOST } from './routes/generate-excerpt/route.js';
export { POST as generateAltTextPOST } from './routes/generate-alt-text/route.js';
export { POST as generateSocialCaptionsPOST, POST as generateSocialPOST } from './routes/generate-social-captions/route.js';
export { POST as generateContentBriefPOST } from './routes/generate-content-brief/route.js';
export { POST as detectSearchIntentPOST } from './routes/detect-search-intent/route.js';
export { POST as generateCtaPOST } from './routes/generate-cta/route.js';
export { POST as improveReadabilityPOST } from './routes/improve-readability/route.js';
export { POST as seoScorePOST } from './routes/seo-score/route.js';
export { GET as providerInfoGET } from './routes/provider-info/route.js';
import '@seo-builder/core/ai';
import 'next';
import '@seo-builder/core/config';
import '@seo-builder/core';

declare const POSTS_PER_PAGE = 12;
type PayloadConfigInput$1 = Config | SanitizedConfig | Promise<SanitizedConfig>;
declare function createQueryHelpers(payloadConfig: PayloadConfigInput$1): {
    POSTS_PER_PAGE: number;
    getPayloadClient: () => Promise<payload.BasePayload>;
    getSiteSettings: () => Promise<payload.JsonObject>;
    getPublishedPosts: (options?: {
        page?: number;
        limit?: number;
        categorySlug?: string;
        tagSlug?: string;
        authorSlug?: string;
    }) => Promise<payload.PaginatedDocs<payload.JsonObject & payload.TypeWithID>>;
    getPostBySlug: (slug: string) => Promise<payload.JsonObject & payload.TypeWithID>;
    getRelatedPosts: (postId: string, categoryIds: string[], limit?: number) => Promise<(payload.JsonObject & payload.TypeWithID)[]>;
    getCategoryBySlug: (slug: string) => Promise<payload.JsonObject & payload.TypeWithID>;
    getTagBySlug: (slug: string) => Promise<payload.JsonObject & payload.TypeWithID>;
    getAuthorBySlug: (slug: string) => Promise<payload.JsonObject & payload.TypeWithID>;
    getAllCategories: () => Promise<payload.PaginatedDocs<payload.JsonObject & payload.TypeWithID>>;
    getAllTags: () => Promise<payload.PaginatedDocs<payload.JsonObject & payload.TypeWithID>>;
    getAllAuthors: () => Promise<payload.PaginatedDocs<payload.JsonObject & payload.TypeWithID>>;
    getAllPublishedPostSlugs: () => Promise<payload.PaginatedDocs<{
        slug: unknown;
        updatedAt: unknown;
        id: string | number;
    }>>;
};
type QueryHelpers = ReturnType<typeof createQueryHelpers>;

type PayloadConfigInput = Config | SanitizedConfig | Promise<SanitizedConfig>;
declare function createPostsHandler(payloadConfig: PayloadConfigInput): (request: Request) => Promise<next_server.NextResponse<{
    success: false;
    error: {
        code: string;
        message: string;
    };
}> | next_server.NextResponse<{
    success: true;
    provider: string | undefined;
    model: string | undefined;
    data: {
        posts: (payload.JsonObject & payload.TypeWithID)[];
        totalDocs: number;
        totalPages: number;
        page: number | undefined;
    };
}>>;

export { POSTS_PER_PAGE, type QueryHelpers, createPostsHandler, createQueryHelpers };
