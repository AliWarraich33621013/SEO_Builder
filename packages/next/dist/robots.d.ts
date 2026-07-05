import { MetadataRoute } from 'next';
import { Config, SanitizedConfig } from 'payload';
import { SeoBuilderConfig } from '@seo-builder/core/config';

type PayloadConfigInput = Config | SanitizedConfig | Promise<SanitizedConfig>;
declare function createRobots(payloadConfig: PayloadConfigInput, seoConfig?: SeoBuilderConfig): () => Promise<MetadataRoute.Robots>;

export { createRobots };
