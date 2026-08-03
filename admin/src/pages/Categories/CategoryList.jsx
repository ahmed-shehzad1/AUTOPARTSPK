import { useEffect, useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import api from '../../api/client'

function CategoryList() {
  const [categories, setCategories] = useState([])
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      const res = await api.get('/categories')
      setCategories(res.data)
    } catch {
      setError('Failed to load categories. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setError('')
    try {
      await api.post('/categories', { name: newName.trim() })
      setNewName('')
      fetchCategories()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add category.')
    }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? Products in this category will need to be reassigned.`)) return
    try {
      await api.delete(`/categories/${id}`)
      fetchCategories()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete — it may still have products assigned.')
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Catalog Structure</span>
      <h1 className="font-display font-semibold text-2xl text-ink mt-1 mb-8">Categories</h1>

      <form onSubmit={handleAdd} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="flex-grow bg-paper border border-ink/10 rounded-md px-4 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
        />
        <button type="submit" className="flex items-center gap-2 bg-ink text-paper font-medium text-sm px-5 py-2.5 rounded-md hover:bg-blueprint transition-colors">
          <FaPlus size={12} /> Add
        </button>
      </form>

      {error && (
        <div className="bg-ignition/10 border border-ignition/30 text-ignition font-body text-sm px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-paper border border-ink/10 rounded-lg divide-y divide-ink/5">
        {loading ? (
          <p className="p-5 font-body text-slate text-sm">Loading…</p>
        ) : categories.length === 0 ? (
          <p className="p-5 font-body text-slate text-sm">No categories yet.</p>
        ) : (
          categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between px-5 py-3.5">
              <span className="font-body text-ink text-sm">{cat.name}</span>
              <button onClick={() => handleDelete(cat.id, cat.name)} className="text-slate hover:text-ignition transition-colors">
                <FaTrash size={13} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryList