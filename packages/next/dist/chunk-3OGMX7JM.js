import {
  createQueryHelpers
} from "./chunk-3SRILUZC.js";

// src/sitemap.ts
import { buildCanonicalUrl } from "@seo-builder/core/seo";
function createSitemap(payloadConfig, seoConfig) {
  const queries = createQueryHelpers(payloadConfig);
  return async function sitemap() {
    const siteSettings = await queries.getSiteSettings();
    const blogPath = seoConfig?.site.blogPath || siteSettings.blogPath || "/blog";
    const baseUrl = seoConfig?.site.url || siteSettings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const [posts, categories, tags, authors] = await Promise.all([
      queries.getAllPublishedPostSlugs(),
      queries.getAllCategories(),
      queries.getAllTags(),
      queries.getAllAuthors()
    ]);
    const staticRoutes = [
      {
        url: buildCanonicalUrl("/", { siteUrl: baseUrl }),
        changeFrequency: "weekly",
        priority: 1
      },
      {
        url: buildCanonicalUrl(blogPath, { siteUrl: baseUrl }),
        changeFrequency: "daily",
        priority: 0.9
      }
    ];
    const postRoutes = posts.docs.map((post) => {
      const slug = String(post.slug ?? "");
      return {
        url: buildCanonicalUrl(`${blogPath}/${slug}`, { siteUrl: baseUrl }),
        lastModified: post.updatedAt ? new Date(String(post.updatedAt)) : void 0,
        changeFrequency: "weekly",
        priority: 0.8
      };
    });
    const categoryRoutes = categories.docs.map((cat) => ({
      url: buildCanonicalUrl(`${blogPath}/category/${String(cat.slug ?? "")}`, { siteUrl: baseUrl }),
      changeFrequency: "weekly",
      priority: 0.6
    }));
    const tagRoutes = tags.docs.map((tag) => ({
      url: buildCanonicalUrl(`${blogPath}/tag/${String(tag.slug ?? "")}`, { siteUrl: baseUrl }),
      changeFrequency: "weekly",
      priority: 0.5
    }));
    const authorRoutes = authors.docs.map((author) => ({
      url: buildCanonicalUrl(`${blogPath}/author/${String(author.slug ?? "")}`, { siteUrl: baseUrl }),
      changeFrequency: "monthly",
      priority: 0.5
    }));
    return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes, ...authorRoutes];
  };
}

export {
  createSitemap
};
//# sourceMappingURL=chunk-3OGMX7JM.js.map