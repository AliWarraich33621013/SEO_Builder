import { notFound } from 'next/navigation'

import { BlogHeader, Pagination, PostCard, PostList } from '@/components/blog'
import { getCategoryBySlug, getPublishedPosts, getSiteSettings, POSTS_PER_PAGE } from '@/lib/seo/queries'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam || '1')

  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const siteSettings = await getSiteSettings()
  const blogPath = siteSettings.blogPath || '/blog'
  const result = await getPublishedPosts({ page, limit: POSTS_PER_PAGE, categorySlug: slug })

  return (
    <div>
      <BlogHeader
        title={category.name}
        description={category.description || category.metaDescription || undefined}
      />
      {result.docs.length === 0 ? (
        <p className="text-slate-600">No posts in this category yet.</p>
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
            basePath={`${blogPath}/category/${slug}`}
          />
        </>
      )}
    </div>
  )
}
