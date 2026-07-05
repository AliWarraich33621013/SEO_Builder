import {
  createQueryHelpers
} from "./chunk-3SRILUZC.js";

// src/robots.ts
import { buildCanonicalUrl } from "@seo-builder/core/seo";
function createRobots(payloadConfig, seoConfig) {
  const queries = createQueryHelpers(payloadConfig);
  return async function robots() {
    const siteSettings = await queries.getSiteSettings();
    const baseUrl = seoConfig?.site.url || siteSettings.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const adminPath = seoConfig?.site.adminPath || "/seo-admin";
    const indexingEnabled = seoConfig?.seo.enableIndexing !== false && siteSettings.robotsIndexingEnabled !== false;
    if (!indexingEnabled) {
      return {
        rules: {
          userAgent: "*",
          disallow: "/"
        }
      };
    }
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: [`${adminPath}/`, "/api/"]
        }
      ],
      sitemap: buildCanonicalUrl("/sitemap.xml", { siteUrl: baseUrl })
    };
  };
}

export {
  createRobots
};
//# sourceMappingURL=chunk-FVPJFQYV.js.map