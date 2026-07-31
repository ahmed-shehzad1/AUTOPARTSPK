import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaWarehouse, FaStore, FaUser, FaCheckCircle } from 'react-icons/fa'
import Reveal from '../common/Reveal'

const AUDIENCES = [
  { key: 'workshops', label: 'For Workshops', icon: FaWarehouse, heading: 'Bulk pricing built for daily operations',
    points: ['Tiered wholesale pricing at volume', 'Priority stock allocation', 'Dedicated account support'] },
  { key: 'dealers', label: 'For Dealers', icon: FaStore, heading: 'Reliable supply for resale',
    points: ['Consistent stock across 8+ categories', 'Cross-reference part number search', 'Flexible payment: COD, bank transfer, wallets'] },
  { key: 'individuals', label: 'For Individuals', icon: FaUser, heading: 'Genuine parts, retail-friendly',
    points: ['Order single units, no minimums required', 'Nationwide delivery', 'Search by your exact vehicle make & model'] },
]

// Framer motion variants for staggered list items
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
}

function AudienceTabs() {
  const [active, setActive] = useState('workshops')
  const current = AUDIENCES.find((a) => a.key === active)

  return (
    <section className="relative bg-steel py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blueprint/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="text-center md:text-left mb-12">
            <span className="font-mono text-xs font-bold tracking-widest text-blueprint uppercase block mb-3">Who We Serve</span>
            <h2 className="font-display font-black text-3xl md:text-4xl text-ink">Built for every kind of buyer</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
          {/* Tabs */}
          <Reveal delay={0.1}>
            <div className="flex flex-row lg:flex-col flex-wrap gap-3">
              {AUDIENCES.map((a) => (
                <button
                  key={a.key}
                  onClick={() => setActive(a.key)}
                  className={`group relative flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest px-6 py-4 rounded-xl transition-all duration-300 overflow-hidden ${
                    active === a.key 
                      ? 'text-white shadow-lg shadow-blueprint/30 border-transparent scale-105' 
                      : 'bg-paper/50 text-slate border border-ink/5 hover:border-blueprint/30 hover:bg-white hover:text-ink'
                  }`}
                >
                  {/* Active Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-blueprint to-blue-600 transition-opacity duration-300 ${active === a.key ? 'opacity-100' : 'opacity-0'}`} />
                  
                  <a.icon size={16} className={`relative z-10 transition-colors duration-300 ${active === a.key ? 'text-white' : 'text-blueprint group-hover:text-blue-600'}`} />
                  <span className="relative z-10">{a.label}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Content Card */}
          <div className="relative bg-white/60 backdrop-blur-xl border border-ink/5 shadow-2xl shadow-blueprint/5 rounded-3xl p-8 md:p-12 min-h-[300px] overflow-hidden flex flex-col justify-center">
            {/* Inner subtle gradient stroke */}
            <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blueprint/10 to-blue-500/10 border border-blueprint/20 flex items-center justify-center mb-6">
                   <current.icon className="text-3xl text-blueprint" />
                </div>
                
                <h3 className="font-display font-bold text-2xl md:text-3xl text-ink mb-6 tracking-tight">
                  {current.heading}
                </h3>
                
                <motion.ul 
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {current.points.map((p) => (
                    <motion.li key={p} variants={itemVariants} className="flex items-center gap-4 font-body text-base font-medium text-slate">
                      <div className="bg-emerald-500/10 p-1 rounded-full flex-shrink-0">
                        <FaCheckCircle className="text-emerald-500 text-lg" />
                      </div>
                      {p}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AudienceTabs