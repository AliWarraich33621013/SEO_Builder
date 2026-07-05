import { Metadata } from 'next';

type SeoCheckItem = {
    id: string;
    label: string;
    passed: boolean;
    message?: string;
};
type SeoGrade = 'A' | 'B' | 'C' | 'D' | 'F';
type SeoScoreResult = {
    score: number;
    grade: SeoGrade;
    passed: SeoCheckItem[];
    failed: SeoCheckItem[];
    suggestions: string[];
};
type PostForSeo = {
    title?: string | null;
    slug?: string | null;
    excerpt?: string | null;
    content?: unknown;
    status?: string | null;
    publishedAt?: string | null;
    focusKeyword?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalUrl?: string | null;
    noindex?: boolean | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: unknown;
    featuredImage?: unknown;
    author?: unknown;
    faqItems?: {
        question?: string | null;
        answer?: string | null;
    }[] | null;
};
type SiteSettingsForSeo = {
    siteUrl?: string | null;
    blogPath?: string | null;
};

declare function scoreToGrade(score: number): SeoGrade;
declare function calculateSeoScore(post: PostForSeo, siteSettings?: SiteSettingsForSeo): SeoScoreResult;

type SiteSettingsMeta = {
    siteName?: string | null;
    siteUrl?: string | null;
    blogPath?: string | null;
    defaultMetaTitle?: string | null;
    defaultMetaDescription?: string | null;
    defaultOgImage?: unknown;
};
declare function buildCanonicalUrl(path: string, siteSettings?: SiteSettingsMeta): string;
declare function generateBlogMetadata(siteSettings?: SiteSettingsMeta): Metadata;
declare function generatePostMetadata(post: PostForSeo & {
    slug?: string | null;
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogImage?: unknown;
    noindex?: boolean | null;
    nofollow?: boolean | null;
}, siteSettings?: SiteSettingsMeta): Metadata;

type PostWithRelations = PostForSeo & {
    slug?: string | null;
    excerpt?: string | null;
    updatedAt?: string | null;
    publishedAt?: string | null;
    featuredImage?: unknown;
    author?: unknown;
    categories?: unknown;
};
type SiteSettingsSchema = SiteSettingsForSeo & {
    siteName?: string | null;
    organizationName?: string | null;
    organizationLogo?: unknown;
    blogPath?: string | null;
};
declare function generateArticleSchema(post: PostWithRelations, siteSettings?: SiteSettingsSchema): {
    '@context': string;
    '@type': string;
    headline: string | null | undefined;
    description: string | null | undefined;
    image: string[] | undefined;
    datePublished: string | null | undefined;
    dateModified: string | null | undefined;
    author: {
        '@type': string;
        name: {};
    } | undefined;
    publisher: {
        '@type': string;
        name: string;
        logo: {
            '@type': string;
            url: string | undefined;
        } | undefined;
    } | undefined;
    mainEntityOfPage: {
        '@type': string;
        '@id': string;
    };
};
declare function generateFAQSchema(post: PostForSeo & {
    faqItems?: {
        question?: string | null;
        answer?: string | null;
    }[] | null;
}): {
    '@context': string;
    '@type': string;
    mainEntity: {
        '@type': string;
        name: string | null | undefined;
        acceptedAnswer: {
            '@type': string;
            text: string | null | undefined;
        };
    }[];
} | null;
declare function generateBreadcrumbSchema(post: PostWithRelations, siteSettings?: SiteSettingsSchema): {
    '@context': string;
    '@type': string;
    itemListElement: {
        '@type': string;
        position: number;
        name: string;
        item: string;
    }[];
};

export { type PostForSeo, type SeoCheckItem, type SeoGrade, type SeoScoreResult, type SiteSettingsForSeo, type SiteSettingsMeta, buildCanonicalUrl, calculateSeoScore, generateArticleSchema, generateBlogMetadata, generateBreadcrumbSchema, generateFAQSchema, generatePostMetadata, scoreToGrade };
