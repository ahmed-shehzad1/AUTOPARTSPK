import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar } from 'react-icons/fa'
import api from '../../api/client'

function ProductList() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.get('/products', { params: { page, search } })
      setProducts(res.data.items)
      setTotal(res.data.total)
    } catch (err) {
      setError('Failed to load products. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  const toggleFeatured = async (product) => {
  try {
    await api.put(`/products/${product.id}`, { featured: !product.featured })
    fetchProducts()
  } catch {
    alert('Failed to update featured status.')
  }
}

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchProducts()
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return
    try {
      await api.delete(`/products/${id}`)
      fetchProducts()
    } catch (err) {
      alert('Failed to delete product.')
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Catalog</span>
          <h1 className="font-display font-semibold text-2xl text-ink mt-1">Products</h1>
        </div>
        <Link
          to="/products/new"
          className="flex items-center gap-2 bg-ink text-paper font-medium text-sm px-5 py-2.5 rounded-md hover:bg-blueprint transition-colors"
        >
          <FaPlus size={12} /> Add Product
        </Link>
        <Link to="/products/bulk-add" className="flex items-center gap-2 border border-ink/10 hover:border-blueprint text-ink font-medium text-sm px-5 py-2.5 rounded-md transition-colors">
  Bulk Add (CSV)
</Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <div className="relative flex-grow max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or part number"
            className="w-full bg-paper border border-ink/10 rounded-md pl-9 pr-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
          />
        </div>
        <button type="submit" className="bg-paper border border-ink/10 hover:border-blueprint px-5 py-2.5 rounded-md font-mono text-xs uppercase text-ink transition-colors">
          Search
        </button>
      </form>

      {error && (
        <div className="bg-ignition/10 border border-ignition/30 text-ignition font-body text-sm px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-paper border border-ink/10 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 bg-steel/40">
  <th className="text-left font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Part No.</th>
  <th className="text-left font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Name</th>
  <th className="text-left font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Category</th>
  <th className="text-left font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Price</th>
  <th className="text-left font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Stock</th>
  <th className="text-left font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Featured</th>
  <th className="text-right font-mono text-[10px] tracking-widest text-slate/60 uppercase px-5 py-3">Actions</th>
</tr>
          </thead>
          <tbody>
            {loading ? (
  <tr><td colSpan={7} className="text-center py-10 text-slate font-body">Loading…</td></tr>
) : products.length === 0 ? (
  <tr><td colSpan={7} className="text-center py-10 text-slate font-body">No products yet — add your first one.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-b border-ink/5 last:border-b-0 hover:bg-steel/20">
                  <td className="px-5 py-3 font-mono text-xs text-slate">{p.partNo}</td>
                  <td className="px-5 py-3 font-body text-ink font-medium">{p.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-blueprint">{p.category?.name}</td>
                  <td className="px-5 py-3 font-body text-ink">PKR {p.price?.toLocaleString()}</td>
                  <td className="px-5 py-3 font-mono text-xs text-slate">{p.stock}</td>
                  <td className="px-5 py-3">
  <button onClick={() => toggleFeatured(p)} className={p.featured ? 'text-gold' : 'text-slate/30 hover:text-gold'}>
    <FaStar size={14} />
  </button>
</td>
<td className="px-5 py-3">
  <div className="flex items-center justify-end gap-3">
    <Link to={`/products/${p.id}/edit`} className="text-slate hover:text-blueprint transition-colors">
      <FaEdit size={14} />
    </Link>
    <button onClick={() => handleDelete(p.id, p.name)} className="text-slate hover:text-ignition transition-colors">
      <FaTrash size={14} />
    </button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between mt-5 font-mono text-xs text-slate/60">
          <span>{total} total products</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 border border-ink/10 rounded-md disabled:opacity-30"
            >
              Prev
            </button>
            <span className="px-2 py-1.5">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={products.length < 12}
              className="px-3 py-1.5 border border-ink/10 rounded-md disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList