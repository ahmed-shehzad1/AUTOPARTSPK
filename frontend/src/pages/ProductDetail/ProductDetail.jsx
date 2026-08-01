import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaCheckCircle, FaTag } from 'react-icons/fa'
import { PRODUCTS } from '../../data/products'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const STOCK_DOT = {
  'In Stock': 'bg-blueprint',
  'Limited Stock': 'bg-ignition',
  'Backorder': 'bg-slate',
}
const CONDITION_STRIPE = {
  New: 'bg-blueprint',
  Used: 'bg-slate',
  Refurbished: 'bg-ignition',
}

function ProductDetail() {
  const { id } = useParams()
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id])
  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(product?.moq ?? 1)

  if (!product) {
    return (
      <div className="bg-steel min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-xl text-ink mb-3">Product not found</p>
          <Link to="/products" className="font-mono text-sm text-blueprint hover:underline">
            ← Back to Catalog
          </Link>
        </div>
      </div>
    )
  }

  const navigate = useNavigate()
const { addToCart } = useCart()
const [added, setAdded] = useState(false)

const handleAddToCart = () => {
  addToCart(product, qty)
  setAdded(true)
  setTimeout(() => setAdded(false), 2000)
}

const handleRequestQuote = () => {
  navigate('/wholesale', {
    state: { prefill: `Requesting a quote for ${product.name} (Part No. ${product.partNo}) — Quantity: ${qty} ${product.unit}` },
  })
}

  const isWholesale = qty >= product.wholesaleMinQty
  const isRFQ = qty >= product.rfqThreshold
  const unitPrice = isWholesale ? product.wholesalePrice : product.price
  const total = unitPrice * qty

  const clampQty = (value) => Math.max(product.moq, value)

  return (
    <div className="bg-steel min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-paper border-b border-ink/10 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 font-mono text-xs text-slate/60 uppercase tracking-widest">
          <Link to="/products" className="hover:text-blueprint transition-colors">Catalog</Link>
          {' / '}
          <span>{product.category}</span>
          {' / '}
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          {product.images.length > 0 ? (
            <>
              <div className="relative bg-paper border border-ink/10 rounded-lg overflow-hidden h-80 md:h-96 mb-3">
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 rounded-md overflow-hidden border-2 transition-colors ${
                        activeImage === i ? 'border-blueprint' : 'border-ink/10'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            // No photo yet — an honest placeholder identity, not a broken image icon
            <div className="relative bg-paper border border-ink/10 rounded-lg h-80 md:h-96 flex flex-col items-center justify-center text-center">
              <svg width="48" height="48" viewBox="0 0 26 26" fill="none" className="text-slate/30 mb-4">
                <circle cx="13" cy="13" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
                <line x1="13" y1="1" x2="13" y2="25" stroke="currentColor" strokeWidth="1" />
                <line x1="1" y1="13" x2="25" y2="13" stroke="currentColor" strokeWidth="1" />
              </svg>
              <p className="font-mono text-xs text-slate/50 uppercase tracking-widest">
                Photo not yet available
              </p>
              <p className="font-mono text-[10px] text-slate/30 mt-1">
                Part No. {product.partNo}
              </p>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="relative">
          <span className={`absolute -top-2 left-0 h-[3px] w-16 ${CONDITION_STRIPE[product.condition]}`} />

          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
              {product.category} · {product.partBrand}
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-slate/60">
              <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[product.stock]}`} /> {product.stock}
            </span>
          </div>

          <h1 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-2">
            {product.name}
          </h1>
          <p className="font-mono text-sm text-slate/60 mb-6">
            Part No. {product.partNo} · {product.condition}
          </p>

          <p className="font-body text-slate mb-8 max-w-lg">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="bg-paper border border-ink/10 rounded-lg p-6 mb-6">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-display font-semibold text-2xl text-ink">
                PKR {product.price.toLocaleString()}
              </span>
              <span className="font-mono text-xs text-slate/50 uppercase">per {product.unit}</span>
            </div>
            <p className="font-mono text-xs text-blueprint uppercase mb-5">
              Wholesale PKR {product.wholesalePrice.toLocaleString()} at {product.wholesaleMinQty}+ {product.unit}
            </p>

            {/* Quantity selector */}
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
              Quantity (min. {product.moq} {product.unit})
            </label>
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setQty((q) => clampQty(q - 1))}
                className="h-10 w-10 rounded-md border border-ink/10 bg-steel text-ink hover:border-blueprint transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={qty}
                min={product.moq}
                onChange={(e) => setQty(clampQty(Number(e.target.value) || product.moq))}
                onBlur={(e) => setQty(clampQty(Number(e.target.value) || product.moq))}
                className="w-20 text-center bg-steel border border-ink/10 rounded-md py-2 font-body text-ink focus:outline-none focus:border-blueprint"
              />
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-10 w-10 rounded-md border border-ink/10 bg-steel text-ink hover:border-blueprint transition-colors"
              >
                +
              </button>
              {isWholesale && (
                <span className="flex items-center gap-1 font-mono text-[10px] text-ignition uppercase ml-1">
                  <FaTag size={9} /> Wholesale rate applied
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between pt-4 border-t border-ink/10 mb-5">
              <span className="font-mono text-xs text-slate/60 uppercase">Estimated total</span>
              <span className="font-display font-semibold text-xl text-ink">
                PKR {total.toLocaleString()}
              </span>
            </div>

           {isRFQ ? (
  <button onClick={handleRequestQuote} className="w-full bg-blueprint text-paper font-medium py-3 rounded-md hover:brightness-95 transition">
    Request a Quote for This Quantity
  </button>
) : (
  <button onClick={handleAddToCart} className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors">
    {added ? 'Added ✓' : 'Add to Cart'}
  </button>
)}

            {isRFQ && (
              <p className="font-mono text-[10px] text-slate/50 uppercase mt-3 text-center">
                Large orders are confirmed manually for pricing &amp; availability
              </p>
            )}
          </div>

          {/* Fitment */}
          <div className="mb-6">
            <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
              Vehicle Fitment
            </span>
            <div className="flex flex-wrap gap-2">
              {product.fitment.map((f) => (
                <span
                  key={`${f.make}-${f.model}`}
                  className="font-mono text-xs bg-paper border border-ink/10 rounded-md px-3 py-1.5 text-ink"
                >
                  {f.make} {f.model} ({f.yearFrom}–{f.yearTo})
                </span>
              ))}
            </div>
          </div>

          {/* Cross-references */}
          <div>
            <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
              Cross-Reference Numbers
            </span>
            <div className="flex flex-wrap gap-2">
              {product.crossReferences.map((ref) => (
                <span
                  key={ref}
                  className="font-mono text-xs bg-steel border border-ink/10 rounded-md px-3 py-1.5 text-slate"
                >
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail