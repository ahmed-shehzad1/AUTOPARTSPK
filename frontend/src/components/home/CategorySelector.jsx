import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const SPRING = { type: 'spring', stiffness: 50, damping: 15, mass: 0.8 }

export default function CategorySelector({ categories, iconMap, fallbackIcon: Fallback }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [rotation, setRotation] = useState(0)

  if (!categories || categories.length === 0) {
    return <p className="font-body text-[var(--color-slate)] text-sm">No categories available.</p>
  }

  const n = categories.length
  const segmentAngle = 360 / n
  const active = categories[activeIdx] || categories[0]
  const ActiveIcon = (iconMap && iconMap[active.name]) || Fallback || FaArrowRight

  // Smooth shortest-path rotation calculation
  const selectIndex = (i) => {
    const targetAngle = -i * segmentAngle
    const currentMod = rotation % 360
    let delta = (targetAngle - currentMod) % 360
    if (delta > 180) delta -= 360
    if (delta < -180) delta += 360

    setRotation((prev) => prev + delta)
    setActiveIdx(i)
  }

  const spin = (dir) => {
    const nextIdx = (activeIdx + dir + n) % n
    selectIndex(nextIdx)
  }

  // Pre-calculated tread angles for realistic tire pattern (32 directional sipes)
  const treadSipes = Array.from({ length: 32 }, (_, i) => (i * 360) / 32)
  // Rotor cooling holes pattern
  const rotorHoles = Array.from({ length: 18 }, (_, i) => (i * 360) / 18)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center max-w-6xl mx-auto p-4">
      {/* ========================================================= */}
      {/* ROTATING ALLOY WHEEL INTERACTIVE CONTAINER                */}
      {/* ========================================================= */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-[420px] aspect-square select-none">
          
          {/* Top Caliper / Position Pointer Marker (Fixed) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-30 flex flex-col items-center pointer-events-none">
            <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[14px] border-t-[var(--color-gold)] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
            <span className="w-2 h-2 rounded-full bg-[var(--color-ignition)] ring-2 ring-[var(--color-paper)] mt-0.5 animate-pulse" />
          </div>

          {/* STATIC BACKGROUND LAYER: Brake Rotor & Caliper */}
          <div className="absolute inset-0 z-0 p-8">
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                {/* Brushed metal rotor gradient */}
                <radialGradient id="rotorMetal" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-steel)" />
                  <stop offset="70%" stopColor="var(--color-slate)" />
                  <stop offset="90%" stopColor="var(--color-ink)" />
                  <stop offset="100%" stopColor="#000" />
                </radialGradient>
                {/* Caliper metallic gradient */}
                <linearGradient id="caliperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-blueprint-light)" />
                  <stop offset="50%" stopColor="var(--color-blueprint)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </linearGradient>
              </defs>

              {/* Cross-Drilled Brake Rotor */}
              <circle cx="250" cy="250" r="170" fill="url(#rotorMetal)" opacity="0.85" />
              <circle cx="250" cy="250" r="168" fill="none" stroke="var(--color-paper)" strokeWidth="1" opacity="0.15" />
              <circle cx="250" cy="250" r="115" fill="none" stroke="var(--color-ink)" strokeWidth="8" opacity="0.4" />
              
              {/* Rotor Drilled Holes */}
              {rotorHoles.map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                const r1 = 135
                const r2 = 152
                return (
                  <g key={`hole-${i}`}>
                    <circle cx={250 + r1 * Math.cos(rad)} cy={250 + r1 * Math.sin(rad)} r="3.5" fill="var(--color-ink)" opacity="0.8" />
                    <circle cx={250 + r2 * Math.cos(rad)} cy={250 + r2 * Math.sin(rad)} r="3.5" fill="var(--color-ink)" opacity="0.8" />
                  </g>
                )
              })}

              {/* Heavy Duty Brake Caliper (Positioned at 2 o'clock) */}
              <path
                d="M 350 130 C 400 180, 410 230, 395 280 L 360 265 C 370 230, 365 190, 330 150 Z"
                fill="url(#caliperGrad)"
                stroke="var(--color-paper)"
                strokeWidth="1"
                opacity="0.9"
                className="filter drop-shadow-md"
              />
              {/* Caliper branding line */}
              <path d="M 360 180 L 385 220" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* ========================================================= */}
          {/* ROTATING ALLOY WHEEL + TIRE SVG                           */}
          {/* ========================================================= */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={SPRING}
            style={{ transformOrigin: '50% 50%' }}
            className="absolute inset-0 z-10"
          >
            <svg viewBox="0 0 500 500" className="w-full h-full filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]">
              <defs>
                {/* Metallic Chrome Highlight Gradient */}
                <linearGradient id="chromeSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-paper)" />
                  <stop offset="25%" stopColor="var(--color-steel)" />
                  <stop offset="50%" stopColor="var(--color-gold)" />
                  <stop offset="75%" stopColor="var(--color-slate)" />
                  <stop offset="100%" stopColor="var(--color-ink)" />
                </linearGradient>

                {/* Inner Rim Lip Radial Depth */}
                <radialGradient id="rimDepth" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="var(--color-paper)" />
                  <stop offset="40%" stopColor="var(--color-steel)" />
                  <stop offset="70%" stopColor="var(--color-slate)" />
                  <stop offset="95%" stopColor="var(--color-ink)" />
                  <stop offset="100%" stopColor="#050505" />
                </radialGradient>

                {/* Spoke Light Facet */}
                <linearGradient id="spokeLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-paper)" />
                  <stop offset="50%" stopColor="var(--color-steel)" />
                  <stop offset="100%" stopColor="var(--color-slate)" />
                </linearGradient>

                {/* Spoke Shadow Facet */}
                <linearGradient id="spokeShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-slate)" />
                  <stop offset="70%" stopColor="var(--color-ink)" />
                  <stop offset="100%" stopColor="#000" />
                </linearGradient>

                {/* Rubber Tire Texture Gradient */}
                <radialGradient id="tireRubber" cx="50%" cy="50%" r="50%">
                  <stop offset="80%" stopColor="#181a1b" />
                  <stop offset="92%" stopColor="var(--color-ink)" />
                  <stop offset="97%" stopColor="#0d0e0f" />
                  <stop offset="100%" stopColor="#000000" />
                </radialGradient>
              </defs>

              {/* 1. OUTER RUBBER TIRE TREAD & SIDEWALL */}
              <circle cx="250" cy="250" r="240" fill="url(#tireRubber)" stroke="var(--color-ink)" strokeWidth="2" />
              
              {/* Directional Tire Tread Blocks */}
              <g opacity="0.6">
                {treadSipes.map((angle, i) => (
                  <g key={`sipe-${i}`} transform={`rotate(${angle} 250 250)`}>
                    <path
                      d="M 250 14 L 254 28 L 246 32 L 250 14"
                      fill="none"
                      stroke="var(--color-ink)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />
                    <line x1="250" y1="12" x2="250" y2="34" stroke="#000000" strokeWidth="2" />
                  </g>
                ))}
              </g>

              {/* Tire Sidewall Fine Detail Rings */}
              <circle cx="250" cy="250" r="226" fill="none" stroke="var(--color-slate)" strokeWidth="0.75" opacity="0.2" />
              <circle cx="250" cy="250" r="202" fill="none" stroke="var(--color-steel)" strokeWidth="1.5" opacity="0.25" />
              <circle cx="250" cy="250" r="198" fill="none" stroke="#000" strokeWidth="2" opacity="0.8" />

              {/* Subtle Sidewall Branding Text */}
              <path id="tireTextPath" d="M 100 250 A 150 150 0 0 1 400 250" fill="none" stroke="none" />
              <text fill="var(--color-slate)" opacity="0.3" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="3">
                <textPath href="#tireTextPath" startOffset="50%" textAnchor="middle">
                  PRO-SPEC ALLOY // 245/40 ZR19
                </textPath>
              </text>

              {/* 2. OUTER CHROME RIM FLANGE & STEP LIP */}
              <circle cx="250" cy="250" r="194" fill="url(#rimDepth)" stroke="url(#chromeSpecular)" strokeWidth="3" />
              <circle cx="250" cy="250" r="186" fill="none" stroke="var(--color-paper)" strokeWidth="1" opacity="0.5" />
              <circle cx="250" cy="250" r="176" fill="none" stroke="var(--color-ink)" strokeWidth="6" opacity="0.7" />
              <circle cx="250" cy="250" r="171" fill="none" stroke="var(--color-gold)" strokeWidth="1" opacity="0.6" />

              {/* 3. RECESSED WHEEL BARREL */}
              <circle cx="250" cy="250" r="168" fill="#0c0d0e" />

              {/* 4. REALISTIC 3D SCULPTED ALLOY SPOKES (6-SPOKE TWIN DESIGN) */}
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = i * 60
                return (
                  <g key={`spoke-${i}`} transform={`rotate(${angle} 250 250)`}>
                    {/* Left Light-Reflecting Facet */}
                    <polygon
                      points="242,95 248,170 250,250 240,250 230,170 226,97"
                      fill="url(#spokeLight)"
                    />
                    {/* Right Shadowed Depth Facet */}
                    <polygon
                      points="258,95 274,97 270,170 260,250 250,250 248,170"
                      fill="url(#spokeShadow)"
                    />
                    {/* Center Polished Face Ridge */}
                    <line x1="250" y1="95" x2="250" y2="185" stroke="var(--color-paper)" strokeWidth="1.5" opacity="0.6" />
                    {/* Outer Spoke Recess Pocket */}
                    <polygon
                      points="243,105 257,105 254,155 246,155"
                      fill="var(--color-ink)"
                      opacity="0.6"
                    />
                  </g>
                )
              })}

              {/* 5. CENTER HUB ASSEMBLY & LUG NUTS */}
              {/* Outer Hub Ring */}
              <circle cx="250" cy="250" r="68" fill="url(#rimDepth)" stroke="var(--color-slate)" strokeWidth="2" />
              <circle cx="250" cy="250" r="62" fill="url(#chromeSpecular)" stroke="var(--color-ink)" strokeWidth="1" />
              <circle cx="250" cy="250" r="52" fill="#111" />

              {/* 5 Lug Nut Recesses & Chrome Bolts */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i * 72 * Math.PI) / 180 - Math.PI / 2
                const lx = 250 + 38 * Math.cos(angle)
                const ly = 250 + 38 * Math.sin(angle)
                return (
                  <g key={`lug-${i}`}>
                    {/* Recessed Socket Hole */}
                    <circle cx={lx} cy={ly} r="8" fill="#000" stroke="var(--color-slate)" strokeWidth="0.75" />
                    {/* Chrome Lug Nut Hex Head */}
                    <circle cx={lx - 1} cy={ly - 1} r="4.5" fill="url(#spokeLight)" />
                    <circle cx={lx} cy={ly} r="4.5" fill="none" stroke="var(--color-paper)" strokeWidth="0.5" />
                  </g>
                )
              })}

              {/* Center Cap Badge */}
              <circle cx="250" cy="250" r="22" fill="url(#chromeSpecular)" stroke="var(--color-gold)" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="18" fill="var(--color-ink)" />
              {/* Branded Emblem Insignia */}
              <path
                d="M 243 254 L 250 240 L 257 254 L 250 250 Z"
                fill="var(--color-gold)"
                className="filter drop-shadow-xs"
              />
            </svg>

            {/* ========================================================= */}
            {/* OVERLAY: CATEGORY INTERACTIVE ICONS ON WHEEL RIM           */}
            {/* ========================================================= */}
            {categories.map((cat, i) => {
              // Position icons neatly on the outer rim lip (12 o'clock default index 0)
              const itemAngle = i * segmentAngle - 90
              const rad = (itemAngle * Math.PI) / 180
              const radiusPct = 34 // Radial placement distance in percentage
              const xPct = 50 + radiusPct * Math.cos(rad)
              const yPct = 50 + radiusPct * Math.sin(rad)

              const Icon = (iconMap && iconMap[cat.name]) || Fallback || FaArrowRight
              const isActive = i === activeIdx

              return (
                <div
                  key={cat.id || `cat-${i}`}
                  style={{ left: `${xPct}%`, top: `${yPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => selectIndex(i)}
                    className="group relative flex items-center justify-center focus:outline-none"
                    title={cat.name}
                  >
                    {/* Counter-rotate icon button so icon remains vertical & upright */}
                    <motion.div
                      animate={{ rotate: -rotation }}
                      transition={SPRING}
                      className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-13 h-13 bg-gradient-to-br from-[var(--color-blueprint-light)] to-[var(--color-blueprint)] text-[var(--color-paper)] shadow-[0_0_15px_rgba(0,0,0,0.6)] ring-2 ring-[var(--color-gold)] scale-110'
                          : 'w-10 h-10 bg-[var(--color-ink)]/90 text-[var(--color-steel)] border border-[var(--color-steel)]/30 hover:border-[var(--color-gold)] hover:text-[var(--color-paper)] hover:scale-105'
                      }`}
                    >
                      <Icon className={isActive ? 'text-lg' : 'text-sm'} />
                    </motion.div>

                    {/* Active Halo Pulse */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border-2 border-[var(--color-gold)] animate-ping opacity-40 pointer-events-none" />
                    )}
                  </button>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* ROTATION CONTROLS */}
        <div className="flex items-center gap-5 mt-4 z-20">
          <button
            onClick={() => spin(-1)}
            className="h-10 w-10 rounded-full bg-[var(--color-paper)]/5 border border-[var(--color-slate)]/30 text-[var(--color-steel)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all flex items-center justify-center active:scale-95 shadow-xs"
            aria-label="Previous Category"
          >
            <FaChevronLeft size={13} />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-ink)]/60 border border-[var(--color-slate)]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--color-slate)] uppercase">
              Select Category
            </span>
          </div>

          <button
            onClick={() => spin(1)}
            className="h-10 w-10 rounded-full bg-[var(--color-paper)]/5 border border-[var(--color-slate)]/30 text-[var(--color-steel)] hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] transition-all flex items-center justify-center active:scale-95 shadow-xs"
            aria-label="Next Category"
          >
            <FaChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CATEGORY DETAILS DISPLAY PANEL                            */}
      {/* ========================================================= */}
      <div className="relative bg-gradient-to-br from-[var(--color-paper)]/10 via-[var(--color-paper)]/5 to-transparent border border-[var(--color-slate)]/20 rounded-2xl p-8 lg:p-10 backdrop-blur-md shadow-2xl">
        {/* Decorative Industrial Corner Accents */}
        <span className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-[var(--color-gold)]/60" />
        <span className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-[var(--color-gold)]/60" />
        <span className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-[var(--color-gold)]/60" />
        <span className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-[var(--color-gold)]/60" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id || active.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-start"
          >
            {/* Badge Icon Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[var(--color-blueprint-light)] to-[var(--color-blueprint)] flex items-center justify-center shadow-lg ring-1 ring-[var(--color-gold)]/40">
                <ActiveIcon className="text-[var(--color-paper)] text-2xl" />
              </div>
              <div>
                <span className="font-mono text-[11px] tracking-widest text-[var(--color-gold)] uppercase block">
                  SYSTEM SPEC // {String(activeIdx + 1).padStart(2, '0')} OF {String(n).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-[var(--color-slate)]">
                  OEM Part Group
                </span>
              </div>
            </div>

            <h3 className="font-display font-bold text-3xl lg:text-4xl text-[var(--color-paper)] tracking-tight mb-4">
              {active.name}
            </h3>

            <p className="font-body text-sm text-[var(--color-steel)] opacity-80 leading-relaxed mb-8">
              Explore wholesale inventory, assemblies, and high-performance replacement components engineered for {active.name.toLowerCase()}.
            </p>

            <Link
              to={`/products?category=${encodeURIComponent(active.name)}`}
              className="inline-flex items-center gap-3 bg-[var(--color-ignition)] text-[var(--color-paper)] font-mono text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-lg shadow-lg hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
            >
              <span>Browse {active.name}</span>
              <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}