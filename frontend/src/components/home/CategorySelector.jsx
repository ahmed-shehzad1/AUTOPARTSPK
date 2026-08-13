import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

function CategorySelector({ categories, iconMap, fallbackIcon: Fallback }) {
  const [activeIdx, setActiveIdx] = useState(0)

  if (!categories || categories.length === 0) {
    return <p className="font-body text-steel/50 text-sm">No categories yet.</p>
  }

  const active = categories[activeIdx]
  const ActiveIcon = iconMap[active.name] || Fallback

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12">
      {/* Category list */}
      <ul className="space-y-2">
        {categories.map((cat, i) => {
          const isActive = activeIdx === i
          return (
            <li key={cat.id}>
              <button
                onClick={() => setActiveIdx(i)}
                className={`group relative w-full flex items-center justify-between text-left py-4 px-5 rounded-lg overflow-hidden transition-all duration-300 ${
                  isActive ? 'bg-gradient-to-r from-ignition/15 to-transparent' : 'hover:bg-paper/5'
                }`}
              >
                {/* Left accent bar */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ${
                    isActive ? 'bg-ignition' : 'bg-transparent group-hover:bg-blueprint-light/40'
                  }`}
                />

                <span className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-ignition text-paper'
                        : 'text-steel/40 border border-steel/15 group-hover:border-blueprint-light/40 group-hover:text-steel/70'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display font-semibold text-lg md:text-xl transition-colors duration-300 ${
                      isActive ? 'text-paper' : 'text-steel/50 group-hover:text-steel/80'
                    }`}
                  >
                    {cat.name}
                  </span>
                </span>

                <FaArrowRight
                  size={12}
                  className={`transition-all duration-300 ${
                    isActive ? 'text-ignition opacity-100 translate-x-0' : 'text-steel/20 opacity-0 -translate-x-2'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      {/* Active category panel */}
      <div className="relative bg-gradient-to-br from-paper/8 to-paper/[0.02] border border-paper/10 rounded-xl p-7 md:p-9 overflow-hidden">
        {/* Corner brackets, matching the rest of the site's motif */}
        {[
          'top-4 left-4 border-t border-l',
          'top-4 right-4 border-t border-r',
          'bottom-4 left-4 border-b border-l',
          'bottom-4 right-4 border-b border-r',
        ].map((pos) => (
          <span key={pos} className={`absolute ${pos} w-3 h-3 border-blueprint-light/30`} />
        ))}

        {/* Soft orange glow behind the icon */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-ignition/20 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blueprint to-ignition flex items-center justify-center mb-6 shadow-lg shadow-ignition/20">
              <ActiveIcon className="text-paper text-2xl" />
            </div>

            <span className="font-mono text-[10px] tracking-widest text-ignition uppercase block mb-2">
              Category {String(activeIdx + 1).padStart(2, '0')} of {String(categories.length).padStart(2, '0')}
            </span>

            <h3 className="font-display font-semibold text-2xl md:text-3xl text-paper mb-7">
              {active.name}
            </h3>

            <Link
              to={`/products?category=${encodeURIComponent(active.name)}`}
              className="inline-flex items-center gap-2 bg-ignition text-paper font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-md hover:brightness-95 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Browse {active.name} <FaArrowRight size={11} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CategorySelector