import { motion } from 'framer-motion'
import { FaSearch, FaFileInvoiceDollar, FaTruck, FaArrowRight, FaCheck } from 'react-icons/fa'
import Reveal from '../common/Reveal'

const STEPS = [
  {
    step: '01',
    icon: FaSearch,
    title: 'Browse & Match',
    tag: 'Catalog Search',
    desc: 'Filter by category, cross-reference OEM part numbers, or match your exact vehicle make, model, and year.',
    features: ['Instant OEM Lookup', 'Make & Model Filter'],
  },
  {
    step: '02',
    icon: FaFileInvoiceDollar,
    title: 'Checkout or Quote',
    tag: 'Wholesale & Retail',
    desc: 'Instant checkout for retail quantities. Submit bulk orders directly to get custom tiered wholesale pricing.',
    features: ['Instant Retail Checkout', 'Bulk Tier Discounting'],
  },
  {
    step: '03',
    icon: FaTruck,
    title: 'Fast Dispatch',
    tag: 'Nationwide Delivery',
    desc: 'Pay via COD, Bank Transfer, or JazzCash/EasyPaisa with priority dispatch for verified workshop accounts.',
    features: ['Multiple Payment Modes', 'Priority Workshop Delivery'],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  }
}

function HowItWorks() {
  return (
    <section className="relative bg-white py-24 border-t border-b border-ink/10">
      
      {/* Visual Section Separator Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-steel flex items-center justify-center">
        <div className="w-24 h-full bg-blueprint" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-steel border border-ink/10 rounded mb-3">
              <span className="w-1.5 h-1.5 bg-blueprint rounded-full" />
              <span className="font-mono text-xs font-bold tracking-wider text-ink uppercase">
                Order Process
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink tracking-tight mb-3">
              How Ordering Works
            </h2>
            <p className="font-body text-slate text-base leading-relaxed">
              Procure genuine OEM parts and certified aftermarket components delivered directly to your garage or doorstep.
            </p>
          </div>
        </Reveal>

        {/* Workflow Steps Grid */}
        <div className="relative">
          
          {/* Subtle Horizontal Process Line (Desktop Only) */}
          <div className="hidden md:block absolute top-28 left-20 right-20 h-0.5 bg-steel z-0" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10"
          >
            {STEPS.map((s, index) => {
              const Icon = s.icon

              return (
                <motion.div
                  key={s.step}
                  variants={cardVariants}
                  className="group relative bg-steel/30 border border-ink/10 hover:border-blueprint/40 rounded p-6 md:p-8 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded bg-ink text-white flex items-center justify-center shadow-sm group-hover:bg-blueprint transition-colors duration-300">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate uppercase bg-white px-2.5 py-1 rounded border border-ink/10">
                        {s.tag}
                      </span>
                    </div>

                    {/* Step Identifier & Title */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-blueprint">
                        STEP {s.step}
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-xl text-ink mb-3 tracking-wide">
                      {s.title}
                    </h3>
                    
                    <p className="font-body text-slate text-sm leading-relaxed mb-6">
                      {s.desc}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-5 border-t border-ink/10 space-y-2.5">
                    {s.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2.5 text-xs font-body font-medium text-ink">
                        <div className="w-4 h-4 rounded-full bg-volt/10 border border-volt/30 flex items-center justify-center text-volt flex-shrink-0">
                          <FaCheck size={8} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Next Step Arrow Marker (Desktop Only) */}
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:flex absolute top-28 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-ink/10 shadow-sm items-center justify-center text-slate z-20 group-hover:border-blueprint group-hover:text-blueprint transition-colors">
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