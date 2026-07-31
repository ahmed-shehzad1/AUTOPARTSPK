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

function AudienceTabs() {
  const [active, setActive] = useState('workshops')
  const current = AUDIENCES.find((a) => a.key === active)

  return (
    <section className="bg-steel py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">Who We Serve</span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-10">Built for every kind of buyer</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {AUDIENCES.map((a) => (
              <button
                key={a.key}
                onClick={() => setActive(a.key)}
                className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-md border transition-colors ${
                  active === a.key ? 'bg-blueprint text-paper border-blueprint' : 'bg-paper text-slate border-ink/10 hover:border-blueprint'
                }`}
              >
                <a.icon size={12} /> {a.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="bg-paper border border-ink/10 rounded-xl p-8 md:p-10 min-h-[220px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display font-semibold text-xl text-ink mb-5">{current.heading}</h3>
              <ul className="space-y-3">
                {current.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-body text-sm text-slate">
                    <FaCheckCircle className="text-gold shrink-0" /> {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default AudienceTabs