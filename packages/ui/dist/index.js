import {
  __require,
  seoBuilderCssVars
} from "./chunk-M7B7JJUA.js";

// src/ThemeProvider.tsx
import { jsx } from "react/jsx-runtime";
function SeoBuilderThemeProvider({
  config,
  children
}) {
  return /* @__PURE__ */ jsx("div", { style: seoBuilderCssVars(config.branding), className: "seo-builder-theme", children });
}

// src/index.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
function JsonLd({ data }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data : [data];
  return /* @__PURE__ */ jsx2(Fragment, { children: items.map((item, index) => /* @__PURE__ */ jsx2(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(item) }
    },
    index
  )) });
}
function BlogHeader({ title, description }) {
  return /* @__PURE__ */ jsxs("header", { className: "mb-10 border-b border-slate-200 pb-8", children: [
    /* @__PURE__ */ jsx2("h1", { className: "text-3xl font-bold tracking-tight text-slate-900 md:text-4xl", children: title }),
    description && /* @__PURE__ */ jsx2("p", { className: "mt-3 max-w-2xl text-lg text-slate-600", children: description })
  ] });
}
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ jsx2("nav", { "aria-label": "Breadcrumb", className: "mb-6 text-sm text-slate-500", children: /* @__PURE__ */ jsx2("ol", { className: "flex flex-wrap items-center gap-2", children: items.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2", children: [
    index > 0 && /* @__PURE__ */ jsx2("span", { children: "/" }),
    item.href ? /* @__PURE__ */ jsx2("a", { href: item.href, className: "hover:text-slate-900", children: item.label }) : /* @__PURE__ */ jsx2("span", { className: "text-slate-900", children: item.label })
  ] }, index)) }) });
}
function Pagination({
  currentPage,
  totalPages,
  basePath
}) {
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsx2("nav", { className: "mt-12 flex justify-center gap-2", "aria-label": "Pagination", children: Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => /* @__PURE__ */ jsx2(
    "a",
    {
      href: page === 1 ? basePath : `${basePath}?page=${page}`,
      className: `rounded-md px-4 py-2 text-sm font-medium ${page === currentPage ? "bg-slate-900 text-white" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"}`,
      children: page
    },
    page
  )) });
}
function FAQSection({
  items
}) {
  if (!items?.length) return null;
  return /* @__PURE__ */ jsxs("section", { className: "mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6", children: [
    /* @__PURE__ */ jsx2("h2", { className: "text-xl font-semibold text-slate-900", children: "Frequently Asked Questions" }),
    /* @__PURE__ */ jsx2("dl", { className: "mt-6 space-y-6", children: items.map((item, index) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx2("dt", { className: "font-medium text-slate-900", children: item.question }),
      /* @__PURE__ */ jsx2("dd", { className: "mt-2 text-slate-600", children: item.answer })
    ] }, index)) })
  ] });
}
function AuthorBox({
  author
}) {
  const avatarObj = typeof author.avatar === "object" && author.avatar !== null ? author.avatar : null;
  const avatarUrl = avatarObj?.url ?? void 0;
  return /* @__PURE__ */ jsxs("aside", { className: "mt-12 flex gap-4 rounded-xl border border-slate-200 p-6", children: [
    avatarUrl && /* @__PURE__ */ jsx2(
      "img",
      {
        src: avatarUrl,
        alt: avatarObj?.alt || author.name || "",
        className: "h-16 w-16 rounded-full object-cover"
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      author.slug ? /* @__PURE__ */ jsx2("a", { href: `/blog/author/${author.slug}`, className: "text-lg font-semibold text-slate-900 hover:underline", children: author.name }) : /* @__PURE__ */ jsx2("p", { className: "text-lg font-semibold text-slate-900", children: author.name }),
      author.jobTitle && /* @__PURE__ */ jsx2("p", { className: "text-sm text-slate-500", children: author.jobTitle }),
      author.bio && /* @__PURE__ */ jsx2("p", { className: "mt-2 text-slate-600", children: author.bio })
    ] })
  ] });
}
function PostCard({
  post,
  blogPath = "/blog"
}) {
  const featuredImage = typeof post.featuredImage === "object" && post.featuredImage !== null ? post.featuredImage : null;
  const imageUrl = featuredImage?.url ?? void 0;
  const authorName = typeof post.author === "object" && post.author !== null && "name" in post.author ? post.author.name : null;
  const categories = Array.isArray(post.categories) ? post.categories : [];
  const category = categories.length > 0 ? categories[0] : null;
  const categoryName = typeof category === "object" && category !== null && "name" in category ? category.name : null;
  const categorySlug = typeof category === "object" && category !== null && "slug" in category ? category.slug : null;
  return /* @__PURE__ */ jsxs("article", { className: "group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md", children: [
    imageUrl && /* @__PURE__ */ jsx2("a", { href: `${blogPath}/${post.slug}`, children: /* @__PURE__ */ jsx2(
      "img",
      {
        src: imageUrl,
        alt: featuredImage?.alt || post.title || "",
        className: "aspect-[16/9] w-full object-cover"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      categoryName && categorySlug && /* @__PURE__ */ jsx2(
        "a",
        {
          href: `${blogPath}/category/${categorySlug}`,
          className: "text-xs font-medium uppercase tracking-wide text-blue-600 hover:underline",
          children: categoryName
        }
      ),
      /* @__PURE__ */ jsx2("h2", { className: "mt-2 text-xl font-semibold text-slate-900", children: /* @__PURE__ */ jsx2("a", { href: `${blogPath}/${post.slug}`, className: "hover:underline", children: post.title }) }),
      post.excerpt && /* @__PURE__ */ jsx2("p", { className: "mt-2 line-clamp-3 text-slate-600", children: post.excerpt }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 text-sm text-slate-500", children: [
        authorName && /* @__PURE__ */ jsx2("span", { children: authorName }),
        post.publishedAt && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2("time", { dateTime: post.publishedAt, children: new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) })
        ] })
      ] })
    ] })
  ] });
}
function PostList({ children }) {
  return /* @__PURE__ */ jsx2("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children });
}
function RichText({ content }) {
  if (!content) return null;
  const { RichText: PayloadRichText } = __require("@payloadcms/richtext-lexical/react");
  return /* @__PURE__ */ jsx2("div", { className: "prose prose-slate max-w-none", children: /* @__PURE__ */ jsx2(PayloadRichText, { data: content }) });
}
function BlogCTA({
  title,
  description,
  buttonText,
  buttonUrl
}) {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "mt-12 rounded-xl p-8 text-center",
      style: {
        background: "var(--seo-builder-primary, #2563eb)",
        color: "#fff",
        borderRadius: "var(--seo-builder-radius, 14px)"
      },
      children: [
        /* @__PURE__ */ jsx2("h2", { className: "text-2xl font-bold", children: title }),
        /* @__PURE__ */ jsx2("p", { className: "mt-2 opacity-90", children: description }),
        /* @__PURE__ */ jsx2(
          "a",
          {
            href: buttonUrl,
            className: "mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold",
            style: { color: "var(--seo-builder-primary, #2563eb)" },
            children: buttonText
          }
        )
      ]
    }
  );
}
function RelatedPosts({
  posts,
  blogPath = "/blog"
}) {
  if (!posts?.length) return null;
  return /* @__PURE__ */ jsxs("section", { className: "mt-12", children: [
    /* @__PURE__ */ jsx2("h2", { className: "mb-6 text-xl font-semibold", style: { color: "var(--seo-builder-text, #111827)" }, children: "Related posts" }),
    /* @__PURE__ */ jsx2(PostList, { children: posts.map((post, i) => /* @__PURE__ */ jsx2(PostCard, { post, blogPath }, post.slug || i)) })
  ] });
}
export {
  AuthorBox,
  BlogCTA,
  PostCard as BlogCard,
  BlogHeader,
  PostList as BlogList,
  Breadcrumbs,
  FAQSection as FAQBlock,
  FAQSection,
  JsonLd,
  Pagination,
  PostCard,
  PostList,
  RelatedPosts,
  RichText,
  SeoBuilderThemeProvider,
  seoBuilderCssVars
};
