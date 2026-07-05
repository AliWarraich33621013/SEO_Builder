// src/config/defaults.ts
var defaultSeoBuilderConfig = {
  site: {
    name: "SEO Builder",
    url: "http://localhost:3000",
    blogPath: "/blog",
    adminPath: "/seo-admin",
    defaultLocale: "en"
  },
  branding: {
    logoText: "SEO Builder",
    logoUrl: "",
    primaryColor: "#2563eb",
    secondaryColor: "#111827",
    backgroundColor: "#ffffff",
    textColor: "#111827",
    mutedTextColor: "#6b7280",
    borderColor: "#e5e7eb",
    borderRadius: "14px",
    fontFamily: "Inter, sans-serif"
  },
  blog: {
    template: "default",
    layout: "grid",
    postsPerPage: 9,
    showAuthor: true,
    showReadingTime: true,
    showTableOfContents: true,
    showRelatedPosts: true,
    showFaq: true,
    showBreadcrumbs: true
  },
  cta: {
    enabled: true,
    title: "Ready to grow your organic traffic?",
    description: "Use SEO Builder to publish optimized blog content faster.",
    buttonText: "Get Started",
    buttonUrl: "/contact"
  },
  ai: {
    defaultProvider: "groq"
  },
  seo: {
    defaultMetaTitle: "SEO Builder Blog",
    defaultMetaDescription: "AI-powered SEO blog system.",
    defaultOgImage: "",
    enableIndexing: true
  }
};

// src/config/merge.ts
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function deepMerge(base, partial) {
  if (!partial) return base;
  const result = { ...base };
  for (const key of Object.keys(partial)) {
    const value = partial[key];
    if (value === void 0) continue;
    const baseValue = base[key];
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      result[key] = deepMerge(baseValue, value);
    } else {
      result[key] = value;
    }
  }
  return result;
}
function resolveSeoBuilderConfig(partial) {
  return deepMerge(defaultSeoBuilderConfig, partial);
}

export {
  defaultSeoBuilderConfig,
  resolveSeoBuilderConfig
};
//# sourceMappingURL=chunk-COMPWLC5.js.map