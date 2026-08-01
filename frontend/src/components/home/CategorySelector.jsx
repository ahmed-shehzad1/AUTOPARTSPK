import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import { CATEGORY_MENU } from '../../data/categoryMenu'

function CategorySelector({ iconMap, fallbackIcon: Fallback }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const active = CATEGORY_MENU[activeIdx]
  const ActiveIcon = iconMap[active.name] || Fallback

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12">
      {/* Left — category list */}
      <ul className="space-y-1">
        {CATEGORY_MENU.map((cat, i) => (
          <li key={cat.name}>
            <button
              onClick={() => setActiveIdx(i)}
              className={`w-full flex items-center justify-between text-left py-3.5 px-4 rounded-md transition-colors ${
                activeIdx === i ? 'bg-paper/10' : 'hover:bg-paper/5'
              }`}
            >
              <span className="flex items-center gap-4">
                <span className={`font-mono text-xs w-6 transition-colors ${activeIdx === i ? 'text-blueprint-light' : 'text-steel/30'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-display font-semibold text-lg md:text-xl transition-colors ${activeIdx === i ? 'text-paper' : 'text-steel/50'}`}>
                  {cat.name}
                </span>
              </span>
              <span className={`h-1.5 w-1.5 rounded-full transition-colors ${activeIdx === i ? 'bg-blueprint-light' : 'bg-transparent'}`} />
            </button>
          </li>
        ))}
      </ul>

      {/* Right — active category detail panel */}
      <div className="bg-paper/5 border border-paper/10 rounded-xl p-7 md:p-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-14 w-14 rounded-full bg-blueprint/20 flex items-center justify-center mb-6">
              <ActiveIcon className="text-blueprint-light text-2xl" />
            </div>

            <h3 className="font-display font-semibold text-2xl text-paper mb-4">
              {active.name}
            </h3>

            <div className="flex flex-wrap gap-2 mb-7">
              {active.subcategories.map((sub) => (
                <span
                  key={sub}
                  className="font-mono text-[11px] text-steel/70 bg-paper/5 border border-paper/10 rounded-full px-3 py-1.5"
                >
                  {sub}
                </span>
              ))}
            </div>

            <Link
              to={`/products?category=${encodeURIComponent(active.name)}`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blueprint-light hover:text-paper transition-colors"
            >
              Browse {active.name} <FaArrowRight size={10} />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CategorySelector