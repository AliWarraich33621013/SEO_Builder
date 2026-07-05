import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  AuthorBox,
  Breadcrumbs,
  FAQSection,
  JsonLd,
  PostCard,
  PostList,
  RichText,
} from '@/components/blog'
import { generatePostMetadata } from '@seo-builder/core/seo'
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from '@seo-builder/core/seo'
import { getPostBySlug, getRelatedPosts, getSiteSettings } from '@/lib/seo/queries'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [post, siteSettings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])
  if (!post) return {}
  return generatePostMetadata(post, siteSettings)
}

type Rel = { name?: string | null; slug?: string | null; id?: string | number } | number | string

function readRel(v: unknown): { name?: string | null; slug?: string | null; id?: string | number } | null {
  if (typeof v === 'object' && v !== null) return v as { name?: string | null; slug?: string | null }
  return null
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, siteSettings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])

  if (!post) notFound()

  const blogPath = siteSettings.blogPath || '/blog'
  const categoriesArr = (post.categories ?? []) as Rel[]
  const firstCategory = categoriesArr.length > 0 ? readRel(categoriesArr[0]) : null
  const categoryName = firstCategory?.name || null
  const categorySlug = firstCategory?.slug || null

  const categoryIds = categoriesArr
    .map((c) => (typeof c === 'object' && c !== null && 'id' in c ? String(c.id) : null))
    .filter((v): v is string => Boolean(v))

  const relatedPosts = await getRelatedPosts(String(post.id), categoryIds)
  const authorRel = readRel(post.author)
  const featuredImage =
    typeof post.featuredImage === 'object' && post.featuredImage !== null
      ? (post.featuredImage as { url?: string | null; alt?: string | null })
      : null

  const breadcrumbItems = [
    { label: siteSettings.siteName || 'Home', href: '/' },
    { label: 'Blog', href: blogPath },
    ...(categoryName && categorySlug
      ? [{ label: categoryName, href: `${blogPath}/category/${categorySlug}` }]
      : []),
    { label: post.title || 'Post' },
  ]

  const schemas = [
    generateArticleSchema(post, siteSettings),
    generateFAQSchema(post),
    generateBreadcrumbSchema(post, siteSettings),
  ].filter(Boolean) as Record<string, unknown>[]

  return (
    <article>
      <JsonLd data={schemas} />
      <Breadcrumbs items={breadcrumbItems} />
      <header className="mb-8">
        {categoryName && categorySlug && (
          <a
            href={`${blogPath}/category/${categorySlug}`}
            className="text-sm font-medium uppercase tracking-wide text-blue-600 hover:underline"
          >
            {categoryName}
          </a>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
          {authorRel && (
            <span>
              By{' '}
              {authorRel.slug ? (
                <a
                  href={`${blogPath}/author/${authorRel.slug}`}
                  className="font-medium text-slate-700 hover:underline"
                >
                  {authorRel.name}
                </a>
              ) : (
                authorRel.name
              )}
            </span>
          )}
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              Published{' '}
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {post.updatedAt && post.updatedAt !== post.publishedAt && (
            <time dateTime={post.updatedAt}>
              Updated{' '}
              {new Date(post.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </div>
      </header>

      {featuredImage?.url && (
        <img
          src={featuredImage.url}
          alt={featuredImage.alt || post.title || ''}
          className="mb-8 aspect-[16/9] w-full rounded-xl object-cover"
        />
      )}

      {post.excerpt && (
        <p className="mb-8 text-xl leading-relaxed text-slate-600">{post.excerpt}</p>
      )}

      <RichText content={post.content} />

      {post.faqItems && post.faqItems.length > 0 && <FAQSection items={post.faqItems} />}

      {authorRel && <AuthorBox author={authorRel} />}

      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="text-2xl font-semibold text-slate-900">Related Posts</h2>
          <div className="mt-6">
            <PostList>
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} blogPath={blogPath} />
              ))}
            </PostList>
          </div>
        </section>
      )}
    </article>
  )
}
