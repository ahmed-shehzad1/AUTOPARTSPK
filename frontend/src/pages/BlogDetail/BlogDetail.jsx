import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaClock, FaArrowLeft } from 'react-icons/fa'
import { BLOG_POSTS, getPostBySlug } from '../../data/blogPosts'

function BlogDetail() {
  const { slug } = useParams()
  const post = useMemo(() => getPostBySlug(slug), [slug])

  if (!post) {
    return (
      <div className="bg-steel min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-xl text-ink mb-3">Article not found</p>
          <Link to="/blog" className="font-mono text-sm text-blueprint hover:underline">← Back to Blog</Link>
        </div>
      </div>
    )
  }

  const related = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2)

  return (
    <div className="bg-steel min-h-screen">
      <div className="bg-paper border-b border-ink/10 py-4">
        <div className="max-w-3xl mx-auto px-6 font-mono text-xs text-slate/60 uppercase tracking-widest">
          <Link to="/blog" className="hover:text-blueprint transition-colors flex items-center gap-2 w-fit">
            <FaArrowLeft size={10} /> Blog
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-14">
        <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase bg-blueprint/10 px-2.5 py-1 rounded">
          {post.category}
        </span>
        <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-4 mb-5 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 font-mono text-xs text-slate/50 mb-10 pb-10 border-b border-ink/10">
          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="flex items-center gap-1.5"><FaClock size={10} /> {post.readTime}</span>
        </div>

        <div className="space-y-5">
          {post.content.map((para, i) => (
            <p key={i} className="font-body text-slate leading-relaxed">{para}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <div className="max-w-3xl mx-auto px-6 pb-16">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-5">
            More in {post.category}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="block bg-paper border border-ink/10 rounded-lg p-5 hover:border-blueprint transition-colors"
              >
                <h3 className="font-display font-semibold text-ink text-sm mb-2">{p.title}</h3>
                <p className="font-body text-xs text-slate line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogDetail