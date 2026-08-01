import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import Reveal from '../common/Reveal'

function CategoryIndex({ categories, iconMap, fallbackIcon: Fallback }) {
  return (
    <div className="border-y border-ink/10">
      {categories.map((cat, i) => {
        const Icon = iconMap[cat] || Fallback
        return (
          <Reveal key={cat} delay={i * 0.04}>
            <Link
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="group relative flex items-center justify-between py-6 md:py-8 px-2 md:px-4 border-b border-ink/10 last:border-b-0 overflow-hidden"
            >
              <span className="absolute inset-0 bg-blueprint/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />

              <div className="relative flex items-center gap-5 md:gap-10">
                <span className="font-mono text-xs md:text-sm text-slate/40 group-hover:text-blueprint transition-colors w-6">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display font-semibold text-xl md:text-3xl text-ink group-hover:text-blueprint transition-colors">
                  {cat}
                </h3>
              </div>

              <div className="relative flex items-center gap-4">
                <Icon className="hidden sm:block text-3xl md:text-4xl text-ink/10 group-hover:text-blueprint/30 group-hover:-translate-x-2 transition-all duration-500" />
                <span className="h-9 w-9 md:h-10 md:w-10 rounded-full border border-ink/10 group-hover:border-blueprint group-hover:bg-blueprint flex items-center justify-center text-slate group-hover:text-paper transition-all duration-300">
                  <FaArrowRight size={12} />
                </span>
              </div>
            </Link>
          </Reveal>
        )
      })}
    </div>
  )
}

export default CategoryIndex