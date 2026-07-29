import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_MENU } from '../../data/categoryMenu'

function CategoryBar() {
  const [hovered, setHovered] = useState(null)
  const activeCat = CATEGORY_MENU.find((c) => c.name === hovered)

  return (
 <div
  className="hidden md:block relative z-40 bg-paper border-b border-ink/10"
  onMouseLeave={() => setHovered(null)}
>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ul className="flex items-center gap-7 h-11 font-mono text-xs tracking-widest uppercase">
          {CATEGORY_MENU.map((cat) => (
            <li key={cat.name} onMouseEnter={() => setHovered(cat.name)}>
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`transition-colors ${
                  hovered === cat.name ? 'text-blueprint' : 'text-slate hover:text-blueprint'
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown panel — shows only the hovered category's subcategories */}
      <div
        className={`absolute left-0 right-0 top-full bg-paper border-b border-ink/10 shadow-lg overflow-hidden transition-all duration-200 ${
          activeCat ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0 pointer-events-none'
        }`}
      >
        {activeCat && (
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 grid grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-3">
            {activeCat.subcategories.map((sub) => (
              <Link
                key={sub}
                to={`/products?category=${encodeURIComponent(activeCat.name)}`}
                onClick={() => setHovered(null)}
                className="font-mono text-xs text-slate hover:text-blueprint transition-colors"
              >
                {sub}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryBar