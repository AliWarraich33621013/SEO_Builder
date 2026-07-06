import type { Metadata } from 'next'

import { BlogHeader, Pagination, PostCard, PostList } from '@/components/blog'
import { generateBlogMetadata } from '@seo-builder/core/seo'
import {
  DatabaseNotInitializedError,
  getPublishedPosts,
  getSiteSettings,
  POSTS_PER_PAGE,
} from '@/lib/seo/queries'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await getSiteSettings()
    return generateBlogMetadata(siteSettings)
  } catch (err) {
    if (err instanceof DatabaseNotInitializedError) {
      return generateBlogMetadata()
    }
    throw err
  }
}

function DatabaseSetupNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-slate-700">
      <h2 className="text-lg font-semibold text-slate-900">Blog database not initialized</h2>
      <p className="mt-2">
        Payload CMS tables have not been created yet. Run the one-time database setup command
        against your Neon Postgres database, then refresh this page.
      </p>
      <p className="mt-3 font-mono text-sm text-slate-600">
        pnpm --filter demo-next-payload-app db:setup
      </p>
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const params = await searchParams
  const page = Number(params.page || '1')

  try {
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
          <p className="text-slate-600">
            No published posts yet. Create one in the SEO Builder Dashboard.
          </p>
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
  } catch (err) {
    if (err instanceof DatabaseNotInitializedError) {
      return (
        <div>
          <BlogHeader title="Blog" description="Latest articles and insights." />
          <DatabaseSetupNotice />
        </div>
      )
    }
    throw err
  }
}
