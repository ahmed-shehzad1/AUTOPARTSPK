import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../api/client'

const CONDITIONS = ['New', 'Used', 'Refurbished']
const STOCK_OPTIONS = ['In Stock', 'Limited Stock', 'Backorder']

const EMPTY_FORM = {
  partNo: '', name: '', description: '', partBrand: '',
  condition: 'New', stock: 'In Stock', featured: false,
  price: '', wholesalePrice: '', wholesaleMinQty: '', moq: 1, unit: 'pcs',
  rfqThreshold: 100, categoryId: '',
}

function ProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [images, setImages] = useState([]) // existing images (edit mode)
  const [pendingImages, setPendingImages] = useState([]) // uploaded URLs before product exists (create mode)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data))
  }, [])

  useEffect(() => {
    if (!isEdit) return
api.get(`/products/${id}`).then((res) => {
      const p = res.data
        setForm({
        partNo: p.partNo, name: p.name, description: p.description || '',
        partBrand: p.partBrand, condition: p.condition, featured: p.featured, stock: p.stock,
        price: p.price, wholesalePrice: p.wholesalePrice, wholesaleMinQty: p.wholesaleMinQty,
        moq: p.moq, unit: p.unit, rfqThreshold: p.rfqThreshold, categoryId: p.categoryId,
      })
      setImages(p.images || [])
      setLoading(false)
    })
  }, [id, isEdit])

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))
const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const url = uploadRes.data.url

      if (isEdit) {
        const attachRes = await api.post(`/products/${id}/images`, { url })
        setImages((prev) => [...prev, attachRes.data])
      } else {
        setPendingImages((prev) => [...prev, url])
      }
    } catch (err) {
      alert('Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteExistingImage = async (imageId) => {
    try {
      await api.delete(`/products/images/${imageId}`)
      setImages((prev) => prev.filter((img) => img.id !== imageId))
    } catch {
      alert('Failed to delete image.')
    }
  }

  const handleRemovePendingImage = (url) => {
    setPendingImages((prev) => prev.filter((u) => u !== url))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.partNo || !form.name || !form.categoryId) {
      setError('Part number, name, and category are required.')
      return
    }

const payload = {
      ...form,
      price: Number(form.price),
      wholesalePrice: Number(form.wholesalePrice),
      wholesaleMinQty: Number(form.wholesaleMinQty),
      moq: Number(form.moq),
      rfqThreshold: Number(form.rfqThreshold),
      images: isEdit ? undefined : pendingImages,
    }

    setSaving(true)
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload)
      } else {
        await api.post('/products', payload)
      }
      navigate('/products')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save product.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-8 font-body text-slate">Loading…</div>

  return (
    <div className="p-8 max-w-3xl">
      <Link to="/products" className="flex items-center gap-2 font-mono text-xs text-slate hover:text-blueprint transition-colors mb-6 w-fit">
        <FaArrowLeft size={10} /> Back to Products
      </Link>

      <h1 className="font-display font-semibold text-2xl text-ink mb-8">
        {isEdit ? 'Edit Product' : 'Add Product'}
      </h1>

      

      <form onSubmit={handleSubmit} className="bg-paper border border-ink/10 rounded-lg p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Part Number *">
            <input value={form.partNo} onChange={(e) => update('partNo', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Category *">
            <select value={form.categoryId} onChange={(e) => update('categoryId', e.target.value)} className={inputClass}>
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Name *">
          <input value={form.name} onChange={(e) => update('name', e.target.value)} className={inputClass} />
        </Field>

        <Field label="Description">
          <textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} className={`${inputClass} resize-none`} />
        </Field>

       <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
         <Field label="Part Brand">
            <input value={form.partBrand} onChange={(e) => update('partBrand', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Condition">
            <select value={form.condition} onChange={(e) => update('condition', e.target.value)} className={inputClass}>
              {CONDITIONS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Stock Status">
            <select value={form.stock} onChange={(e) => update('stock', e.target.value)} className={inputClass}>
              {STOCK_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <Field label="Retail Price (PKR)">
            <input type="number" value={form.price} onChange={(e) => update('price', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Wholesale Price">
            <input type="number" value={form.wholesalePrice} onChange={(e) => update('wholesalePrice', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Wholesale Min Qty">
            <input type="number" value={form.wholesaleMinQty} onChange={(e) => update('wholesaleMinQty', e.target.value)} className={inputClass} />
          </Field>
          <Field label="RFQ Threshold">
            <input type="number" value={form.rfqThreshold} onChange={(e) => update('rfqThreshold', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Field label="Minimum Order Qty (MOQ)">
            <input type="number" value={form.moq} onChange={(e) => update('moq', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Unit">
            <input value={form.unit} onChange={(e) => update('unit', e.target.value)} placeholder="pcs, box, set..." className={inputClass} />
          </Field>
        </div>

        <Field label="Product Images">
          <div className="flex flex-wrap gap-3 mb-3">
            {(isEdit ? images : pendingImages.map((url) => ({ url }))).map((img, i) => (
              <div key={img.id || i} className="relative h-20 w-20 rounded-md overflow-hidden border border-ink/10 group">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => (isEdit ? handleDeleteExistingImage(img.id) : handleRemovePendingImage(img.url))}
                  className="absolute inset-0 bg-ink/60 text-paper text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <label className="inline-block bg-steel border border-ink/10 hover:border-blueprint px-4 py-2 rounded-md font-mono text-xs uppercase text-ink cursor-pointer transition-colors">
            {uploading ? 'Uploading…' : '+ Upload Image'}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
          </label>
        </Field>
        <label className="flex items-center gap-3 cursor-pointer">
  <input
    type="checkbox"
    checked={form.featured}
    onChange={(e) => update('featured', e.target.checked)}
    className="h-4 w-4 accent-blueprint"
  />
  <span className="font-body text-sm text-ink">Show in Featured Products on homepage</span>
</label>

        {error && <p className="font-mono text-xs text-ignition">{error}</p>}

        <div className="flex gap-3 pt-3">
          <button type="submit" disabled={saving} className="bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-blueprint transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Product'}
          </button>
          <Link to="/products" className="font-mono text-xs uppercase text-slate hover:text-ink transition-colors self-center">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

const inputClass = 'w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors'

function Field({ label, children }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">{label}</label>
      {children}
    </div>
  )
}

export default ProductForm