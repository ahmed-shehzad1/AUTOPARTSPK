import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SPRING = { type: 'spring', stiffness: 50, damping: 15, mass: 0.8 }

export default function CategorySelector({ categories, iconMap, fallbackIcon: Fallback }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [rotation, setRotation] = useState(0)
  const activeIdxRef = useRef(0)
  const pausedRef = useRef(false)
  const resumeTimeoutRef = useRef(null)

  // Safely determine the number of categories.
  const n = categories?.length || 0
  const segmentAngle = n > 0 ? 360 / n : 0

  // Keep active index within valid range if categories change.
  useEffect(() => {
    if (n === 0) return

    if (activeIdx >= n) {
      setActiveIdx(0)
      setRotation(0)
    }
  }, [n, activeIdx])

  useEffect(() => {
    activeIdxRef.current = activeIdx
  }, [activeIdx])

  // Smooth shortest-path rotation calculation.
  const selectIndex = (i) => {
    if (n === 0) return

    const targetAngle = -i * segmentAngle
    const currentMod = rotation % 360

    let delta = (targetAngle - currentMod) % 360

    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360

    setRotation((prev) => prev + delta)
    setActiveIdx(i)
  }

  // Auto-advance every 4s.
  useEffect(() => {
    if (n <= 1) return

    const interval = setInterval(() => {
      if (pausedRef.current) return

      const next = (activeIdxRef.current + 1) % n
      selectIndex(next)
    }, 4000)

    return () => clearInterval(interval)
  }, [n, rotation])

  // Pause autoplay after manual interaction.
  const pauseAutoplay = () => {
    pausedRef.current = true

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
    }, 6000)
  }

  // Manual previous / next.
  const spin = (dir) => {
    if (n === 0) return

    const nextIdx = (activeIdx + dir + n) % n
    selectIndex(nextIdx)
  }

  if (!categories || categories.length === 0) {
    return (
      <p className="font-body text-[var(--color-slate)] text-sm">
        No categories available.
      </p>
    )
  }

  const active = categories[activeIdx] || categories[0]

  const ActiveIcon =
    (iconMap && iconMap[active.name]) ||
    Fallback ||
    FaArrowRight

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-center max-w-6xl mx-auto p-4">
      {/* Simplified construction: the wheel uses broad forged surfaces, a deep barrel, and restrained edge highlights instead of many competing details. */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[440px] aspect-square select-none">
          {/* Fixed position marker */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-[var(--color-gold)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-ignition)] ring-2 ring-[var(--color-paper)] mt-1" />
          </div>

          {/* Static brake assembly behind the wheel */}
          <div className="absolute inset-0 z-0 p-7 sm:p-8">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="categoryRotorMetal" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="var(--color-steel)" />
                  <stop offset="55%" stopColor="var(--color-slate)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </radialGradient>

                <linearGradient id="categoryCaliper" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-blueprint-light)" />
                  <stop offset="55%" stopColor="var(--color-blueprint)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </linearGradient>
              </defs>

              <circle
                cx="250"
                cy="250"
                r="174"
                fill="url(#categoryRotorMetal)"
                opacity="0.72"
              />

              <circle
                cx="250"
                cy="250"
                r="153"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth="1"
                opacity="0.12"
              />

              <circle
                cx="250"
                cy="250"
                r="126"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="14"
                opacity="0.5"
              />

              <path
                d="M365 126 C397 150 411 194 408 239 C406 271 394 294 373 309 L344 286 C359 259 363 226 356 192 C351 166 340 148 326 136 Z"
                fill="url(#categoryCaliper)"
                opacity="0.95"
              />

              <path
                d="M359 163 C371 184 376 210 374 237"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
              />
            </svg>
          </div>

          {/* Rotating forged wheel */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={SPRING}
            style={{ transformOrigin: '50% 50%' }}
            className="absolute inset-0 z-10"
          >
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="categoryTire" cx="38%" cy="32%" r="78%">
                  <stop offset="0%" stopColor="var(--color-slate)" />
                  <stop offset="58%" stopColor="var(--color-ink)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </radialGradient>

                <radialGradient id="categoryRimFace" cx="34%" cy="28%" r="78%">
                  <stop offset="0%" stopColor="var(--color-paper)" />
                  <stop offset="28%" stopColor="var(--color-steel)" />
                  <stop offset="62%" stopColor="var(--color-slate)" />
                  <stop offset="88%" stopColor="var(--color-ink)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </radialGradient>

                <linearGradient id="categorySpokeLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-paper)" />
                  <stop offset="42%" stopColor="var(--color-steel)" />
                  <stop offset="100%" stopColor="var(--color-slate)" />
                </linearGradient>

                <linearGradient id="categorySpokeDark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-slate)" />
                  <stop offset="55%" stopColor="var(--color-ink)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </linearGradient>

                <radialGradient id="categoryHub" cx="32%" cy="25%" r="80%">
                  <stop offset="0%" stopColor="var(--color-steel)" />
                  <stop offset="55%" stopColor="var(--color-slate)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </radialGradient>
              </defs>

              {/* Tire: broad, quiet sidewall with only a few structural rings. */}
              <circle
                cx="250"
                cy="250"
                r="239"
                fill="url(#categoryTire)"
                stroke="var(--color-ink)"
                strokeWidth="4"
              />

              <circle
                cx="250"
                cy="250"
                r="226"
                fill="none"
                stroke="var(--color-slate)"
                strokeWidth="1"
                opacity="0.45"
              />

              <circle
                cx="250"
                cy="250"
                r="214"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth="1"
                opacity="0.08"
              />

              {/* Subtle directional shoulder blocks. */}
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={`shoulder-${i}`}
                  d="M250 16 L258 34 L252 48 L244 32 Z"
                  fill="var(--color-slate)"
                  opacity="0.28"
                  transform={`rotate(${i * 22.5} 250 250)`}
                />
              ))}

              {/* Main forged rim barrel. */}
              <circle
                cx="250"
                cy="250"
                r="198"
                fill="url(#categoryRimFace)"
                stroke="var(--color-steel)"
                strokeWidth="2"
              />

              <circle
                cx="250"
                cy="250"
                r="190"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth="2"
                opacity="0.35"
              />

              <circle
                cx="250"
                cy="250"
                r="178"
                fill="var(--color-ink)"
                stroke="var(--color-slate)"
                strokeWidth="3"
              />

              {/* Six broad split spokes create the premium forged-wheel silhouette. */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = i * 60

                return (
                  <g key={`spoke-${i}`} transform={`rotate(${angle} 250 250)`}>
                    <path
                      d="M239 250 L221 108 Q250 91 279 108 L261 250 Z"
                      fill="url(#categorySpokeDark)"
                      stroke="var(--color-ink)"
                      strokeWidth="3"
                    />

                    <path
                      d="M244 250 L232 112 Q250 103 267 112 L255 250 Z"
                      fill="url(#categorySpokeLight)"
                      opacity="0.95"
                    />

                    <path
                      d="M248 250 L242 116"
                      fill="none"
                      stroke="var(--color-paper)"
                      strokeWidth="2"
                      opacity="0.38"
                    />

                    <path
                      d="M258 250 L270 116"
                      fill="none"
                      stroke="var(--color-ink)"
                      strokeWidth="5"
                      opacity="0.6"
                    />
                  </g>
                )
              })}

              {/* Deep center pocket. */}
              <circle
                cx="250"
                cy="250"
                r="76"
                fill="var(--color-ink)"
                stroke="var(--color-slate)"
                strokeWidth="3"
              />

              <circle
                cx="250"
                cy="250"
                r="65"
                fill="url(#categoryHub)"
                stroke="var(--color-steel)"
                strokeWidth="2"
              />

              {/* Five restrained lug details. */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i * 72 * Math.PI) / 180 - Math.PI / 2
                const lx = 250 + 40 * Math.cos(angle)
                const ly = 250 + 40 * Math.sin(angle)

                return (
                  <g key={`lug-${i}`}>
                    <circle
                      cx={lx}
                      cy={ly}
                      r="8"
                      fill="var(--color-ink)"
                      stroke="var(--color-slate)"
                      strokeWidth="1.5"
                    />

                    <circle
                      cx={lx}
                      cy={ly}
                      r="4"
                      fill="var(--color-steel)"
                    />
                  </g>
                )
              })}

              {/* Minimal premium center badge. */}
              <circle
                cx="250"
                cy="250"
                r="27"
                fill="var(--color-ink)"
                stroke="var(--color-gold)"
                strokeWidth="2"
              />

              <circle
                cx="250"
                cy="250"
                r="21"
                fill="var(--color-blueprint)"
                stroke="var(--color-steel)"
                strokeWidth="1"
              />

              <path
                d="M242 256 L250 239 L258 256 L250 252 Z"
                fill="var(--color-paper)"
              />
            </svg>

            {/* Category icons retain their original rotation positioning and counter-rotation behavior. */}
            {categories.map((cat, i) => {
              const itemAngle = i * segmentAngle - 90
              const rad = (itemAngle * Math.PI) / 180
              const radiusPct = 34
              const xPct = 50 + radiusPct * Math.cos(rad)
              const yPct = 50 + radiusPct * Math.sin(rad)

              const Icon =
                (iconMap && iconMap[cat.name]) ||
                Fallback ||
                FaArrowRight

              const isActive = i === activeIdx

              return (
                <div
                  key={cat.id || `cat-${i}`}
                  style={{ left: `${xPct}%`, top: `${yPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => {
                      pauseAutoplay()
                      selectIndex(i)
                    }}
                    className="group relative flex items-center justify-center focus:outline-none"
                    title={cat.name}
                  >
                    <motion.div
                      animate={{ rotate: -rotation }}
                      transition={SPRING}
                      className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-14 h-14 bg-[var(--color-blueprint)] text-[var(--color-paper)] border-2 border-[var(--color-gold)] shadow-lg scale-110'
                          : 'w-10 h-10 bg-[var(--color-ink)] text-[var(--color-steel)] border border-[var(--color-slate)]/60 hover:border-[var(--color-gold)] hover:text-[var(--color-paper)] hover:scale-105'
                      }`}
                    >
                      <Icon className={isActive ? 'text-lg' : 'text-sm'} />
                    </motion.div>

                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border border-[var(--color-gold)]/50 pointer-events-none" />
                    )}
                  </button>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Rotation controls */}
        <div className="flex items-center gap-4 mt-5 z-20">
          <button
            onClick={() => {
              pauseAutoplay()
              spin(-1)
            }}
            className="h-10 w-10 rounded-full bg-[var(--color-ink)] border border-[var(--color-slate)]/60 text-[var(--color-steel)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all flex items-center justify-center active:scale-95"
            aria-label="Previous Category"
          >
            <FaChevronLeft size={12} />
          </button>

          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--color-ink)] border border-[var(--color-slate)]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />

            <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-slate)] uppercase">
              Select Category
            </span>
          </div>

          <button
            onClick={() => {
              pauseAutoplay()
              spin(1)
            }}
            className="h-10 w-10 rounded-full bg-[var(--color-ink)] border border-[var(--color-slate)]/60 text-[var(--color-steel)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all flex items-center justify-center active:scale-95"
            aria-label="Next Category"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Category detail panel */}
      <div className="relative overflow-hidden bg-[var(--color-ink)] border border-[var(--color-slate)]/40 rounded-2xl p-7 sm:p-8 lg:p-10 shadow-2xl">
        {/* Thin technical frame keeps the panel premium without competing with the wheel. */}
        <span className="absolute top-0 left-8 right-8 h-px bg-[var(--color-gold)]/50" />
        <span className="absolute bottom-0 left-8 right-8 h-px bg-[var(--color-slate)]/40" />

        <span className="absolute top-5 left-5 w-3 h-3 border-t border-l border-[var(--color-gold)]/70" />
        <span className="absolute top-5 right-5 w-3 h-3 border-t border-r border-[var(--color-gold)]/70" />
        <span className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-[var(--color-gold)]/70" />
        <span className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-[var(--color-gold)]/70" />

        <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-[var(--color-blueprint)]/20 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id || active.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-start"
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="h-14 w-14 rounded-xl bg-[var(--color-blueprint)] border border-[var(--color-gold)]/50 flex items-center justify-center">
                <ActiveIcon className="text-[var(--color-paper)] text-xl" />
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-1">
                  SYSTEM SPEC // {String(activeIdx + 1).padStart(2, '0')} OF {String(n).padStart(2, '0')}
                </span>

                <span className="font-mono text-[10px] tracking-widest text-[var(--color-slate)] uppercase">
                  OEM Part Group
                </span>
              </div>
            </div>

            <div className="w-10 h-px bg-[var(--color-gold)] mb-5" />

            <h3 className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-paper)] tracking-tight mb-4">
              {active.name}
            </h3>

            <p className="font-body text-sm text-[var(--color-steel)] opacity-80 leading-relaxed mb-8 max-w-lg">
              Explore wholesale inventory, assemblies, and high-performance replacement components engineered for {active.name.toLowerCase()}.
            </p>

            <Link
              to={`/products?category=${encodeURIComponent(active.name)}`}
              className="inline-flex items-center gap-3 bg-[var(--color-ignition)] text-[var(--color-paper)] font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-lg hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <span>Browse {active.name}</span>
              <FaArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}