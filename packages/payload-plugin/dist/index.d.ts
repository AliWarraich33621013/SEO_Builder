import { CollectionConfig, GlobalConfig, Plugin } from 'payload';
import { SeoBuilderPluginOptions } from '@seo-builder/core/config';
export { SeoBuilderPluginOptions } from '@seo-builder/core/config';

declare const Authors: CollectionConfig;

declare const Categories: CollectionConfig;

declare const Media: CollectionConfig;

declare const Posts: CollectionConfig;

declare const Tags: CollectionConfig;

declare const SiteSettings: GlobalConfig;

declare function seoBuilderPlugin(options?: SeoBuilderPluginOptions): Plugin;

export { Authors, Categories, Media, Posts, SiteSettings, Tags, seoBuilderPlugin };
