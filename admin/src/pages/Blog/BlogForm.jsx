import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../api/client'

const CATEGORIES = ['Buying Guides', 'Maintenance', 'Wholesale']

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

function BlogForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '', slug: '', category: CATEGORIES[0], excerpt: '',
    content: '', readTime: '5 min read', published: true,
  })
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugTouched, setSlugTouched] = useState(isEdit)

  useEffect(() => {
    if (!isEdit) return
    api.get(`/blog/admin/${id}`).then((res) => setForm(res.data)).finally(() => setLoading(false))
  }, [id, isEdit])

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const handleTitleChange = (value) => {
    update('title', value)
    if (!slugTouched) update('slug', slugify(value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title || !form.slug || !form.content) {
      setError('Title, slug, and content are required.')
      return
    }
    setSaving(true)
    try {
      if (isEdit) await api.put(`/blog/${id}`, form)
      else await api.post('/blog', form)
      navigate('/blog')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save post.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 font-body text-slate">Loading…</div>

  const inputClass = 'w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors'

  return (
    <div className="p-8 max-w-3xl">
      <Link to="/blog" className="flex items-center gap-2 font-mono text-xs text-slate hover:text-blueprint transition-colors mb-6 w-fit">
        <FaArrowLeft size={10} /> Back to Blog
      </Link>

      <h1 className="font-display font-semibold text-2xl text-ink mb-8">{isEdit ? 'Edit Post' : 'New Post'}</h1>

      <form onSubmit={handleSubmit} className="bg-paper border border-ink/10 rounded-lg p-7 space-y-5">
        <div>
          <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Title *</label>
          <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Slug (URL) *</label>
          <input
            value={form.slug}
            onChange={(e) => { setSlugTouched(true); update('slug', e.target.value) }}
            className={`${inputClass} font-mono`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Category</label>
            <select value={form.category} onChange={(e) => update('category', e.target.value)} className={inputClass}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Read Time</label>
            <input value={form.readTime} onChange={(e) => update('readTime', e.target.value)} placeholder="5 min read" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Excerpt</label>
          <textarea rows={2} value={form.excerpt} onChange={(e) => update('excerpt', e.target.value)} className={`${inputClass} resize-none`} />
        </div>

        <div>
          <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
            Content * (separate paragraphs with a blank line)
          </label>
          <textarea rows={12} value={form.content} onChange={(e) => update('content', e.target.value)} className={`${inputClass} resize-y`} />
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update('published', e.target.checked)}
            className="h-4 w-4 accent-blueprint"
          />
          <span className="font-body text-sm text-ink">Published (visible on the storefront)</span>
        </label>

        {error && <p className="font-mono text-xs text-ignition">{error}</p>}

        <div className="flex gap-3 pt-3">
          <button type="submit" disabled={saving} className="bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-blueprint transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Post'}
          </button>
          <Link to="/blog" className="font-mono text-xs uppercase text-slate hover:text-ink transition-colors self-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default BlogForm