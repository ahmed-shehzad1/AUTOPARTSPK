import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../../components/home/Hero'
import Reveal from '../../components/common/Reveal'
import ParallaxLayer from '../../components/common/ParallaxLayer'
import BrandMarquee from '../../components/home/BrandMarquee'
import CategoryIndex from '../../components/home/CategoryIndex'
import HowItWorks from '../../components/home/HowItWorks'
import AudienceTabs from '../../components/home/AudienceTabs'
import Testimonials from '../../components/home/Testimonials'
import AnimatedCounter from '../../components/common/AnimatedCounter'
import { PRODUCTS, CATEGORIES, MAKES_MODELS } from '../../data/products'
import { COMPANY } from '../../data/companyInfo'
import warehouseImg from '../../assets/images/parts-warehouse.jpg'
import {
  FaCogs, FaCarSide, FaBolt, FaCar, FaCompactDisc, FaFilter, FaLightbulb, FaTools,
  FaCheckCircle, FaSearch, FaArrowRight, FaShieldAlt, FaShippingFast, FaEye, FaTag,
} from 'react-icons/fa'

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

      {/* Vehicle Finder — steel + grid texture instead of flat white */}
      <section className="relative bg-steel border-b border-ink/10 py-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="bg-paper border border-ink/10 rounded-xl p-6 md:p-8 shadow-sm">
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase font-semibold block mb-5">
                Find Parts For Your Vehicle
              </span>

              <form onSubmit={handleVehicleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
                <div>
                  <label className="text-[11px] font-mono text-slate/70 uppercase block mb-1.5">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel('') }}
                    className="w-full bg-steel border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                  >
                    <option value="">All Makes</option>
                    {Object.keys(MAKES_MODELS).map((make) => <option key={make} value={make}>{make}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate/70 uppercase block mb-1.5">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedMake}
                    className="w-full bg-steel border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink disabled:opacity-40 focus:outline-none focus:border-blueprint transition-colors"
                  >
                    <option value="">All Models</option>
                    {modelOptions.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blueprint text-paper font-medium text-sm rounded-md px-4 py-3 hover:bg-ink transition-colors flex items-center justify-center gap-2 h-[46px]"
                >
                  <FaSearch size={13} /> Find Compatible Parts
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories — index/directory layout */}
      <section className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
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

          <CategoryIndex categories={CATEGORIES} iconMap={CATEGORY_ICONS} fallbackIcon={FaCogs} />
        </div>
      </section>

      {/* Featured Products — parallax warehouse image behind the grid */}
      <section className="relative py-24 overflow-hidden border-y border-ink/10">
        <ParallaxLayer strength={40}>
          <img src={warehouseImg} alt="" className="w-full h-full object-cover scale-110" />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-paper/93" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <div className="group relative bg-paper rounded-lg border border-ink/10 hover:border-blueprint hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full overflow-hidden">
                  <div className="relative h-40 bg-steel border-b border-ink/10 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3 left-3 z-10 font-mono text-[10px] tracking-widest uppercase bg-ink/80 text-paper px-2.5 py-1 rounded">
                      {p.category}
                    </span>
                    <span className="absolute top-3 right-3 z-10 flex items-center gap-1.5 font-mono text-[10px] uppercase text-ink bg-paper/90 px-2 py-1 rounded">
                      <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock]}`} /> {p.stock}
                    </span>

                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <span className="font-mono text-xs text-slate/40">No image yet</span>
                    )}

                    <Link
                      to={`/products/${p.id}`}
                      className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <span className="bg-paper text-ink font-mono text-xs font-semibold uppercase px-4 py-2 rounded-md flex items-center gap-2">
                        <FaEye size={12} /> View Details
                      </span>
                    </Link>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate/60 uppercase mb-2">
                      <span className="text-blueprint">{p.partBrand}</span>
                      <span>{p.condition}</span>
                    </div>
                    <h3 className="font-display font-semibold text-ink text-sm mb-2 group-hover:text-blueprint transition-colors">
                      <Link to={`/products/${p.id}`}>{p.name}</Link>
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate mb-4">
                      <FaTag size={9} className="text-blueprint" /> {p.partNo}
                    </div>
                    <div className="mt-auto pt-3 border-t border-ink/5">
                      <span className="font-display font-semibold text-ink">PKR {p.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <AudienceTabs />

      {/* Stats strip */}
      <section className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {SITE_STATS.map((stat, i) => (
            <Reveal key={stat.id} delay={i * 0.1}>
              <div>
                <span className="font-display font-bold text-3xl md:text-4xl text-blueprint-light block mb-2">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="font-mono text-xs text-steel/70 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* Why choose us */}
      <section className="bg-paper py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
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
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
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
              <p className="font-body text-steel/70 mb-8 max-w-xl mx-auto">
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