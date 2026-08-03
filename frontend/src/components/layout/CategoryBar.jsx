import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE = 'http://localhost:4000/api'

function CategoryBar() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/categories`).then((r) => r.json()).then(setCategories).catch(() => {})
  }, [])

  if (categories.length === 0) return null

  return (
    <div className="hidden md:block relative z-40 bg-paper border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ul className="flex items-center gap-7 h-11 font-mono text-xs tracking-widest uppercase overflow-x-auto">
          {categories.map((cat) => (
            <li key={cat.id}>
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="text-slate hover:text-blueprint transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CategoryBar