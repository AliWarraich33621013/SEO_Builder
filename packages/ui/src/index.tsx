import type { ComponentType, ReactNode } from 'react'

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[] | null
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

export function BlogHeader({ title, description }: { title: string; description?: string }) {
  return (
    <header className="mb-10 border-b border-slate-200 pb-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-lg text-slate-600">{description}</p>}
    </header>
  )
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span>/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-slate-900">
                {item.label}
              </a>
            ) : (
              <span className="text-slate-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number
  totalPages: number
  basePath: string
}) {
  if (totalPages <= 1) return null

  return (
    <nav className="mt-12 flex justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <a
          key={page}
          href={page === 1 ? basePath : `${basePath}?page=${page}`}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            page === currentPage
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          {page}
        </a>
      ))}
    </nav>
  )
}

export function FAQSection({
  items,
}: {
  items: { question?: string | null; answer?: string | null }[]
}) {
  if (!items?.length) return null

  return (
    <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
      <dl className="mt-6 space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <dt className="font-medium text-slate-900">{item.question}</dt>
            <dd className="mt-2 text-slate-600">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function AuthorBox({
  author,
}: {
  author: {
    name?: string | null
    bio?: string | null
    jobTitle?: string | null
    avatar?: unknown
    slug?: string | null
  }
}) {
  const avatarObj =
    typeof author.avatar === 'object' && author.avatar !== null
      ? (author.avatar as { url?: string | null; alt?: string | null })
      : null
  const avatarUrl = avatarObj?.url ?? undefined

  return (
    <aside className="mt-12 flex gap-4 rounded-xl border border-slate-200 p-6">
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt={avatarObj?.alt || author.name || ''}
          className="h-16 w-16 rounded-full object-cover"
        />
      )}
      <div>
        {author.slug ? (
          <a href={`/blog/author/${author.slug}`} className="text-lg font-semibold text-slate-900 hover:underline">
            {author.name}
          </a>
        ) : (
          <p className="text-lg font-semibold text-slate-900">{author.name}</p>
        )}
        {author.jobTitle && <p className="text-sm text-slate-500">{author.jobTitle}</p>}
        {author.bio && <p className="mt-2 text-slate-600">{author.bio}</p>}
      </div>
    </aside>
  )
}

export function PostCard({
  post,
  blogPath = '/blog',
}: {
  post: {
    slug?: string | null
    title?: string | null
    excerpt?: string | null
    publishedAt?: string | null
    featuredImage?: unknown
    author?: unknown
    categories?: unknown
  }
  blogPath?: string
}) {
  const featuredImage =
    typeof post.featuredImage === 'object' && post.featuredImage !== null
      ? (post.featuredImage as { url?: string | null; alt?: string | null })
      : null
  const imageUrl = featuredImage?.url ?? undefined
  const authorName =
    typeof post.author === 'object' && post.author !== null && 'name' in post.author
      ? (post.author as { name?: string | null }).name
      : null
  const categories = Array.isArray(post.categories) ? post.categories : []
  const category = categories.length > 0 ? categories[0] : null
  const categoryName =
    typeof category === 'object' && category !== null && 'name' in category
      ? (category as { name?: string | null }).name
      : null
  const categorySlug =
    typeof category === 'object' && category !== null && 'slug' in category
      ? (category as { slug?: string | null }).slug
      : null

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      {imageUrl && (
        <a href={`${blogPath}/${post.slug}`}>
          <img
            src={imageUrl}
            alt={featuredImage?.alt || post.title || ''}
            className="aspect-[16/9] w-full object-cover"
          />
        </a>
      )}
      <div className="p-5">
        {categoryName && categorySlug && (
          <a
            href={`${blogPath}/category/${categorySlug}`}
            className="text-xs font-medium uppercase tracking-wide text-blue-600 hover:underline"
          >
            {categoryName}
          </a>
        )}
        <h2 className="mt-2 text-xl font-semibold text-slate-900">
          <a href={`${blogPath}/${post.slug}`} className="hover:underline">
            {post.title}
          </a>
        </h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-slate-600">{post.excerpt}</p>}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
          {authorName && <span>{authorName}</span>}
          {post.publishedAt && (
            <>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </>
          )}
        </div>
      </div>
    </article>
  )
}

export function PostList({ children }: { children: ReactNode }) {
  return <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}

export function RichText({ content }: { content: unknown }) {
  if (!content) return null

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { RichText: PayloadRichText } = require('@payloadcms/richtext-lexical/react') as {
    RichText: ComponentType<{ data: unknown }>
  }

  return (
    <div className="prose prose-slate max-w-none">
      <PayloadRichText data={content} />
    </div>
  )
}

// Aliases per package API
export { PostCard as BlogCard, PostList as BlogList, FAQSection as FAQBlock }

export function BlogCTA({
  title,
  description,
  buttonText,
  buttonUrl,
}: {
  title: string
  description: string
  buttonText: string
  buttonUrl: string
}) {
  return (
    <section
      className="mt-12 rounded-xl p-8 text-center"
      style={{
        background: 'var(--seo-builder-primary, #2563eb)',
        color: '#fff',
        borderRadius: 'var(--seo-builder-radius, 14px)',
      }}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 opacity-90">{description}</p>
      <a
        href={buttonUrl}
        className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold"
        style={{ color: 'var(--seo-builder-primary, #2563eb)' }}
      >
        {buttonText}
      </a>
    </section>
  )
}

export function RelatedPosts({
  posts,
  blogPath = '/blog',
}: {
  posts: Parameters<typeof PostCard>[0]['post'][]
  blogPath?: string
}) {
  if (!posts?.length) return null
  return (
    <section className="mt-12">
      <h2 className="mb-6 text-xl font-semibold" style={{ color: 'var(--seo-builder-text, #111827)' }}>
        Related posts
      </h2>
      <PostList>
        {posts.map((post, i) => (
          <PostCard key={post.slug || i} post={post} blogPath={blogPath} />
        ))}
      </PostList>
    </section>
  )
}

export { SeoBuilderThemeProvider, seoBuilderCssVars } from './ThemeProvider'
