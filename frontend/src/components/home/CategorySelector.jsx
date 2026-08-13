import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SPRING = { type: 'spring', stiffness: 60, damping: 14 }

function CategorySelector({ categories, iconMap, fallbackIcon: Fallback }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [rotation, setRotation] = useState(0)

  if (!categories || categories.length === 0) {
    return <p className="font-body text-steel/50 text-sm">No categories yet.</p>
  }

  const n = categories.length
  const segmentAngle = 360 / n
  const active = categories[activeIdx]
  const ActiveIcon = iconMap[active.name] || Fallback

  const selectIndex = (i) => {
    const targetMod = (i * segmentAngle) % 360
    const currentMod = ((rotation % 360) + 360) % 360
    const delta = ((targetMod - currentMod + 540) % 360) - 180
    setRotation((r) => r + delta)
    setActiveIdx(i)
  }

  const spin = (dir) => {
    const nextIdx = (activeIdx + dir + n) % n
    setRotation((r) => r + dir * segmentAngle)
    setActiveIdx(nextIdx)
  }

  const ringRadiusPct = 42

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
      {/* Wheel */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[360px] aspect-square">
          {/* Rotating chrome dial */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={SPRING}
            style={{ transformOrigin: '50% 50%' }}
            className="absolute inset-[11%]"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <radialGradient id="chromeGrad" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="var(--color-paper)" />
                  <stop offset="30%" stopColor="var(--color-steel)" />
                  <stop offset="58%" stopColor="var(--color-blueprint-light)" />
                  <stop offset="82%" stopColor="var(--color-blueprint)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </radialGradient>
              </defs>

              {/* Tire tread */}
              <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-ink)" strokeWidth="9" strokeDasharray="2.5 3.2" opacity="0.85" />

              {/* Rim */}
              <circle cx="100" cy="100" r="77" fill="url(#chromeGrad)" stroke="var(--color-gold)" strokeWidth="1.2" opacity="0.95" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="var(--color-paper)" strokeWidth="0.75" opacity="0.25" />

              {/* Decorative spokes */}
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * 45 * Math.PI) / 180
                const x1 = 100 + 26 * Math.cos(a)
                const y1 = 100 + 26 * Math.sin(a)
                const x2 = 100 + 68 * Math.cos(a)
                const y2 = 100 + 68 * Math.sin(a)
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-gold)" strokeWidth="1" opacity="0.4" />
                )
              })}

              {/* Hub */}
              <circle cx="100" cy="100" r="24" fill="url(#chromeGrad)" stroke="var(--color-gold)" strokeWidth="1" />
              {Array.from({ length: 5 }).map((_, i) => {
                const a = (i * 72 * Math.PI) / 180
                const x = 100 + 15 * Math.cos(a)
                const y = 100 + 15 * Math.sin(a)
                return <circle key={i} cx={x} cy={y} r="2.4" fill="var(--color-ink)" />
              })}

              {/* Pointer marker */}
              <g>
                <polygon points="100,10 94,22 106,22" fill="var(--color-gold)" />
                <circle cx="100" cy="26" r="3.5" fill="var(--color-gold)" />
              </g>
            </svg>
          </motion.div>

          {/* Fixed icon ring */}
          {categories.map((cat, i) => {
            const angleDeg = -90 + i * segmentAngle
            const rad = (angleDeg * Math.PI) / 180
            const xPct = 50 + ringRadiusPct * Math.cos(rad)
            const yPct = 50 + ringRadiusPct * Math.sin(rad)
            const Icon = iconMap[cat.name] || Fallback
            const isActive = i === activeIdx

            return (
              <button
                key={cat.id}
                onClick={() => selectIndex(i)}
                style={{ left: `${xPct}%`, top: `${yPct}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-14 w-14 bg-blueprint shadow-lg shadow-blueprint/30 ring-2 ring-gold/60'
                    : 'h-11 w-11 bg-paper/8 border border-paper/15 hover:border-gold/40 hover:bg-paper/12'
                }`}
                title={cat.name}
              >
                <Icon className={isActive ? 'text-paper text-lg' : 'text-steel/50 text-sm'} />
              </button>
            )
          })}
        </div>

        {/* Spin controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => spin(-1)}
            className="h-9 w-9 rounded-full border border-paper/15 text-steel/60 hover:border-gold/50 hover:text-gold transition-colors flex items-center justify-center"
          >
            <FaChevronLeft size={12} />
          </button>
          <span className="font-mono text-[10px] tracking-widest text-steel/40 uppercase">Spin to browse</span>
          <button
            onClick={() => spin(1)}
            className="h-9 w-9 rounded-full border border-paper/15 text-steel/60 hover:border-gold/50 hover:text-gold transition-colors flex items-center justify-center"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Detail panel */}
      <div className="relative bg-gradient-to-br from-paper/8 to-paper/[0.02] border border-paper/10 rounded-xl p-7 md:p-9 overflow-hidden">
        {[
          'top-4 left-4 border-t border-l',
          'top-4 right-4 border-t border-r',
          'bottom-4 left-4 border-b border-l',
          'bottom-4 right-4 border-b border-r',
        ].map((pos) => (
          <span key={pos} className={`absolute ${pos} w-3 h-3 border-gold/40`} />
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blueprint to-blueprint-light flex items-center justify-center mb-6 shadow-lg shadow-blueprint/20 ring-2 ring-gold/30">
              <ActiveIcon className="text-paper text-2xl" />
            </div>

            <span className="font-mono text-[10px] tracking-widest text-gold uppercase block mb-2">
              Category {String(activeIdx + 1).padStart(2, '0')} of {String(n).padStart(2, '0')}
            </span>

            <h3 className="font-display font-semibold text-2xl md:text-3xl text-paper mb-7">
              {active.name}
            </h3>

            <Link
              to={`/products?category=${encodeURIComponent(active.name)}`}
              className="inline-flex items-center gap-2 bg-ignition text-paper font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-md hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Browse {active.name} <FaArrowRight size={11} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CategorySelector