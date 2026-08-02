import { Link } from 'react-router-dom'
import { FaArrowRight, FaClock } from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { BLOG_POSTS } from '../../data/blogPosts'

function Blog() {
  const [featured, ...rest] = BLOG_POSTS

  return (
    <div className="bg-steel min-h-screen">
      <section className="bg-paper border-b border-ink/10 py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Resources</span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-2 mb-4">Blog</h1>
          <p className="font-body text-slate max-w-xl">
            Buying guides, maintenance tips, and wholesale advice for workshops, dealers, and vehicle owners.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        {/* Featured post */}
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group block bg-paper border border-ink/10 rounded-xl p-8 md:p-10 hover:border-blueprint transition-colors duration-300 mb-14"
          >
            <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase bg-blueprint/10 px-2.5 py-1 rounded">
              {featured.category}
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mt-4 mb-3 group-hover:text-blueprint transition-colors">
              {featured.title}
            </h2>
            <p className="font-body text-slate max-w-2xl mb-5">{featured.excerpt}</p>
            <div className="flex items-center gap-4 font-mono text-xs text-slate/50">
              <span>{new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1.5"><FaClock size={10} /> {featured.readTime}</span>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                to={`/blog/${post.slug}`}
                className="group relative block bg-paper border border-ink/10 rounded-lg p-6 h-full hover:border-blueprint hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase">
                  {post.category}
                </span>
                <h3 className="font-display font-semibold text-ink text-lg mt-3 mb-2 group-hover:text-blueprint transition-colors">
                  {post.title}
                </h3>
                <p className="font-body text-sm text-slate mb-5 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between font-mono text-[10px] text-slate/50 uppercase">
                  <span className="flex items-center gap-1.5"><FaClock size={9} /> {post.readTime}</span>
                  <FaArrowRight size={10} className="text-blueprint opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog