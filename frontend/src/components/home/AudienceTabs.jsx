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
    <section className="relative bg-steel py-20 border-y border-ink/10">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-xs font-bold text-blueprint uppercase tracking-wider block mb-2">
              Who We Serve
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight">
              Built for every kind of buyer
            </h2>
            <p className="font-body text-slate text-base mt-3 leading-relaxed">
              Whether you manage a commercial workshop, stock an auto parts retail store, or need a single OEM replacement for your personal vehicle.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Tab Selection Column */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3">
                {AUDIENCES.map((a) => {
                  const isActive = active === a.key
                  const Icon = a.icon

                  return (
                    <button
                      key={a.key}
                      onClick={() => setActive(a.key)}
                      className={`group relative flex items-center gap-4 p-5 text-left rounded border transition-all duration-200 ${
                        isActive
                          ? 'bg-ink text-white border-ink shadow-md'
                          : 'bg-white text-slate border-ink/10 hover:border-blueprint/30 hover:text-ink'
                      }`}
                    >
                      {/* Active Left Accent Bar */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blueprint rounded-l" />
                      )}

                      <div className={`p-2.5 rounded transition-colors duration-200 ${
                        isActive ? 'bg-white/10 text-volt' : 'bg-steel text-blueprint group-hover:bg-blueprint/10'
                      }`}>
                        <Icon size={18} />
                      </div>

                      <div>
                        <span className="font-display font-bold text-base block tracking-wide">
                          {a.label}
                        </span>
                        <span className={`font-body text-xs block ${isActive ? 'text-white/70' : 'text-slate'}`}>
                          {a.key === 'workshops' && 'Fleet & Service Centers'}
                          {a.key === 'dealers' && 'Resellers & Retail Stores'}
                          {a.key === 'individuals' && 'Car Owners & Enthusiasts'}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </Reveal>
          </div>

          {/* Content Details Panel */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-ink/10 rounded p-8 md:p-10 shadow-sm h-full flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <div className="flex items-start gap-4 pb-6 border-b border-steel">
                    <div className="p-3 bg-steel rounded text-blueprint border border-ink/5">
                      {current && <current.icon size={24} />}
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-slate uppercase tracking-wider block mb-1">
                        Account Benefits
                      </span>
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-ink">
                        {current?.heading}
                      </h3>
                    </div>
                  </div>

                  <motion.ul 
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 pt-2"
                  >
                    {current?.points.map((point) => (
                      <motion.li 
                        key={point} 
                        variants={itemVariants} 
                        className="flex items-center gap-3.5 font-body text-base text-slate"
                      >
                        <div className="w-5 h-5 rounded-full bg-volt/10 border border-volt/30 flex items-center justify-center flex-shrink-0 text-volt">
                          <FaCheck size={10} />
                        </div>
                        <span className="font-medium text-ink">{point}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </AnimatePresence>

              {/* Functional Catalog Footer Note */}
              <div className="mt-8 pt-6 border-t border-steel flex flex-wrap items-center justify-between gap-4 font-body text-xs text-slate">
                <span className="font-semibold text-ink">
                  Guaranteed genuine OEM and high-grade aftermarket parts.
                </span>
                <span className="font-mono text-blueprint font-bold uppercase tracking-wider">
                  Verified Supply Line
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