import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaWarehouse, FaStore, FaUser, FaCheck, FaArrowRight } from 'react-icons/fa'
import Reveal from '../common/Reveal'

const AUDIENCES = [
  {
    key: 'workshops',
    label: 'For Workshops',
    icon: FaWarehouse,
    heading: 'Bulk pricing built for daily operations',
    points: [
      'Tiered wholesale pricing at volume',
      'Priority stock allocation',
      'Dedicated account support',
    ],
  },
  {
    key: 'dealers',
    label: 'For Dealers',
    icon: FaStore,
    heading: 'Reliable supply for resale',
    points: [
      'Consistent stock across 8+ categories',
      'Cross-reference part number search',
      'Flexible payment: COD, bank transfer, wallets',
    ],
  },
  {
    key: 'individuals',
    label: 'For Individuals',
    icon: FaUser,
    heading: 'Genuine parts, retail-friendly',
    points: [
      'Order single units, no minimums required',
      'Nationwide delivery',
      'Search by your exact vehicle make & model',
    ],
  },
]

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

function AudienceTabs() {
  const [active, setActive] = useState('workshops')
  const current = AUDIENCES.find((a) => a.key === active)

  return (
    <section className="relative overflow-hidden bg-[var(--color-steel)] py-20 md:py-24 border-y border-[var(--color-ink)]/10">

      {/* Subtle technical background structure */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        aria-hidden="true"
      >
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-[var(--color-ink)]" />
        <div className="absolute left-[24%] top-0 bottom-0 w-px bg-[var(--color-ink)]" />
        <div className="absolute right-[24%] top-0 bottom-0 w-px bg-[var(--color-ink)]" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-[var(--color-ink)]" />

        <div className="absolute left-0 right-0 top-[22%] h-px bg-[var(--color-ink)]" />
        <div className="absolute left-0 right-0 bottom-[18%] h-px bg-[var(--color-ink)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">

        {/* =====================================================
            HEADER
            ===================================================== */}
        <Reveal>
          <div className="max-w-3xl mb-12 md:mb-14">

            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[var(--color-gold)]" />

              <span className="font-mono text-[10px] font-bold text-[var(--color-blueprint)] uppercase tracking-[0.2em]">
                Who We Serve
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-[var(--color-ink)] tracking-tight">
              Built for every kind of buyer
            </h2>

            <p className="font-body text-[var(--color-slate)] text-base md:text-lg mt-4 leading-relaxed max-w-2xl">
              Whether you manage a commercial workshop, stock an auto parts
              retail store, or need a single OEM replacement for your personal
              vehicle.
            </p>
          </div>
        </Reveal>

        {/* =====================================================
            MAIN AUDIENCE SELECTOR
            ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* ===================================================
              LEFT — AUDIENCE NAVIGATION
              =================================================== */}
          <div className="lg:col-span-4">

            <Reveal delay={0.1}>
              <div className="h-full flex flex-col gap-3">

                {AUDIENCES.map((a, index) => {
                  const isActive = active === a.key
                  const Icon = a.icon

                  return (
                    <button
                      key={a.key}
                      onClick={() => setActive(a.key)}
                      className={`
                        group relative w-full text-left rounded-xl
                        border transition-all duration-300
                        overflow-hidden
                        ${
                          isActive
                            ? 'bg-[var(--color-ink)] border-[var(--color-ink)] shadow-lg'
                            : 'bg-[var(--color-paper)] border-[var(--color-ink)]/10 hover:border-[var(--color-blueprint)]/40 hover:-translate-y-0.5'
                        }
                      `}
                    >

                      {/* Active top line */}
                      <div
                        className={`
                          absolute top-0 left-0 right-0 h-0.5
                          transition-all duration-300
                          ${
                            isActive
                              ? 'bg-[var(--color-gold)]'
                              : 'bg-transparent group-hover:bg-[var(--color-blueprint)]'
                          }
                        `}
                      />

                      <div className="flex items-center gap-4 p-5">

                        {/* Number */}
                        <span
                          className={`
                            font-mono text-[10px] tracking-widest
                            w-7 shrink-0
                            ${
                              isActive
                                ? 'text-[var(--color-gold)]'
                                : 'text-[var(--color-slate)]'
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Icon */}
                        <div
                          className={`
                            relative flex items-center justify-center
                            w-11 h-11 rounded-lg shrink-0
                            border transition-all duration-300
                            ${
                              isActive
                                ? 'bg-[var(--color-blueprint)] text-[var(--color-paper)] border-[var(--color-blueprint)]'
                                : 'bg-[var(--color-steel)] text-[var(--color-blueprint)] border-[var(--color-ink)]/10 group-hover:border-[var(--color-blueprint)]/30'
                            }
                          `}
                        >
                          <Icon size={16} />
                        </div>

                        {/* Copy */}
                        <div className="min-w-0">
                          <span
                            className={`
                              font-display font-bold text-base block tracking-wide
                              ${
                                isActive
                                  ? 'text-[var(--color-paper)]'
                                  : 'text-[var(--color-ink)]'
                              }
                            `}
                          >
                            {a.label}
                          </span>

                          <span
                            className={`
                              font-body text-xs block mt-0.5
                              ${
                                isActive
                                  ? 'text-[var(--color-steel)]'
                                  : 'text-[var(--color-slate)]'
                              }
                            `}
                          >
                            {a.key === 'workshops' &&
                              'Fleet & Service Centers'}

                            {a.key === 'dealers' &&
                              'Resellers & Retail Stores'}

                            {a.key === 'individuals' &&
                              'Car Owners & Enthusiasts'}
                          </span>
                        </div>

                        {/* Active indicator */}
                        <div className="ml-auto shrink-0">
                          <motion.div
                            animate={{
                              x: isActive ? 0 : -4,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FaArrowRight
                              size={12}
                              className="text-[var(--color-gold)]"
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Active bottom progress marker */}
                      {isActive && (
                        <motion.div
                          layoutId="audience-progress"
                          className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-blueprint)]"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  )
                })}

                {/* Small navigation note */}
                <div className="hidden lg:flex items-center gap-3 px-2 pt-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />

                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-slate)]">
                    Select your buying profile
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ===================================================
              RIGHT — DETAIL PANEL
              =================================================== */}
          <div className="lg:col-span-8">

            <Reveal delay={0.15}>
              <div className="relative h-full min-h-[390px] bg-[var(--color-paper)] border border-[var(--color-ink)]/10 rounded-xl overflow-hidden shadow-sm">

                {/* Architectural corner markers */}
                <span className="absolute top-5 left-5 w-4 h-4 border-t border-l border-[var(--color-gold)]/70 pointer-events-none" />
                <span className="absolute top-5 right-5 w-4 h-4 border-t border-r border-[var(--color-gold)]/70 pointer-events-none" />
                <span className="absolute bottom-5 left-5 w-4 h-4 border-b border-l border-[var(--color-gold)]/70 pointer-events-none" />
                <span className="absolute bottom-5 right-5 w-4 h-4 border-b border-r border-[var(--color-gold)]/70 pointer-events-none" />

                {/* Decorative large number */}
                <div
                  className="absolute right-8 top-5 font-display font-bold text-[120px] leading-none text-[var(--color-steel)] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {String(
                    AUDIENCES.findIndex((a) => a.key === active) + 1
                  ).padStart(2, '0')}
                </div>

                <div className="relative h-full p-7 sm:p-9 md:p-10 flex flex-col justify-between">

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -12,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeOut',
                      }}
                      className="relative"
                    >

                      {/* Panel eyebrow */}
                      <div className="flex items-center gap-3 mb-7">

                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-ink)] text-[var(--color-paper)] border border-[var(--color-ink)]">
                          {current && <current.icon size={19} />}
                        </div>

                        <div>
                          <span className="font-mono text-[9px] font-bold text-[var(--color-gold)] uppercase tracking-[0.2em] block mb-1">
                            Buyer Profile
                          </span>

                          <span className="font-mono text-[10px] text-[var(--color-slate)] uppercase tracking-widest">
                            {current?.label}
                          </span>
                        </div>
                      </div>

                      {/* Gold divider */}
                      <div className="w-10 h-px bg-[var(--color-gold)] mb-5" />

                      {/* Heading */}
                      <h3 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-[var(--color-ink)] tracking-tight max-w-2xl leading-tight">
                        {current?.heading}
                      </h3>

                      {/* Benefits */}
                      <motion.ul
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4 pt-8"
                      >
                        {current?.points.map((point) => (
                          <motion.li
                            key={point}
                            variants={itemVariants}
                            className="flex items-center gap-3.5 font-body text-sm md:text-base text-[var(--color-slate)]"
                          >

                            {/* No green — restrained blue/gold detail */}
                            <div className="w-6 h-6 rounded-md bg-[var(--color-blueprint)] flex items-center justify-center flex-shrink-0 text-[var(--color-paper)]">
                              <FaCheck size={9} />
                            </div>

                            <span className="font-medium text-[var(--color-ink)]">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  </AnimatePresence>

                  {/* =================================================
                      FOOTER
                      ================================================= */}
                  <div className="mt-10 pt-6 border-t border-[var(--color-steel)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />

                      <span className="font-body text-xs text-[var(--color-slate)]">
                        Guaranteed genuine OEM and high-grade aftermarket parts.
                      </span>
                    </div>

                    <span className="font-mono text-[9px] text-[var(--color-blueprint)] font-bold uppercase tracking-[0.16em] whitespace-nowrap">
                      Verified Supply Line
                    </span>
                  </div>

                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* =====================================================
            BOTTOM AUDIENCE STATUS
            ===================================================== */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-ink)]/10 pt-5">

            <div className="flex items-center gap-2">
              {AUDIENCES.map((a, index) => (
                <button
                  key={a.key}
                  onClick={() => setActive(a.key)}
                  aria-label={`View ${a.label}`}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${
                      active === a.key
                        ? 'w-10 bg-[var(--color-blueprint)]'
                        : 'w-3 bg-[var(--color-slate)]/30 hover:bg-[var(--color-slate)]/60'
                    }
                  `}
                />
              ))}
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-slate)]">
              {String(AUDIENCES.findIndex((a) => a.key === active) + 1).padStart(2, '0')}
              {' / '}
              {String(AUDIENCES.length).padStart(2, '0')}
            </span>

          </div>
        </Reveal>

      </div>
    </section>
  )
}

export default AudienceTabs