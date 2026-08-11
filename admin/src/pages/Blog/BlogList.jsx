import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import api from '../../api/client'

function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = () => {
    setLoading(true)
    api.get('/blog/admin/all').then((res) => setPosts(res.data)).finally(() => setLoading(false))
  }

  useEffect(() => { fetchPosts() }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return
    await api.delete(`/blog/${id}`)
    fetchPosts()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Content</span>
          <h1 className="font-display font-semibold text-2xl text-ink mt-1">Blog Posts</h1>
        </div>
        <Link to="/blog/new" className="flex items-center gap-2 bg-ink text-paper font-medium text-sm px-5 py-2.5 rounded-md hover:bg-blueprint transition-colors">
          <FaPlus size={12} /> New Post
        </Link>
      </div>

      <div className="bg-paper border border-ink/10 rounded-lg divide-y divide-ink/5">
        {loading ? (
          <p className="p-5 font-body text-slate text-sm">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="p-5 font-body text-slate text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-body font-medium text-ink text-sm">{post.title}</p>
                <p className="font-mono text-xs text-slate/60 mt-0.5">
                  {post.category} · {post.published ? (
                    <span className="text-blueprint">Published</span>
                  ) : (
                    <span className="text-gold">Draft</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link to={`/blog/${post.id}/edit`} className="text-slate hover:text-blueprint transition-colors">
                  <FaEdit size={14} />
                </Link>
                <button onClick={() => handleDelete(post.id, post.title)} className="text-slate hover:text-ignition transition-colors">
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default BlogList