// src/collections/Authors.ts
import { slugify } from "@seo-builder/core";
var Authors = {
  slug: "authors",
  labels: {
    singular: "Author",
    plural: "Authors"
  },
  admin: {
    useAsTitle: "name",
    group: "Blog Manager"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar"
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.name) return slugify(data.name);
            return value;
          }
        ]
      }
    },
    {
      name: "bio",
      type: "textarea"
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media"
    },
    {
      name: "jobTitle",
      type: "text",
      label: "Job Title"
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Links",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "Twitter / X", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Facebook", value: "facebook" },
            { label: "Website", value: "website" }
          ]
        },
        {
          name: "url",
          type: "text",
          required: true
        }
      ]
    }
  ]
};

// src/collections/Categories.ts
import { slugify as slugify2 } from "@seo-builder/core";
var Categories = {
  slug: "categories",
  labels: {
    singular: "Category",
    plural: "Categories"
  },
  admin: {
    useAsTitle: "name",
    group: "Blog Manager"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar"
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.name) return slugify2(data.name);
            return value;
          }
        ]
      }
    },
    {
      name: "description",
      type: "textarea"
    },
    {
      name: "metaTitle",
      type: "text",
      label: "Meta Title"
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Meta Description"
    }
  ]
};

// src/collections/Media.ts
var Media = {
  slug: "media",
  labels: {
    singular: "Media File",
    plural: "Media Library"
  },
  admin: {
    group: "Media Library"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text"
    }
  ],
  upload: true
};

// src/collections/Posts.ts
import { calculateSeoScore } from "@seo-builder/core/seo";
import { slugify as slugify3 } from "@seo-builder/core";
var Posts = {
  slug: "posts",
  labels: {
    singular: "Blog Post",
    plural: "Blog Manager"
  },
  admin: {
    useAsTitle: "title",
    group: "Blog Manager",
    defaultColumns: ["title", "status", "author", "publishedAt", "seoScore"]
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return {
        status: { equals: "published" }
      };
    }
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          return { ...data, slug: slugify3(data.title) };
        }
        return data;
      }
    ],
    beforeChange: [
      async ({ data, req }) => {
        let siteSettings;
        try {
          siteSettings = await req.payload.findGlobal({ slug: "site-settings" });
        } catch {
          siteSettings = void 0;
        }
        const scoreResult = calculateSeoScore(
          {
            title: data?.title,
            slug: data?.slug,
            excerpt: data?.excerpt,
            content: data?.content,
            status: data?.status,
            publishedAt: data?.publishedAt,
            focusKeyword: data?.focusKeyword,
            metaTitle: data?.metaTitle,
            metaDescription: data?.metaDescription,
            canonicalUrl: data?.canonicalUrl,
            noindex: data?.noindex,
            ogTitle: data?.ogTitle,
            ogDescription: data?.ogDescription,
            ogImage: data?.ogImage,
            featuredImage: data?.featuredImage,
            author: data?.author,
            faqItems: data?.faqItems
          },
          {
            siteUrl: siteSettings?.siteUrl,
            blogPath: siteSettings?.blogPath
          }
        );
        return {
          ...data,
          seoScore: scoreResult.score,
          seoChecklist: scoreResult
        };
      }
    ]
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "title",
              type: "text",
              required: true
            },
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              admin: { position: "sidebar" }
            },
            {
              name: "excerpt",
              type: "textarea"
            },
            {
              name: "content",
              type: "richText",
              required: true
            },
            {
              name: "featuredImage",
              type: "upload",
              relationTo: "media"
            },
            {
              name: "author",
              type: "relationship",
              relationTo: "authors"
            },
            {
              name: "categories",
              type: "relationship",
              relationTo: "categories",
              hasMany: true
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "tags",
              hasMany: true
            }
          ]
        },
        {
          label: "SEO",
          fields: [
            {
              name: "focusKeyword",
              type: "text",
              label: "Focus Keyword"
            },
            {
              name: "secondaryKeywords",
              type: "text",
              label: "Secondary Keywords",
              admin: { description: "Comma-separated keywords" }
            },
            {
              name: "metaTitle",
              type: "text",
              label: "Meta Title"
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Meta Description"
            },
            {
              name: "canonicalUrl",
              type: "text",
              label: "Canonical URL"
            },
            {
              name: "ogTitle",
              type: "text",
              label: "OG Title"
            },
            {
              name: "ogDescription",
              type: "textarea",
              label: "OG Description"
            },
            {
              name: "ogImage",
              type: "upload",
              relationTo: "media",
              label: "OG Image"
            },
            {
              name: "noindex",
              type: "checkbox",
              label: "Noindex",
              defaultValue: false
            },
            {
              name: "nofollow",
              type: "checkbox",
              label: "Nofollow",
              defaultValue: false
            },
            {
              name: "seoScore",
              type: "number",
              label: "SEO Score",
              admin: { readOnly: true, position: "sidebar" }
            },
            {
              name: "seoChecklist",
              type: "json",
              label: "SEO Checklist Result",
              admin: { readOnly: true }
            }
          ]
        },
        {
          label: "AI Assistant",
          fields: [
            {
              name: "aiAssistantPanel",
              type: "ui",
              admin: {
                components: {
                  Field: "@seo-builder/payload-plugin/components/admin/AiAssistantPanel#AiAssistantPanel"
                }
              }
            },
            {
              name: "aiSuggestions",
              type: "json",
              label: "AI Suggestions",
              admin: {
                description: 'Stored AI suggestions (use "Save suggestions" in the panel above).'
              }
            }
          ]
        },
        {
          label: "Publishing",
          fields: [
            {
              name: "status",
              type: "select",
              defaultValue: "draft",
              options: [
                { label: "Draft", value: "draft" },
                { label: "Scheduled", value: "scheduled" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" }
              ],
              admin: { position: "sidebar" }
            },
            {
              name: "publishedAt",
              type: "date",
              admin: {
                position: "sidebar",
                date: { pickerAppearance: "dayAndTime" }
              }
            },
            {
              name: "scheduledAt",
              type: "date",
              admin: {
                position: "sidebar",
                date: { pickerAppearance: "dayAndTime" }
              }
            }
          ]
        },
        {
          label: "Schema/Advanced",
          fields: [
            {
              name: "faqItems",
              type: "array",
              label: "FAQ Items",
              fields: [
                { name: "question", type: "text", required: true },
                { name: "answer", type: "textarea", required: true }
              ]
            }
          ]
        }
      ]
    }
  ],
  timestamps: true
};

// src/collections/Tags.ts
import { slugify as slugify4 } from "@seo-builder/core";
var Tags = {
  slug: "tags",
  labels: {
    singular: "Tag",
    plural: "Tags"
  },
  admin: {
    useAsTitle: "name",
    group: "Blog Manager"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar"
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.name) return slugify4(data.name);
            return value;
          }
        ]
      }
    },
    {
      name: "description",
      type: "textarea"
    }
  ]
};

// src/globals/SiteSettings.ts
var SiteSettings = {
  slug: "site-settings",
  label: "SEO Settings",
  admin: {
    group: "SEO Settings"
  },
  access: {
    read: () => true
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "SEO Builder"
    },
    {
      name: "siteUrl",
      type: "text",
      required: true,
      defaultValue: "http://localhost:3000",
      label: "Site URL"
    },
    {
      name: "blogPath",
      type: "text",
      defaultValue: "/blog",
      label: "Blog Path"
    },
    {
      name: "defaultMetaTitle",
      type: "text",
      label: "Default Meta Title"
    },
    {
      name: "defaultMetaDescription",
      type: "textarea",
      label: "Default Meta Description"
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
      label: "Default OG Image"
    },
    {
      name: "organizationName",
      type: "text",
      label: "Organization Name"
    },
    {
      name: "organizationLogo",
      type: "upload",
      relationTo: "media",
      label: "Organization Logo"
    },
    {
      name: "robotsIndexingEnabled",
      type: "checkbox",
      defaultValue: true,
      label: "Allow Search Engine Indexing"
    },
    {
      name: "defaultAuthor",
      type: "relationship",
      relationTo: "authors",
      label: "Default Author"
    },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Links",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "Twitter / X", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Facebook", value: "facebook" }
          ]
        },
        {
          name: "url",
          type: "text",
          required: true
        }
      ]
    }
  ]
};

// src/index.ts
var defaultOptions = {
  blogPath: "/blog",
  adminPath: "/seo-admin",
  brandName: "SEO Builder"
};
function seoBuilderPlugin(options = {}) {
  const opts = { ...defaultOptions, ...options };
  const enable = {
    posts: options.collections?.posts !== false,
    categories: options.collections?.categories !== false,
    tags: options.collections?.tags !== false,
    authors: options.collections?.authors !== false,
    media: options.collections?.media !== false
  };
  const collections = [
    enable.posts ? Posts : null,
    enable.categories ? Categories : null,
    enable.tags ? Tags : null,
    enable.authors ? Authors : null,
    enable.media ? Media : null
  ].filter((c) => c !== null);
  return (incomingConfig) => {
    return {
      ...incomingConfig,
      collections: [...incomingConfig.collections || [], ...collections],
      globals: [...incomingConfig.globals || [], SiteSettings],
      routes: {
        ...incomingConfig.routes,
        admin: opts.adminPath
      },
      admin: {
        ...incomingConfig.admin,
        meta: {
          titleSuffix: `- ${opts.brandName}`,
          description: `${opts.brandName} Dashboard`,
          ...incomingConfig.admin?.meta
        },
        components: {
          ...incomingConfig.admin?.components,
          graphics: {
            Logo: "@seo-builder/payload-plugin/graphics/Logo#Logo",
            Icon: "@seo-builder/payload-plugin/graphics/Icon#Icon",
            ...incomingConfig.admin?.components?.graphics
          }
        }
      }
    };
  };
}
export {
  Authors,
  Categories,
  Media,
  Posts,
  SiteSettings,
  Tags,
  seoBuilderPlugin
};
//# sourceMappingURL=index.js.map