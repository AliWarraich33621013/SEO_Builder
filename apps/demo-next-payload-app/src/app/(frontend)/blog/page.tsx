import type { Metadata } from 'next'

import { BlogHeader, Pagination, PostCard, PostList } from '@/components/blog'
import { generateBlogMetadata } from '@seo-builder/core/seo'
import { getPublishedPosts, getSiteSettings, POSTS_PER_PAGE } from '@/lib/seo/queries'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  return generateBlogMetadata(siteSettings)
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page || '1')
  const siteSettings = await getSiteSettings()
  const blogPath = siteSettings.blogPath || '/blog'
  const result = await getPublishedPosts({ page, limit: POSTS_PER_PAGE })

  return (
    <div>
      <BlogHeader
        title="Blog"
        description={siteSettings.defaultMetaDescription || 'Latest articles and insights.'}
      />
      {result.docs.length === 0 ? (
        <p className="text-slate-600">No published posts yet. Create one in the SEO Builder Dashboard.</p>
      ) : (
        <>
          <PostList>
            {result.docs.map((post) => (
              <PostCard key={post.id} post={post} blogPath={blogPath} />
            ))}
          </PostList>
          <Pagination
            currentPage={result.page ?? 1}
            totalPages={result.totalPages ?? 1}
            basePath={blogPath}
          />
        </>
      )}
    </div>
  )
}
