import { motion } from 'framer-motion'
import { FaSearch, FaFileInvoiceDollar, FaTruck, FaArrowRight, FaCheckCircle } from 'react-icons/fa'
import Reveal from '../common/Reveal'

const STEPS = [
  {
    step: '01',
    icon: FaSearch,
    title: 'Browse & Match',
    tag: 'Catalog Search',
    desc: 'Filter by category, cross-reference OEM part numbers, or match your exact vehicle make, model, and year.',
    features: ['Instant OEM Lookup', 'Make & Model Filter'],
    accent: 'from-blueprint to-blue-600'
  },
  {
    step: '02',
    icon: FaFileInvoiceDollar,
    title: 'Checkout or Quote',
    tag: 'Wholesale & Retail',
    desc: 'Instant checkout for retail quantities. Submit bulk orders directly to get custom tiered wholesale pricing.',
    features: ['Instant Retail Checkout', 'Bulk Tier Discounting'],
    accent: 'from-blue-600 to-indigo-600'
  },
  {
    step: '03',
    icon: FaTruck,
    title: 'Fast Dispatch',
    tag: 'Nationwide Delivery',
    desc: 'Pay via COD, Bank Transfer, or JazzCash/EasyPaisa with priority dispatch for verified workshop accounts.',
    features: ['Multiple Payment Modes', 'Priority Workshop Delivery'],
    accent: 'from-indigo-600 to-blueprint'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
}

function HowItWorks() {
  return (
    <section className="relative bg-steel/30 py-28 overflow-hidden border-y border-ink/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-blueprint/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="font-mono text-xs font-bold tracking-widest text-blueprint uppercase bg-blueprint/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-blueprint/10">
              Simple & Transparent
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-ink tracking-tight mb-4">
              How Ordering Works
            </h2>
            <p className="font-body text-slate text-base md:text-lg">
              Get genuine parts delivered to your workshop or doorstep in three easy steps.
            </p>
          </div>
        </Reveal>

        {/* Steps Grid Pipeline */}
        <div className="relative">
          
          {/* Desktop Connected Gradient Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-blueprint via-indigo-500 to-blue-600 -translate-y-12 z-0 rounded-full opacity-20" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          >
            {STEPS.map((s, index) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  variants={cardVariants}
                  className="group relative bg-white/80 backdrop-blur-xl border border-ink/10 hover:border-blueprint/40 rounded-3xl p-8 shadow-xl shadow-slate/5 hover:shadow-2xl hover:shadow-blueprint/10 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                >
                  {/* Giant Watermark Step Number */}
                  <span className="absolute -right-2 -bottom-6 font-display font-black text-8xl text-ink/[0.03] group-hover:text-blueprint/[0.08] transition-colors duration-500 select-none pointer-events-none">
                    {s.step}
                  </span>

                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.accent} text-white flex items-center justify-center shadow-md shadow-blueprint/20 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-wider text-slate/60 uppercase bg-steel px-3 py-1 rounded-full border border-ink/5">
                        {s.tag}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="font-display font-bold text-2xl text-ink mb-3 group-hover:text-blueprint transition-colors duration-300">
                      {s.title}
                    </h3>
                    <p className="font-body text-slate text-sm leading-relaxed mb-6">
                      {s.desc}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-6 border-t border-ink/5 space-y-2.5">
                    {s.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 font-mono text-xs font-medium text-slate/80">
                        <FaCheckCircle className="text-emerald-500 shrink-0" size={13} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Arrow Indicator for Step Continuity */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-ink/10 shadow-md items-center justify-center text-slate z-20 group-hover:border-blueprint group-hover:text-blueprint transition-colors">
                      <FaArrowRight size={10} />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default HowItWorks