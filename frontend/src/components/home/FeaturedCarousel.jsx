import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaTag } from 'react-icons/fa'

const STOCK_DOT = {
  'In Stock': 'bg-blueprint',
  'Limited Stock': 'bg-ignition',
  Backorder: 'bg-slate',
}
const CONDITION_STRIPE = {
  New: 'bg-blueprint',
  Used: 'bg-slate',
  Refurbished: 'bg-ignition',
}

// Shortest signed circular distance between two indices in a ring of size n.
// This is what makes the carousel wrap around like a real ring instead of a flat strip.
function ringOffset(index, active, n) {
  let raw = index - active
  if (raw > n / 2) raw -= n
  if (raw < -n / 2) raw += n
  return raw
}

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-ink/8 rounded-lg ${className}`} />
}

function FeaturedCarousel({ products, loading }) {
  const [active, setActive] = useState(0)
  const n = products?.length || 0

  if (loading) {
    return (
      <div className="flex justify-center gap-5">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="w-64 h-80" />)}
      </div>
    )
  }

  if (n === 0) {
    return (
      <p className="font-body text-slate text-sm text-center py-16">
        No featured products yet — add some from the admin panel.
      </p>
    )
  }

  const goTo = (i) => setActive(((i % n) + n) % n)

  return (
    <div>
      <div className="relative h-[440px] md:h-[420px] [perspective:none]">
        {products.map((p, i) => {
          const offset = ringOffset(i, active, n)
          const abs = Math.abs(offset)
          const isCenter = offset === 0
          const visible = abs <= 2

          return (
            <motion.div
              key={p.id}
              animate={{
                x: `${offset * 62}%`,
                scale: isCenter ? 1 : Math.max(0.68, 1 - abs * 0.16),
                opacity: visible ? Math.max(0, 1 - abs * 0.4) : 0,
                rotate: offset * -3,
                zIndex: 50 - abs,
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
              onClick={() => !isCenter && goTo(i)}
              className={`absolute left-1/2 top-0 w-64 md:w-72 -translate-x-1/2 ${
                visible ? '' : 'pointer-events-none'
              } ${isCenter ? 'cursor-default' : 'cursor-pointer'}`}
              style={{ pointerEvents: visible ? 'auto' : 'none' }}
            >
              <Link
                to={`/products/${p.id}`}
                onClick={(e) => !isCenter && e.preventDefault()}
                className={`group relative block bg-paper border rounded-lg overflow-hidden flex flex-col h-full transition-shadow duration-300 ${
                  isCenter ? 'border-blueprint shadow-xl' : 'border-ink/10 shadow-sm'
                }`}
              >
                <span className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${CONDITION_STRIPE[p.condition] || 'bg-blueprint'}`} />

                {isCenter && (
                  <>
                    <span className="absolute top-3 left-2 w-3 h-3 border-t border-l border-blueprint z-10" />
                    <span className="absolute top-3 right-2 w-3 h-3 border-t border-r border-blueprint z-10" />
                  </>
                )}

                <div className="relative h-36 bg-steel border-b border-ink/10 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-3 right-3 z-10 flex items-center gap-1.5 font-mono text-[9px] uppercase text-ink bg-paper/90 px-2 py-1 rounded">
                    <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock] || 'bg-blueprint'}`} /> {p.stock}
                  </span>
                  {p.images && p.images.length > 0 ? (
                    <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-mono text-[10px] text-slate/40 uppercase">No image yet</span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase">
                      {p.category?.name}
                    </span>
                    <span className="font-mono text-[10px] text-slate/50 uppercase">{p.partBrand}</span>
                  </div>
                  <h3 className="font-display font-semibold text-ink text-sm mb-2 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate mb-4">
                    <FaTag size={9} className="text-blueprint" /> {p.partNo}
                  </div>
                  <div className="mt-auto pt-3 border-t border-ink/5">
                    <span className="font-display font-semibold text-ink">PKR {p.price?.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={() => goTo(active - 1)}
          className="h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink/70 hover:border-blueprint hover:text-blueprint transition-colors flex items-center justify-center"
        >
          <FaChevronLeft size={13} />
        </button>

        <div className="flex gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-6 bg-blueprint' : 'w-1.5 bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(active + 1)}
          className="h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink/70 hover:border-blueprint hover:text-blueprint transition-colors flex items-center justify-center"
        >
          <FaChevronRight size={13} />
        </button>
      </div>
    </div>
  )
}

export default FeaturedCarousel