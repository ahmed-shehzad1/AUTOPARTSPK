import { useEffect, useMemo, useState } from 'react'
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { PRODUCTS, CATEGORIES, MAKES_MODELS } from '../../data/products'

const PAGE_SIZE = 12

const STOCK_DOT = {
  'In Stock': 'bg-blueprint',
  'Limited Stock': 'bg-ignition',
  'Backorder': 'bg-slate',
}

const CONDITION_STRIPE = {
  New: 'bg-blueprint',
  Used: 'bg-slate',
  Refurbished: 'bg-ignition',
}

function Products() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeMake, setActiveMake] = useState('All')
  const [activeModel, setActiveModel] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const modelOptions = activeMake === 'All' ? [] : MAKES_MODELS[activeMake]

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      const matchesMake = activeMake === 'All' || p.fitment.some((f) => f.make === activeMake)
      const matchesModel = activeModel === 'All' || p.fitment.some((f) => f.model === activeModel)
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.partNo.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesMake && matchesModel && matchesSearch
    })
  }, [activeCategory, activeMake, activeModel, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => setPage(1), [activeCategory, activeMake, activeModel, search])

  return (
    <div className="bg-steel min-h-screen">
      {/* Search hero */}
      <section className="relative overflow-hidden bg-paper border-b border-ink/10 py-14">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
            27,000+ SKUs in catalog
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-2 mb-6">
            Product Catalog
          </h1>

          <div className="relative max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by part name, number, or cross-reference"
              className="w-full bg-steel border border-ink/10 rounded-lg pl-11 pr-4 py-3.5 text-sm font-body text-ink placeholder:text-slate/40 focus:outline-none focus:border-blueprint transition-colors shadow-sm"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="md:sticky md:top-24 h-fit space-y-5">
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
                      activeCategory === cat ? 'bg-blueprint text-paper' : 'text-ink/70 hover:bg-steel'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-3">
              Vehicle Fitment
            </span>
            <label className="text-xs font-body text-slate block mb-1">Make</label>
            <select
              value={activeMake}
              onChange={(e) => { setActiveMake(e.target.value); setActiveModel('All') }}
              className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2 text-sm font-body text-ink mb-3 focus:outline-none focus:border-blueprint"
            >
              <option>All</option>
              {Object.keys(MAKES_MODELS).map((m) => <option key={m}>{m}</option>)}
            </select>

            <label className="text-xs font-body text-slate block mb-1">Model</label>
            <select
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value)}
              disabled={activeMake === 'All'}
              className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2 text-sm font-body text-ink disabled:opacity-40 focus:outline-none focus:border-blueprint"
            >
              <option>All</option>
              {modelOptions.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <span className="font-mono text-xs text-slate/60">
              {filtered.length.toLocaleString()} {filtered.length === 1 ? 'result' : 'results'}
            </span>
            {filtered.length > 0 && (
              <span className="font-mono text-xs text-slate/40">Page {page} of {totalPages}</span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate font-body">
              No parts match your search — try a different keyword or filter.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pageItems.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 6) * 0.05}>
                    <div className="group relative bg-paper border border-ink/10 rounded-lg overflow-hidden hover:border-blueprint hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">
                      {/* Condition-coded accent stripe */}
                      <span className={`absolute top-0 left-0 right-0 h-[3px] ${CONDITION_STRIPE[p.condition]}`} />

                      {[
                        'top-3 left-2 border-t border-l',
                        'top-3 right-2 border-t border-r',
                      ].map((pos) => (
                        <span key={pos} className={`absolute ${pos} w-3 h-3 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />
                      ))}

                      {p.imageUrl && (
                        <div className="h-36 bg-steel border-b border-ink/10">
                          <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="p-5 flex flex-col flex-grow pt-6">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase">
                            {p.category}
                          </span>
                          <span className="font-mono text-[10px] text-slate/50 uppercase">
                            {p.partBrand}
                          </span>
                        </div>

                        <h3 className="font-display font-semibold text-ink text-sm mb-1">{p.name}</h3>
                        <p className="font-mono text-[11px] text-slate/60 mb-3">Part No. {p.partNo}</p>

                        <div className="flex items-center gap-3 text-[10px] font-mono uppercase text-slate/60 mb-3">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock]}`} /> {p.stock}
                          </span>
                          <span>· {p.condition}</span>
                        </div>

                        <div className="mt-auto pt-3 border-t border-ink/5 space-y-1.5">
                          <div className="flex items-baseline justify-between">
                            <span className="font-body font-medium text-ink text-sm">
                              PKR {p.price.toLocaleString()}
                            </span>
                            <span className="font-mono text-[10px] text-slate/50 uppercase">
                              Min {p.moq} {p.unit}
                            </span>
                          </div>
                          <div className="font-mono text-[10px] text-blueprint uppercase">
                            Wholesale PKR {p.wholesalePrice.toLocaleString()} at {p.wholesaleMinQty}+ {p.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage((v) => Math.max(1, v - 1))}
                    disabled={page === 1}
                    className="h-9 w-9 flex items-center justify-center rounded-md border border-ink/10 bg-paper text-ink/70 hover:border-blueprint disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaChevronLeft size={12} />
                  </button>
                  <span className="font-mono text-xs text-slate/60 px-4">{page} / {totalPages}</span>
                  <button
                    onClick={() => setPage((v) => Math.min(totalPages, v + 1))}
                    disabled={page === totalPages}
                    className="h-9 w-9 flex items-center justify-center rounded-md border border-ink/10 bg-paper text-ink/70 hover:border-blueprint disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaChevronRight size={12} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products