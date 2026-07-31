import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaSearch, FaFileInvoiceDollar, FaTruck } from 'react-icons/fa'
import Reveal from '../common/Reveal'

const STEPS = [
  { icon: FaSearch, title: 'Browse or Search', desc: "Find parts by category, part number, or your vehicle's make, model, and year across the full catalog." },
  { icon: FaFileInvoiceDollar, title: 'Order or Request a Quote', desc: 'Smaller quantities check out instantly. Larger bulk orders are confirmed manually with wholesale pricing.' },
  { icon: FaTruck, title: 'Receive Delivery', desc: 'Pay via COD, bank transfer, or JazzCash/EasyPaisa — delivered nationwide, with priority dispatch for wholesale accounts.' },
]

function HowItWorks() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const ActiveIcon = STEPS[active].icon

  return (
    <section className="bg-paper py-20 border-y border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">Process</span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-12">How Ordering Works</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12">
          <div className="hidden md:block">
            <div className="sticky top-32 bg-steel border border-ink/10 rounded-xl h-64 flex flex-col items-center justify-center overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center text-center px-6"
                >
                  <ActiveIcon className="text-blueprint text-4xl mb-4" />
                  <span className="font-mono text-[10px] tracking-widest text-slate/50 uppercase">
                    Step 0{active + 1} of 0{STEPS.length}
                  </span>
                </motion.div>
              </AnimatePresence>
              <div
                className="absolute bottom-0 left-0 h-1 bg-blueprint transition-all duration-300"
                style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-24 md:space-y-40">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                ref={(el) => (refs.current[i] = el)}
                data-index={i}
                className="min-h-[140px] flex flex-col justify-center"
              >
                <div className="md:hidden mb-4">
                  <step.icon className="text-blueprint text-2xl" />
                </div>
                <span className={`font-mono text-[10px] tracking-widest uppercase mb-2 transition-colors ${active === i ? 'text-blueprint' : 'text-slate/40'}`}>
                  Step 0{i + 1}
                </span>
                <h3 className={`font-display font-semibold text-xl mb-2 transition-colors ${active === i ? 'text-ink' : 'text-slate/50'}`}>
                  {step.title}
                </h3>
                <p className={`font-body text-sm max-w-md transition-colors ${active === i ? 'text-slate' : 'text-slate/40'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks