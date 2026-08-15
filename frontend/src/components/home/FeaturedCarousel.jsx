import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-ink/8 rounded-lg ${className}`} />
}

function FeaturedCarousel({ products, loading }) {
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const scrollByCard = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const cardWidth = card ? card.offsetWidth + 20 : 260
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }

  // Track which card is closest to the center of the viewport, to drive the dots.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const cards = el.querySelectorAll('[data-card]')
      const center = el.scrollLeft + el.clientWidth / 2
      let closest = 0
      let closestDist = Infinity
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2
        const dist = Math.abs(cardCenter - center)
        if (dist < closestDist) { closestDist = dist; closest = i }
      })
      setActiveIdx(closest)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [products])

  const goToCard = (i) => {
    const el = scrollRef.current
    const card = el?.querySelectorAll('[data-card]')[i]
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  if (loading) {
    return (
      <div className="flex gap-5 overflow-hidden">
        {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="w-64 h-80 shrink-0" />)}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <p className="font-body text-slate text-sm text-center py-16">
        No featured products yet — add some from the admin panel.
      </p>
    )
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((p) => (
          <Link
            key={p.id}
            data-card
            to={`/products/${p.id}`}
            className="group relative shrink-0 w-60 snap-center bg-paper border border-ink/10 rounded-lg overflow-hidden flex flex-col hover:border-blueprint hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <span className={`absolute top-0 left-0 right-0 h-[3px] z-10 ${CONDITION_STRIPE[p.condition] || 'bg-blueprint'}`} />
            {['top-3 left-2.5 border-t border-l', 'top-3 right-2.5 border-t border-r'].map((pos) => (
              <span key={pos} className={`absolute ${pos} w-3 h-3 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />
            ))}

            <div className="relative h-36 bg-steel border-b border-ink/10 overflow-hidden shrink-0">
              <span className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 font-mono text-[9px] uppercase text-ink bg-paper/90 px-2 py-1 rounded">
                <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock] || 'bg-blueprint'}`} /> {p.stock}
              </span>
              {p.images && p.images.length > 0 ? (
                <img
                  src={p.images[0].url}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-slate/40 uppercase px-4 text-center">No image yet</span>
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[9px] tracking-widest text-blueprint uppercase truncate">
                  {p.category?.name}
                </span>
                <span className="font-mono text-[9px] text-slate/50 uppercase truncate">{p.partBrand}</span>
              </div>
              <h3 className="font-display font-semibold text-ink text-sm mb-2 line-clamp-1 group-hover:text-blueprint transition-colors">
                {p.name}
              </h3>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate mb-3">
                <FaTag size={8} className="text-blueprint shrink-0" /> {p.partNo}
              </div>
              <div className="mt-auto pt-3 border-t border-ink/5">
                <span className="font-display font-semibold text-ink text-sm">PKR {p.price?.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-5 mt-4">
        <button
          onClick={() => scrollByCard(-1)}
          className="h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink/70 hover:border-blueprint hover:text-blueprint transition-colors flex items-center justify-center"
        >
          <FaChevronLeft size={13} />
        </button>

        <div className="flex gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goToCard(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? 'w-6 bg-blueprint' : 'w-1.5 bg-ink/15 hover:bg-ink/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollByCard(1)}
          className="h-10 w-10 rounded-full border border-ink/10 bg-paper text-ink/70 hover:border-blueprint hover:text-blueprint transition-colors flex items-center justify-center"
        >
          <FaChevronRight size={13} />
        </button>
      </div>
    </div>
  )
}

export default FeaturedCarousel