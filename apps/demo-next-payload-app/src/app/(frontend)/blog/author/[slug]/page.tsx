import { notFound } from 'next/navigation'

import { AuthorBox, BlogHeader, Pagination, PostCard, PostList } from '@/components/blog'
import { getAuthorBySlug, getPublishedPosts, getSiteSettings, POSTS_PER_PAGE } from '@/lib/seo/queries'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Number(pageParam || '1')

  const author = await getAuthorBySlug(slug)
  if (!author) notFound()

  const siteSettings = await getSiteSettings()
  const blogPath = siteSettings.blogPath || '/blog'
  const result = await getPublishedPosts({ page, limit: POSTS_PER_PAGE, authorSlug: slug })

  return (
    <div>
      <BlogHeader title={author.name || 'Author'} description={author.bio || undefined} />
      <AuthorBox author={author} />
      <section className="mt-12">
        <h2 className="mb-6 text-xl font-semibold text-slate-900">Posts by {author.name}</h2>
        {result.docs.length === 0 ? (
          <p className="text-slate-600">No published posts by this author yet.</p>
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
              basePath={`${blogPath}/author/${slug}`}
            />
          </>
        )}
      </section>
    </div>
  )
}
