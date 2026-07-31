import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../../components/home/Hero'
import Reveal from '../../components/common/Reveal'
import BrandMarquee from '../../components/home/BrandMarquee'
import { PRODUCTS, CATEGORIES, MAKES_MODELS } from '../../data/products'
import { COMPANY } from '../../data/companyInfo'
import {
  FaCogs, FaCarSide, FaBolt, FaCar, FaCompactDisc, FaFilter, FaLightbulb, FaTools,
  FaCheckCircle, FaSearch, FaArrowRight, FaShieldAlt, FaShippingFast,
} from 'react-icons/fa'
import HowItWorks from '../../components/home/HowItWorks'
import AudienceTabs from '../../components/home/AudienceTabs'
import Testimonials from '../../components/home/Testimonials'
import AnimatedCounter from '../../components/common/AnimatedCounter'

const CATEGORY_ICONS = {
  'Engine Parts': FaCogs,
  Suspension: FaCarSide,
  Electrical: FaBolt,
  'Body Parts': FaCar,
  Brakes: FaCompactDisc,
  Filters: FaFilter,
  Lighting: FaLightbulb,
  Accessories: FaTools,
}

const STOCK_DOT = {
  'In Stock': 'bg-blueprint',
  'Limited Stock': 'bg-ignition',
  Backorder: 'bg-slate',
}
const CONDITION_STRIPE = {
  New: 'bg-blueprint',
  Used: 'bg-slate',
  Refurbished: 'bg-ignition',
}

// Placeholder — becomes a real admin-editable record once the backend exists.
// (Note: not localStorage-backed, since that only persists per-browser, not site-wide.)
const SITE_STATS = [
  { id: 'stat-1', label: 'Catalog SKUs', value: '27,000+' },
  { id: 'stat-2', label: 'Workshop Partners', value: '500+' },
  { id: 'stat-3', label: 'Cities Covered', value: '120+' },
  { id: 'stat-4', label: 'Years in Business', value: '15+' },
]

function Home() {
  const navigate = useNavigate()
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')

  const modelOptions = selectedMake && MAKES_MODELS[selectedMake] ? MAKES_MODELS[selectedMake] : []

  const handleVehicleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedMake) params.set('make', selectedMake)
    if (selectedModel) params.set('model', selectedModel)
    navigate(`/products?${params.toString()}`)
  }

  const featuredProducts = PRODUCTS.slice(0, 4)

  return (
    <div className="bg-steel min-h-screen">
      <Hero />

      <div className="border-b border-ink/10 bg-paper">
        <BrandMarquee />
      </div>

      {/* Vehicle Finder */}
      <section className="bg-paper border-b border-ink/10 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="bg-steel border border-ink/10 rounded-xl p-5 md:p-6">
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase font-semibold block mb-4">
                Find Parts For Your Vehicle
              </span>

              <form onSubmit={handleVehicleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="text-[11px] font-mono text-slate/70 uppercase block mb-1">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel('') }}
                    className="w-full bg-paper border border-ink/10 rounded-md px-3 py-2.5 text-xs font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                  >
                    <option value="">All Makes</option>
                    {Object.keys(MAKES_MODELS).map((make) => <option key={make} value={make}>{make}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate/70 uppercase block mb-1">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedMake}
                    className="w-full bg-paper border border-ink/10 rounded-md px-3 py-2.5 text-xs font-body text-ink disabled:opacity-40 focus:outline-none focus:border-blueprint transition-colors"
                  >
                    <option value="">All Models</option>
                    {modelOptions.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blueprint text-paper font-medium text-xs rounded-md px-4 py-2.5 hover:bg-ink transition-colors flex items-center justify-center gap-2 h-[38px]"
                >
                  <FaSearch size={12} /> Find Compatible Parts
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="relative bg-steel py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-1">
                  Full Catalog
                </span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink">
                  Shop by Category
                </h2>
              </div>
              <Link to="/products" className="font-mono text-xs tracking-widest text-blueprint hover:text-ink transition-colors uppercase flex items-center gap-2">
                View All <FaArrowRight size={10} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {CATEGORIES.map((cat, i) => {
              const IconComponent = CATEGORY_ICONS[cat] || FaCogs
              return (
                <Reveal key={cat} delay={i * 0.05}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="group relative block bg-paper border border-ink/10 rounded-lg p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full overflow-hidden"
                  >
                    {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((pos) => (
                      <span key={pos} className={`absolute ${pos} w-3 h-3 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    ))}
                    <div className="relative h-14 w-14 mx-auto flex items-center justify-center rounded-full border border-dashed border-blueprint-light/40 group-hover:border-blueprint group-hover:bg-blueprint transition-colors duration-300 mb-4">
                      <IconComponent className="text-blueprint group-hover:text-paper transition-colors duration-300 text-xl" />
                    </div>
                    <p className="relative font-body font-medium text-ink text-sm mb-1">{cat}</p>
                    <span className="absolute bottom-0 left-0 h-[2px] bg-blueprint w-0 group-hover:w-full transition-all duration-500" />
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    

      {/* Featured Products — same card language as the real Products page */}
      <section className="bg-paper py-20 border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-1">
                  High-Demand Parts
                </span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink">
                  Featured Catalog Items
                </h2>
              </div>
              <Link to="/products" className="font-mono text-xs tracking-widest text-blueprint hover:text-ink transition-colors uppercase flex items-center gap-2">
                Explore Full Catalog <FaArrowRight size={10} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Link
                  to={`/products/${p.id}`}
                  className="group relative block bg-steel border border-ink/10 rounded-lg overflow-hidden hover:border-blueprint hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col"
                >
                  <span className={`absolute top-0 left-0 right-0 h-[3px] ${CONDITION_STRIPE[p.condition]}`} />
                  {['top-3 left-2 border-t border-l', 'top-3 right-2 border-t border-r'].map((pos) => (
                    <span key={pos} className={`absolute ${pos} w-3 h-3 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />
                  ))}

                  {p.images && p.images.length > 0 && (
                    <div className="h-36 bg-paper border-b border-ink/10 overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-grow pt-6">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase">{p.category}</span>
                      <span className="font-mono text-[10px] text-slate/50 uppercase">{p.partBrand}</span>
                    </div>
                    <h3 className="font-display font-semibold text-ink text-sm mb-1 group-hover:text-blueprint transition-colors">{p.name}</h3>
                    <p className="font-mono text-[11px] text-slate/60 mb-3">Part No. {p.partNo}</p>

                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-slate/60 mb-3">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock]}`} /> {p.stock}
                      </span>
                      <span>· {p.condition}</span>
                    </div>

                    <div className="mt-auto pt-3 border-t border-ink/5">
                      <span className="font-body font-medium text-ink text-sm">PKR {p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

        <HowItWorks />
<AudienceTabs />

      {/* Stats strip */}
      <section className="bg-ink text-paper py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {SITE_STATS.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.05}>
              <div>
              <span className="font-display font-bold text-2xl md:text-3xl text-blueprint-light block mb-1">
  <AnimatedCounter value={stat.value} />
</span>
                <span className="font-mono text-[11px] text-steel/70 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Why choose us */}
      <section className="relative bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-1">
              Why {COMPANY.name}
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-12">
              Built for Workshops, Dealers &amp; Vehicle Owners
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [FaTools, 'Bulk & Wholesale Pricing', `Competitive commercial rates for registered workshops and retailers across ${COMPANY.regionWholesale}.`],
              [FaShieldAlt, 'Genuine Quality', 'Sourced from trusted manufacturers and verified distributors.'],
              [FaShippingFast, 'Nationwide Delivery', COMPANY.deliveryNote],
            ].map(([Icon, title, desc], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group relative bg-steel/40 border border-ink/10 rounded-lg p-7 pl-9 hover:border-blueprint transition-colors duration-300 h-full overflow-hidden">
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-blueprint scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="text-blueprint text-2xl" />
                    <span className="font-mono text-[10px] tracking-widest text-slate/40">N&deg; 0{i + 1}</span>
                  </div>
                  <h3 className="font-display font-semibold text-ink mb-2">{title}</h3>
                  <p className="font-body text-sm text-slate leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-ink px-8 py-14 md:py-16 text-center">
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r', 'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r'].map((pos) => (
              <span key={pos} className={`absolute ${pos} w-4 h-4 border-blueprint-light/40`} />
            ))}

            <div className="relative">
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-paper mb-4">
                Own a workshop or retail auto shop?
              </h2>
              <p className="font-body text-steel/70 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Get wholesale pricing and priority stock access when you register as a bulk buyer.
              </p>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-9 font-mono text-xs text-steel/80">
                {['No minimum order limit', 'Priority stock allocation', 'Dedicated support'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-blueprint-light" /> {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/wholesale" className="bg-ignition text-paper font-medium px-8 py-3 rounded-md hover:brightness-95 transition">
                  Apply for Wholesale Account
                </Link>
                <Link to="/contact" className="bg-transparent border border-steel/20 text-paper font-medium px-8 py-3 rounded-md hover:border-paper transition-colors">
                  Contact Sales Team
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default Home