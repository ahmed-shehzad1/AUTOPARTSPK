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

  const n = categories?.length || 0
  const segmentAngle = n > 0 ? 360 / n : 0

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

  // Keeps the wheel taking the shortest visual path between categories.
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

  // Automatically advances the selector while preserving the existing pause behavior.
  useEffect(() => {
    if (n <= 1) return

    const interval = setInterval(() => {
      if (pausedRef.current) return

      const next = (activeIdxRef.current + 1) % n
      selectIndex(next)
    }, 4000)

    return () => clearInterval(interval)
  }, [n, rotation])

  const pauseAutoplay = () => {
    pausedRef.current = true

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false
    }, 6000)
  }

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
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-14 items-center max-w-6xl mx-auto p-4">

      {/* =========================================================
          WHEEL
          The wheel is deliberately built from large, readable
          surfaces instead of many small decorative SVG layers.
          ========================================================= */}
      <div className="flex flex-col items-center">

        <div className="relative w-full max-w-[460px] aspect-square select-none">

          {/* Top orientation marker */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[11px] border-t-[var(--color-gold)]" />
            <div className="w-px h-3 bg-[var(--color-gold)]/60" />
          </div>

          {/* =====================================================
              BRAKE / ROTOR
              Darker than the alloy face so the wheel has depth.
              ===================================================== */}
          <div className="absolute inset-0 z-0 p-7 sm:p-8">

            <svg
              viewBox="0 0 500 500"
              className="w-full h-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient
                  id="rotorMetal"
                  cx="35%"
                  cy="30%"
                  r="75%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-steel)"
                  />
                  <stop
                    offset="60%"
                    stopColor="var(--color-slate)"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-ink)"
                  />
                </radialGradient>

                <linearGradient
                  id="caliperMetal"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-blueprint-light)"
                  />
                  <stop
                    offset="60%"
                    stopColor="var(--color-blueprint)"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-ink)"
                  />
                </linearGradient>
              </defs>

              <circle
                cx="250"
                cy="250"
                r="176"
                fill="url(#rotorMetal)"
              />

              <circle
                cx="250"
                cy="250"
                r="151"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="18"
                opacity="0.72"
              />

              <circle
                cx="250"
                cy="250"
                r="132"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth="1"
                opacity="0.12"
              />

              <path
                d="M366 126
                   C398 151 411 194 408 237
                   C406 270 394 296 373 312
                   L345 287
                   C359 259 363 226 356 193
                   C351 167 340 148 326 136 Z"
                fill="url(#caliperMetal)"
              />

              <path
                d="M359 164 C372 187 376 213 373 238"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* =====================================================
              ALLOY WHEEL
              Light machined face against dark tire/background.
              ===================================================== */}
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

                {/* Bright alloy surface */}
                <radialGradient
                  id="alloyFace"
                  cx="34%"
                  cy="24%"
                  r="82%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-paper)"
                  />
                  <stop
                    offset="34%"
                    stopColor="var(--color-steel)"
                  />
                  <stop
                    offset="67%"
                    stopColor="var(--color-steel)"
                  />
                  <stop
                    offset="86%"
                    stopColor="var(--color-slate)"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-ink)"
                  />
                </radialGradient>

                <linearGradient
                  id="alloySpoke"
                  x1="15%"
                  y1="5%"
                  x2="90%"
                  y2="95%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-paper)"
                  />
                  <stop
                    offset="30%"
                    stopColor="var(--color-steel)"
                  />
                  <stop
                    offset="72%"
                    stopColor="var(--color-steel)"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-slate)"
                  />
                </linearGradient>

                <radialGradient
                  id="alloyHub"
                  cx="30%"
                  cy="25%"
                  r="80%"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-paper)"
                  />
                  <stop
                    offset="42%"
                    stopColor="var(--color-steel)"
                  />
                  <stop
                    offset="75%"
                    stopColor="var(--color-slate)"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-ink)"
                  />
                </radialGradient>
              </defs>

              {/* =================================================
                  TIRE
                  ================================================= */}
              <circle
                cx="250"
                cy="250"
                r="239"
                fill="var(--color-ink)"
                stroke="var(--color-slate)"
                strokeWidth="5"
              />

              <circle
                cx="250"
                cy="250"
                r="226"
                fill="none"
                stroke="var(--color-paper)"
                strokeWidth="2"
                opacity="0.12"
              />

              {/* Very restrained shoulder markings */}
              {Array.from({ length: 16 }).map((_, i) => (
                <path
                  key={`shoulder-${i}`}
                  d="M250 16 L258 34 L252 48 L244 32 Z"
                  fill="var(--color-slate)"
                  opacity="0.24"
                  transform={`rotate(${i * 22.5} 250 250)`}
                />
              ))}

              {/* =================================================
                  OUTER ALLOY LIP
                  ================================================= */}
              <circle
                cx="250"
                cy="250"
                r="207"
                fill="url(#alloyFace)"
                stroke="var(--color-paper)"
                strokeWidth="3"
              />

              <circle
                cx="250"
                cy="250"
                r="194"
                fill="none"
                stroke="var(--color-slate)"
                strokeWidth="5"
              />

              {/* Deep inner barrel */}
              <circle
                cx="250"
                cy="250"
                r="181"
                fill="var(--color-ink)"
              />

              {/* =================================================
                  SIX FORGED SPOKES
                  ================================================= */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = i * 60

                return (
                  <g
                    key={`spoke-${i}`}
                    transform={`rotate(${angle} 250 250)`}
                  >
                    {/* Recessed channel */}
                    <path
                      d="M236 250
                         L216 112
                         Q250 91 284 112
                         L264 250 Z"
                      fill="var(--color-ink)"
                    />

                    {/* Main alloy spoke */}
                    <path
                      d="M243 250
                         L229 113
                         Q250 102 271 113
                         L257 250 Z"
                      fill="url(#alloySpoke)"
                      stroke="var(--color-paper)"
                      strokeWidth="1"
                    />

                    {/* Machined highlight */}
                    <path
                      d="M244 246 L234 116"
                      fill="none"
                      stroke="var(--color-paper)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.65"
                    />

                    {/* Recessed edge */}
                    <path
                      d="M257 248 L270 116"
                      fill="none"
                      stroke="var(--color-slate)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                  </g>
                )
              })}

              {/* =================================================
                  CENTER WELL
                  ================================================= */}
              <circle
                cx="250"
                cy="250"
                r="78"
                fill="var(--color-ink)"
                stroke="var(--color-slate)"
                strokeWidth="4"
              />

              <circle
                cx="250"
                cy="250"
                r="67"
                fill="url(#alloyHub)"
                stroke="var(--color-paper)"
                strokeWidth="2"
              />

              {/* Five lug nuts */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle =
                  (i * 72 * Math.PI) / 180 - Math.PI / 2

                const lx = 250 + 41 * Math.cos(angle)
                const ly = 250 + 41 * Math.sin(angle)

                return (
                  <g key={`lug-${i}`}>
                    <circle
                      cx={lx}
                      cy={ly}
                      r="8"
                      fill="var(--color-ink)"
                      stroke="var(--color-steel)"
                      strokeWidth="2"
                    />

                    <circle
                      cx={lx}
                      cy={ly}
                      r="4"
                      fill="var(--color-paper)"
                    />
                  </g>
                )
              })}

              {/* Premium center cap */}
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
                r="20"
                fill="var(--color-blueprint)"
              />

              <path
                d="M241 256
                   L250 238
                   L259 256
                   L250 252 Z"
                fill="var(--color-paper)"
              />
            </svg>

            {/* =================================================
                CATEGORY ICONS
                The positioning and counter-rotation behavior
                remain tied to the existing wheel rotation.
                ================================================= */}
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
                  style={{
                    left: `${xPct}%`,
                    top: `${yPct}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => {
                      pauseAutoplay()
                      selectIndex(i)
                    }}
                    className="group relative flex items-center justify-center focus:outline-none"
                    title={cat.name}
                    aria-label={`Select ${cat.name}`}
                  >
                    <motion.div
                      animate={{ rotate: -rotation }}
                      transition={SPRING}
                      className={
                        isActive
                          ? 'flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-blueprint)] text-[var(--color-paper)] border-2 border-[var(--color-gold)] shadow-lg scale-110 transition-all duration-300'
                          : 'flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-ink)] text-[var(--color-steel)] border border-[var(--color-slate)]/60 hover:border-[var(--color-gold)] hover:text-[var(--color-paper)] hover:scale-105 transition-all duration-300'
                      }
                    >
                      <Icon
                        className={
                          isActive
                            ? 'text-lg'
                            : 'text-sm'
                        }
                      />
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

        {/* =====================================================
            WHEEL CONTROLS
            ===================================================== */}
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

          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--color-paper)] border border-[var(--color-steel)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />

            <span className="font-mono text-[10px] tracking-[0.22em] text-[var(--color-ink)] uppercase">
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

      {/* =========================================================
          CATEGORY INFORMATION
          ========================================================= */}
      <div className="relative overflow-hidden bg-[var(--color-paper)] border border-[var(--color-steel)] rounded-2xl p-7 sm:p-8 lg:p-10 shadow-xl">

        {/* Small architectural corner details instead of generic UI labels. */}
        <span className="absolute top-0 left-8 right-8 h-px bg-[var(--color-gold)]/60" />

        <span className="absolute top-5 left-5 w-3 h-3 border-t border-l border-[var(--color-gold)]/70" />
        <span className="absolute top-5 right-5 w-3 h-3 border-t border-r border-[var(--color-gold)]/70" />
        <span className="absolute bottom-5 left-5 w-3 h-3 border-b border-l border-[var(--color-gold)]/70" />
        <span className="absolute bottom-5 right-5 w-3 h-3 border-b border-r border-[var(--color-gold)]/70" />

        <div className="absolute right-0 top-0 w-36 h-36 border-l border-b border-[var(--color-blueprint)]/10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id || active.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-start"
          >

            {/* Category identity */}
            <div className="flex items-center gap-4 mb-7">

              <div className="h-14 w-14 rounded-xl bg-[var(--color-blueprint)] border border-[var(--color-gold)]/50 flex items-center justify-center">
                <ActiveIcon className="text-[var(--color-paper)] text-xl" />
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-gold)] uppercase block mb-1">
                  FITMENT CATEGORY
                </span>

                <span className="font-mono text-[10px] tracking-widest text-[var(--color-slate)] uppercase">
                  {String(activeIdx + 1).padStart(2, '0')} · {String(n).padStart(2, '0')}
                </span>
              </div>

            </div>

            <div className="w-10 h-px bg-[var(--color-gold)] mb-5" />

            <h3 className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-ink)] tracking-tight mb-4">
              {active.name}
            </h3>

            <p className="font-body text-sm text-[var(--color-slate)] leading-relaxed mb-8 max-w-lg">
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