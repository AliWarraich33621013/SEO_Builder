// src/seo/score.ts
var TOTAL_CHECKS = 20;
var CHECK_WEIGHT = Math.floor(100 / TOTAL_CHECKS);
function extractTextFromContent(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  try {
    const json = typeof content === "object" ? content : JSON.parse(String(content));
    const texts = [];
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      const n = node;
      if (typeof n.text === "string") texts.push(n.text);
      if (Array.isArray(n.children)) n.children.forEach(walk);
      if (Array.isArray(n.root)) n.root.forEach(walk);
      if (n.root && typeof n.root === "object") walk(n.root);
    };
    walk(json);
    return texts.join(" ");
  } catch {
    return "";
  }
}
function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
function countH1InContent(content) {
  const text = extractTextFromContent(content);
  const h1Matches = text.match(/<h1[^>]*>/gi);
  return h1Matches?.length ?? 0;
}
function hasInternalLinks(content, siteUrl) {
  const text = extractTextFromContent(content);
  if (text.includes('href="/') || text.includes("href='/")) return true;
  if (siteUrl && text.includes(siteUrl)) return true;
  return /href=["']https?:\/\/[^"']+["']/.test(text);
}
function isCleanSlug(slug) {
  if (!slug) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
function keywordInText(keyword, ...texts) {
  if (!keyword) return false;
  const lower = keyword.toLowerCase();
  return texts.some((t) => t?.toLowerCase().includes(lower));
}
function buildCanonical(path, settings) {
  const base = (settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
  const blogPath = settings?.blogPath || "/blog";
  return `${base}${blogPath}/${path}`.replace(/([^:]\/)\/+/g, "$1");
}
function scoreToGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}
function calculateSeoScore(post, siteSettings) {
  const checks = [];
  const suggestions = [];
  const addCheck = (id, label, passed2, message, suggestion) => {
    checks.push({ id, label, passed: passed2, message });
    if (!passed2 && suggestion) suggestions.push(suggestion);
  };
  const metaTitle = post.metaTitle || post.title;
  addCheck(
    "meta-title-exists",
    "Meta title exists",
    Boolean(metaTitle?.trim()),
    void 0,
    "Add a meta title between 30\u201360 characters."
  );
  const metaTitleLen = metaTitle?.length ?? 0;
  addCheck(
    "meta-title-length",
    "Meta title length is reasonable",
    metaTitleLen >= 30 && metaTitleLen <= 60,
    `Current length: ${metaTitleLen}`,
    "Aim for 30\u201360 characters in the meta title."
  );
  addCheck(
    "meta-description-exists",
    "Meta description exists",
    Boolean(post.metaDescription?.trim()),
    void 0,
    "Write a compelling meta description."
  );
  const metaDescLen = post.metaDescription?.length ?? 0;
  addCheck(
    "meta-description-length",
    "Meta description length is reasonable",
    metaDescLen >= 120 && metaDescLen <= 160,
    `Current length: ${metaDescLen}`,
    "Aim for 120\u2013160 characters in the meta description."
  );
  addCheck(
    "slug-clean",
    "Slug exists and is clean",
    isCleanSlug(post.slug),
    post.slug || "Missing slug",
    "Use lowercase letters, numbers, and hyphens only."
  );
  addCheck(
    "focus-keyword",
    "Focus keyword exists",
    Boolean(post.focusKeyword?.trim()),
    void 0,
    "Set a primary focus keyword for this post."
  );
  addCheck(
    "keyword-in-title",
    "Focus keyword in title or meta title",
    keywordInText(post.focusKeyword, post.title, post.metaTitle),
    void 0,
    "Include the focus keyword in the title or meta title."
  );
  const canonical = post.canonicalUrl || (post.slug ? buildCanonical(post.slug, siteSettings) : "");
  addCheck(
    "canonical-url",
    "Canonical URL exists or can be generated",
    Boolean(canonical),
    void 0,
    "Set a canonical URL or ensure slug is present."
  );
  const accidentalNoindex = post.status === "published" && post.noindex === true;
  addCheck(
    "noindex-check",
    "No accidental noindex on published post",
    !accidentalNoindex,
    accidentalNoindex ? "Published post has noindex enabled" : void 0,
    "Remove noindex for published posts you want indexed."
  );
  const hasFeaturedImage = Boolean(post.featuredImage);
  addCheck(
    "featured-image",
    "Featured image exists",
    hasFeaturedImage,
    void 0,
    "Add a featured image for better social sharing and CTR."
  );
  const featuredAlt = typeof post.featuredImage === "object" && post.featuredImage !== null && "alt" in post.featuredImage ? post.featuredImage.alt : null;
  addCheck(
    "featured-image-alt",
    "Featured image alt text exists",
    !hasFeaturedImage || Boolean(featuredAlt?.trim()),
    void 0,
    "Add descriptive alt text to the featured image."
  );
  addCheck(
    "author-exists",
    "Author exists",
    Boolean(post.author),
    void 0,
    "Assign an author to build E-E-A-T signals."
  );
  addCheck(
    "published-date",
    "Published date exists",
    Boolean(post.publishedAt),
    void 0,
    "Set a published date for published posts."
  );
  const contentText = extractTextFromContent(post.content);
  addCheck(
    "content-exists",
    "Content exists",
    contentText.trim().length > 50,
    void 0,
    "Add substantial body content."
  );
  addCheck(
    "content-length",
    "Content length is substantial (300+ words)",
    wordCount(contentText) >= 300,
    `Current word count: ${wordCount(contentText)}`,
    "Aim for at least 300 words of quality content."
  );
  addCheck(
    "excerpt-exists",
    "Excerpt exists",
    Boolean(post.excerpt?.trim()),
    void 0,
    "Add a compelling excerpt for listings and social previews."
  );
  const hasOgTitle = Boolean(post.ogTitle?.trim() || post.metaTitle?.trim() || post.title?.trim());
  const hasOgDescription = Boolean(
    post.ogDescription?.trim() || post.metaDescription?.trim() || post.excerpt?.trim()
  );
  const hasOgImage = Boolean(post.ogImage || post.featuredImage);
  addCheck(
    "og-metadata",
    "Open Graph metadata is complete",
    hasOgTitle && hasOgDescription && hasOgImage,
    void 0,
    "Set OG title, description, and image (or use meta/featured fallbacks)."
  );
  addCheck(
    "faq-exists",
    "FAQ section exists",
    Boolean(post.faqItems && post.faqItems.length > 0),
    void 0,
    "Add FAQ items to target featured snippets."
  );
  addCheck(
    "internal-links",
    "Internal links detected",
    hasInternalLinks(post.content, siteSettings?.siteUrl),
    void 0,
    "Link to other relevant pages on your site."
  );
  const h1Count = countH1InContent(post.content);
  addCheck(
    "single-h1",
    "Only one H1 in content (if detectable)",
    h1Count <= 1,
    h1Count > 1 ? `Found ${h1Count} H1 tags` : void 0,
    "Use a single H1 per page."
  );
  addCheck(
    "article-schema",
    "Article schema can be generated",
    Boolean(post.title && post.slug && (post.publishedAt || post.status === "published")),
    void 0,
    "Ensure title, slug, and publish date are set."
  );
  const passed = checks.filter((c) => c.passed);
  const failed = checks.filter((c) => !c.passed);
  const score = Math.min(
    100,
    passed.length * CHECK_WEIGHT + (passed.length === checks.length ? 100 - CHECK_WEIGHT * checks.length : 0)
  );
  return {
    score,
    grade: scoreToGrade(score),
    passed,
    failed,
    suggestions
  };
}

// src/seo/metadata.ts
function pickImageUrl(v) {
  if (typeof v === "object" && v !== null && "url" in v) {
    const url = v.url;
    return url ?? void 0;
  }
  return void 0;
}
function buildCanonicalUrl(path, siteSettings) {
  const base = (siteSettings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
function generateBlogMetadata(siteSettings) {
  const title = siteSettings?.defaultMetaTitle || `${siteSettings?.siteName || "SEO Builder"} Blog`;
  const description = siteSettings?.defaultMetaDescription || "Read the latest articles and SEO insights.";
  const ogImage = pickImageUrl(siteSettings?.defaultOgImage);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...ogImage ? { images: [{ url: ogImage }] } : {}
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      ...ogImage ? { images: [ogImage] } : {}
    }
  };
}
function generatePostMetadata(post, siteSettings) {
  const blogPath = siteSettings?.blogPath || "/blog";
  const title = post.metaTitle || post.title || "Blog Post";
  const description = post.metaDescription || post.excerpt || "";
  const canonical = post.canonicalUrl || buildCanonicalUrl(`${blogPath}/${post.slug}`, siteSettings);
  const ogTitle = post.ogTitle || title;
  const ogDescription = post.ogDescription || description;
  const ogImage = pickImageUrl(post.ogImage) || pickImageUrl(post.featuredImage) || pickImageUrl(siteSettings?.defaultOgImage);
  return {
    title,
    description,
    alternates: {
      canonical
    },
    robots: {
      index: post.noindex ? false : true,
      follow: post.nofollow ? false : true
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "article",
      url: canonical,
      ...ogImage ? { images: [{ url: ogImage }] } : {}
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: ogTitle,
      description: ogDescription,
      ...ogImage ? { images: [ogImage] } : {}
    }
  };
}

// src/seo/schema.ts
function pickImageUrl2(v) {
  if (typeof v === "object" && v !== null && "url" in v) {
    const url = v.url;
    return url ?? void 0;
  }
  return void 0;
}
function generateArticleSchema(post, siteSettings) {
  const blogPath = siteSettings?.blogPath || "/blog";
  const url = buildCanonicalUrl(`${blogPath}/${post.slug}`, siteSettings);
  const authorName = typeof post.author === "object" && post.author && "name" in post.author ? post.author.name : siteSettings?.siteName;
  const imageUrl = pickImageUrl2(post.featuredImage);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: imageUrl ? [imageUrl] : void 0,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: authorName ? {
      "@type": "Person",
      name: authorName
    } : void 0,
    publisher: siteSettings?.organizationName ? {
      "@type": "Organization",
      name: siteSettings.organizationName,
      logo: pickImageUrl2(siteSettings.organizationLogo) ? {
        "@type": "ImageObject",
        url: pickImageUrl2(siteSettings.organizationLogo)
      } : void 0
    } : void 0,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };
}
function generateFAQSchema(post) {
  if (!post.faqItems?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqItems.filter((item) => item.question && item.answer).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
function generateBreadcrumbSchema(post, siteSettings) {
  const blogPath = siteSettings?.blogPath || "/blog";
  const siteName = siteSettings?.siteName || "Home";
  const postUrl = buildCanonicalUrl(`${blogPath}/${post.slug}`, siteSettings);
  const categories = Array.isArray(post.categories) ? post.categories : [];
  const category = categories.length > 0 ? categories[0] : null;
  const categoryName = typeof category === "object" && category !== null && "name" in category ? category.name : null;
  const categorySlug = typeof category === "object" && category !== null && "slug" in category ? category.slug : null;
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: siteName,
      item: buildCanonicalUrl("/", siteSettings)
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: buildCanonicalUrl(blogPath, siteSettings)
    }
  ];
  if (categoryName && categorySlug) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: categoryName,
      item: buildCanonicalUrl(`${blogPath}/category/${categorySlug}`, siteSettings)
    });
    items.push({
      "@type": "ListItem",
      position: 4,
      name: post.title || "Post",
      item: postUrl
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: post.title || "Post",
      item: postUrl
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  };
}

export {
  scoreToGrade,
  calculateSeoScore,
  buildCanonicalUrl,
  generateBlogMetadata,
  generatePostMetadata,
  generateArticleSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
};
//# sourceMappingURL=chunk-IVXRUDGV.js.map