import { useMemo, useState } from 'react'
import { FaSearch, FaTag } from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { PRODUCTS, CATEGORIES } from '../../data/products'

function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.partNo.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  return (
    <div className="bg-steel min-h-screen">
      {/* Page header */}
      <section className="relative bg-paper border-b border-ink/10 py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
            Catalog
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-2">
            Product Catalog
          </h1>
          <p className="font-body text-slate mt-3 max-w-xl">
            Browse our full range of genuine and aftermarket parts. Contact us for wholesale pricing on any item.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="md:sticky md:top-24 h-fit">
          <div className="bg-paper border border-ink/10 rounded-lg p-5 mb-5">
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
              Search
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/40 text-sm" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Part name or number"
                className="w-full bg-steel border border-ink/10 rounded-md pl-9 pr-3 py-2 text-sm font-body text-ink placeholder:text-slate/40 focus:outline-none focus:border-blueprint transition-colors"
              />
            </div>
          </div>

          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-3">
              Category
            </span>
            <ul className="space-y-1">
              {['All', ...CATEGORIES].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-body transition-colors ${
                      activeCategory === cat
                        ? 'bg-blueprint text-paper'
                        : 'text-ink/70 hover:bg-steel'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs text-slate/60">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate font-body">
              No parts match your search — try a different keyword or category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={(i % 6) * 0.05}>
                  <div className="group relative bg-paper border border-ink/10 rounded-lg overflow-hidden hover:border-blueprint hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    {/* Corner brackets, consistent with category cards */}
                    {[
                      'top-2 left-2 border-t border-l',
                      'top-2 right-2 border-t border-r',
                    ].map((pos) => (
                      <span
                        key={pos}
                        className={`absolute ${pos} w-3 h-3 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
                      />
                    ))}

                    <div className="h-36 bg-steel flex items-center justify-center font-mono text-xs text-slate/40 border-b border-ink/10">
                      [ image ]
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase mb-1">
                        {p.category}
                      </span>
                      <h3 className="font-display font-semibold text-ink text-sm mb-1">
                        {p.name}
                      </h3>
                      <p className="font-mono text-[11px] text-slate/60 mb-3">
                        Part No. {p.partNo}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-ink/5">
                        <span className="font-body font-medium text-ink text-sm">{p.price}</span>
                        {p.wholesale && (
                          <span className="flex items-center gap-1 font-mono text-[10px] text-ignition uppercase">
                            <FaTag size={9} /> Wholesale
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products