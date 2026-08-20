import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaWarehouse, FaStore, FaUser, FaCheck } from 'react-icons/fa'
import Reveal from '../common/Reveal'

const AUDIENCES = [
  { 
    key: 'workshops', 
    label: 'For Workshops', 
    icon: FaWarehouse, 
    heading: 'Bulk pricing built for daily operations',
    points: ['Tiered wholesale pricing at volume', 'Priority stock allocation', 'Dedicated account support'] 
  },
  { 
    key: 'dealers', 
    label: 'For Dealers', 
    icon: FaStore, 
    heading: 'Reliable supply for resale',
    points: ['Consistent stock across 8+ categories', 'Cross-reference part number search', 'Flexible payment: COD, bank transfer, wallets'] 
  },
  { 
    key: 'individuals', 
    label: 'For Individuals', 
    icon: FaUser, 
    heading: 'Genuine parts, retail-friendly',
    points: ['Order single units, no minimums required', 'Nationwide delivery', 'Search by your exact vehicle make & model'] 
  },
]

// Framer motion variants for staggered list items
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0 }
}

function AudienceTabs() {
  const [active, setActive] = useState('workshops')
  const current = AUDIENCES.find((a) => a.key === active)

  return (
    <section className="relative bg-steel py-20 overflow-hidden border-y border-ink/10">
      {/* Precision Automotive Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#141A21 1px, transparent 1px), linear-gradient(to right, #141A21 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Header Section */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-ink/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-ignition rounded-full inline-block" />
                <span className="font-mono text-xs font-bold tracking-widest text-blueprint uppercase">
                  Audience Specification // 02
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight">
                Built for every buyer
              </h2>
            </div>
            <p className="font-body text-sm text-slate max-w-md mt-2 md:mt-0 leading-relaxed">
              Tailored procurement structures engineered for commercial workshops, authorized dealers, and individual owners.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tabs Navigation */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-2.5">
                {AUDIENCES.map((a, index) => {
                  const isActive = active === a.key
                  const Icon = a.icon
                  return (
                    <button
                      key={a.key}
                      onClick={() => setActive(a.key)}
                      className={`group relative flex items-center justify-between p-4 rounded-lg text-left transition-all duration-200 border ${
                        isActive
                          ? 'bg-ink text-white border-ink shadow-md'
                          : 'bg-white text-slate border-ink/10 hover:border-blueprint/40 hover:text-ink'
                      }`}
                    >
                      {/* Left Accent Bar for Active State */}
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-1 bg-ignition rounded-r" />
                      )}

                      <div className="flex items-center gap-3.5 pl-2">
                        <Icon 
                          size={16} 
                          className={`transition-colors duration-200 ${
                            isActive ? 'text-volt' : 'text-blueprint group-hover:text-ink'
                          }`} 
                        />
                        <span className="font-display font-semibold text-sm tracking-wide">
                          {a.label}
                        </span>
                      </div>

                      <span className={`font-mono text-xs ${isActive ? 'text-blueprint-light' : 'text-slate/50'}`}>
                        0{index + 1}
                      </span>
                    </button>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* Tab Content Display Card */}
          <div className="lg:col-span-8">
            <div className="relative bg-white border border-ink/10 rounded-lg p-8 md:p-10 shadow-sm min-h-[320px] flex flex-col justify-between">
              {/* Corner Precision Markings */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-ink/20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-ink/20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-ink/20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-ink/20 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-steel border border-ink/10 flex items-center justify-center text-blueprint flex-shrink-0">
                      {current && <current.icon size={20} />}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] font-bold text-blueprint uppercase tracking-wider block">
                        Segment Features
                      </span>
                      <h3 className="font-display font-bold text-xl md:text-2xl text-ink">
                        {current?.heading}
                      </h3>
                    </div>
                  </div>

                  <div className="h-px w-full bg-ink/10" />

                  <motion.ul 
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3.5"
                  >
                    {current?.points.map((p) => (
                      <motion.li 
                        key={p} 
                        variants={itemVariants} 
                        className="flex items-start gap-3 text-sm md:text-base font-body text-slate"
                      >
                        <div className="mt-1 w-4 h-4 rounded-full bg-volt/10 border border-volt/30 flex items-center justify-center flex-shrink-0">
                          <FaCheck className="text-volt text-[8px]" />
                        </div>
                        <span className="font-medium text-ink">{p}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>

              {/* Technical Indicator Footer */}
              <div className="mt-8 pt-4 border-t border-steel flex items-center justify-between font-mono text-[11px] text-slate">
                <span className="uppercase">SPEC // {current?.key}</span>
                <span className="text-volt flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 bg-volt rounded-full" /> ACTIVE TIER
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudienceTabs