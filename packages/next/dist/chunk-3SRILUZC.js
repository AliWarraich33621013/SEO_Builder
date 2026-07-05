// src/queries/createQueryHelpers.ts
import { getPayload } from "payload";
var POSTS_PER_PAGE = 12;
async function resolveConfig(config) {
  return Promise.resolve(config);
}
function createQueryHelpers(payloadConfig) {
  async function getPayloadClient() {
    const config = await resolveConfig(payloadConfig);
    return getPayload({ config });
  }
  async function getSiteSettings() {
    const payload = await getPayloadClient();
    return payload.findGlobal({ slug: "site-settings" });
  }
  async function getPublishedPosts(options) {
    const payload = await getPayloadClient();
    const page = options?.page ?? 1;
    const limit = options?.limit ?? POSTS_PER_PAGE;
    const where = {
      status: { equals: "published" }
    };
    if (options?.categorySlug) {
      const category = await payload.find({
        collection: "categories",
        where: { slug: { equals: options.categorySlug } },
        limit: 1
      });
      if (category.docs[0]) {
        where.categories = { contains: category.docs[0].id };
      }
    }
    if (options?.tagSlug) {
      const tag = await payload.find({
        collection: "tags",
        where: { slug: { equals: options.tagSlug } },
        limit: 1
      });
      if (tag.docs[0]) {
        where.tags = { contains: tag.docs[0].id };
      }
    }
    if (options?.authorSlug) {
      const author = await payload.find({
        collection: "authors",
        where: { slug: { equals: options.authorSlug } },
        limit: 1
      });
      if (author.docs[0]) {
        where.author = { equals: author.docs[0].id };
      }
    }
    return payload.find({
      collection: "posts",
      where,
      sort: "-publishedAt",
      page,
      limit,
      depth: 2
    });
  }
  async function getPostBySlug(slug) {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        slug: { equals: slug },
        status: { equals: "published" }
      },
      limit: 1,
      depth: 2
    });
    return result.docs[0] ?? null;
  }
  async function getRelatedPosts(postId, categoryIds, limit = 3) {
    if (!categoryIds.length) return [];
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        and: [
          { status: { equals: "published" } },
          { id: { not_equals: postId } },
          { categories: { in: categoryIds } }
        ]
      },
      sort: "-publishedAt",
      limit,
      depth: 1
    });
    return result.docs;
  }
  async function getCategoryBySlug(slug) {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "categories",
      where: { slug: { equals: slug } },
      limit: 1
    });
    return result.docs[0] ?? null;
  }
  async function getTagBySlug(slug) {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "tags",
      where: { slug: { equals: slug } },
      limit: 1
    });
    return result.docs[0] ?? null;
  }
  async function getAuthorBySlug(slug) {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "authors",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1
    });
    return result.docs[0] ?? null;
  }
  async function getAllCategories() {
    const payload = await getPayloadClient();
    return payload.find({ collection: "categories", limit: 100 });
  }
  async function getAllTags() {
    const payload = await getPayloadClient();
    return payload.find({ collection: "tags", limit: 100 });
  }
  async function getAllAuthors() {
    const payload = await getPayloadClient();
    return payload.find({ collection: "authors", limit: 100, depth: 1 });
  }
  async function getAllPublishedPostSlugs() {
    const payload = await getPayloadClient();
    return payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 1e3,
      depth: 0,
      select: { slug: true, updatedAt: true }
    });
  }
  return {
    POSTS_PER_PAGE,
    getPayloadClient,
    getSiteSettings,
    getPublishedPosts,
    getPostBySlug,
    getRelatedPosts,
    getCategoryBySlug,
    getTagBySlug,
    getAuthorBySlug,
    getAllCategories,
    getAllTags,
    getAllAuthors,
    getAllPublishedPostSlugs
  };
}

export {
  POSTS_PER_PAGE,
  createQueryHelpers
};
//# sourceMappingURL=chunk-3SRILUZC.js.map