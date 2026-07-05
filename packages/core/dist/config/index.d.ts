type SeoBuilderSiteConfig = {
    name: string;
    url: string;
    blogPath: string;
    adminPath: string;
    defaultLocale: string;
};
type SeoBuilderBrandingConfig = {
    logoText: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    mutedTextColor: string;
    borderColor: string;
    borderRadius: string;
    fontFamily: string;
};
type SeoBuilderBlogConfig = {
    template: string;
    layout: 'grid' | 'list';
    postsPerPage: number;
    showAuthor: boolean;
    showReadingTime: boolean;
    showTableOfContents: boolean;
    showRelatedPosts: boolean;
    showFaq: boolean;
    showBreadcrumbs: boolean;
};
type SeoBuilderCtaConfig = {
    enabled: boolean;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
};
type SeoBuilderAiConfig = {
    defaultProvider: 'gemini' | 'openai' | 'groq' | 'claude' | 'custom';
};
type SeoBuilderSeoDefaultsConfig = {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultOgImage: string;
    enableIndexing: boolean;
};
type SeoBuilderConfig = {
    site: SeoBuilderSiteConfig;
    branding: SeoBuilderBrandingConfig;
    blog: SeoBuilderBlogConfig;
    cta: SeoBuilderCtaConfig;
    ai: SeoBuilderAiConfig;
    seo: SeoBuilderSeoDefaultsConfig;
};
type SeoBuilderPluginOptions = {
    blogPath?: string;
    adminPath?: string;
    brandName?: string;
    collections?: {
        posts?: boolean;
        categories?: boolean;
        tags?: boolean;
        authors?: boolean;
        media?: boolean;
    };
    aiAssistant?: boolean;
};

declare const defaultSeoBuilderConfig: SeoBuilderConfig;

declare function resolveSeoBuilderConfig(partial?: Partial<SeoBuilderConfig>): SeoBuilderConfig;

export { type SeoBuilderAiConfig, type SeoBuilderBlogConfig, type SeoBuilderBrandingConfig, type SeoBuilderConfig, type SeoBuilderCtaConfig, type SeoBuilderPluginOptions, type SeoBuilderSeoDefaultsConfig, type SeoBuilderSiteConfig, defaultSeoBuilderConfig, resolveSeoBuilderConfig };
