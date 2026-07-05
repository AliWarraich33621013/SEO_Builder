import { MetadataRoute } from 'next';
import { Config, SanitizedConfig } from 'payload';
import { SeoBuilderConfig } from '@seo-builder/core/config';

type PayloadConfigInput = Config | SanitizedConfig | Promise<SanitizedConfig>;
declare function createSitemap(payloadConfig: PayloadConfigInput, seoConfig?: SeoBuilderConfig): () => Promise<MetadataRoute.Sitemap>;

export { createSitemap };
