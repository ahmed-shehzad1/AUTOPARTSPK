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

function ringOffset(index, active, n) {
  let raw = index - active
  if (raw > n / 2) raw -= n
  if (raw < -n / 2) raw += n
  return raw
}

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-ink/8 rounded-lg ${className}`} />
}

const CARD_W = 220
const CARD_H = 300
const IMG_H = 130
const STEP = 172

function FeaturedCarousel({ products, loading }) {
  const [active, setActive] = useState(0)
  const n = products?.length || 0

  if (loading) {
    return (
      <div className="flex justify-center gap-6">
        {[1, 2, 3].map((i) => <Skeleton key={i} className="w-56 h-72" />)}
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
    <div className="w-full flex flex-col items-center">
      {/* Colored glow fills the dead space and gives the section actual presence */}
      <div
        className="relative w-full flex justify-center"
        style={{ height: CARD_H + 40 }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{
            width: 420, height: 420,
            background: 'radial-gradient(circle, var(--color-blueprint) 0%, var(--color-gold) 55%, transparent 75%)',
          }}
        />

        <div className="relative" style={{ width: CARD_W, height: CARD_H + 20 }}>
          {products.map((p, i) => {
            const offset = ringOffset(i, active, n)
            const abs = Math.abs(offset)
            const isCenter = offset === 0
            const visible = abs <= 3

            return (
              <motion.div
                key={p.id}
                initial={false}
                animate={{
                  x: offset * STEP,
                  scale: isCenter ? 1 : Math.max(0.72, 1 - abs * 0.14),
                  y: isCenter ? 0 : abs * 6,
                  opacity: visible ? Math.max(0, 1 - abs * 0.38) : 0,
                  zIndex: 50 - abs,
                }}
                transition={{ type: 'spring', stiffness: 340, damping: 34 }}
                onClick={() => !isCenter && goTo(i)}
                style={{ width: CARD_W, top: 0, left: 0 }}
                className={`absolute ${isCenter ? '' : 'cursor-pointer'}`}
              >
                <Link
                  to={`/products/${p.id}`}
                  onClick={(e) => !isCenter && e.preventDefault()}
                  tabIndex={isCenter ? 0 : -1}
                  style={{ height: CARD_H }}
                  className={`group relative flex flex-col bg-paper border rounded-xl overflow-hidden transition-shadow duration-300 ${
                    isCenter
                      ? 'border-blueprint shadow-[0_20px_45px_-15px_rgba(30,94,168,0.35)]'
                      : 'border-ink/10 shadow-sm'
                  }`}
                >
                  <span className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${CONDITION_STRIPE[p.condition] || 'bg-blueprint'}`} />

                  {isCenter && (
                    <>
                      <span className="absolute top-3 left-2.5 w-3 h-3 border-t border-l border-blueprint z-10" />
                      <span className="absolute top-3 right-2.5 w-3 h-3 border-t border-r border-blueprint z-10" />
                    </>
                  )}

                  {/* Fixed-height, clipped image box — never relies on aspect-ratio utilities */}
                  <div
                    className="relative bg-steel border-b border-ink/10 overflow-hidden shrink-0"
                    style={{ height: IMG_H }}
                  >
                    <span className="absolute top-2 right-2 z-10 flex items-center gap-1.5 font-mono text-[9px] uppercase text-ink bg-paper/90 px-2 py-1 rounded">
                      <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock] || 'bg-blueprint'}`} /> {p.stock}
                    </span>
                    {p.images && p.images.length > 0 ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-[10px] text-slate/40 uppercase px-4 text-center">No image yet</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow min-h-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] tracking-widest text-blueprint uppercase truncate">
                        {p.category?.name}
                      </span>
                      <span className="font-mono text-[9px] text-slate/50 uppercase truncate">{p.partBrand}</span>
                    </div>
                    <h3 className="font-display font-semibold text-ink text-sm mb-2 line-clamp-1">{p.name}</h3>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate mb-3 truncate">
                      <FaTag size={8} className="text-blueprint shrink-0" /> {p.partNo}
                    </div>
                    <div className="mt-auto pt-3 border-t border-ink/5">
                      <span className="font-display font-semibold text-ink text-sm">PKR {p.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
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