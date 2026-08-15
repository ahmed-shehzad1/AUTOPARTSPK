import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../../components/home/Hero'
import Reveal from '../../components/common/Reveal'
import ParallaxLayer from '../../components/common/ParallaxLayer'
import BrandMarquee from '../../components/home/BrandMarquee'
import CategorySelector from '../../components/home/CategorySelector'
import HowItWorks from '../../components/home/HowItWorks'
import AudienceTabs from '../../components/home/AudienceTabs'
import Testimonials from '../../components/home/Testimonials'
import AnimatedCounter from '../../components/common/AnimatedCounter'
import { COMPANY } from '../../data/companyInfo'
import warehouseImg from '../../assets/images/parts-warehouse.jpg'
import {
  FaCogs, FaCarSide, FaBolt, FaCar, FaCompactDisc, FaFilter, FaLightbulb, FaTools,
  FaCheckCircle, FaSearch, FaArrowRight, FaShieldAlt, FaShippingFast, FaEye, FaTag,
} from 'react-icons/fa'
import FeaturedCarousel from '../../components/home/FeaturedCarousel'

const API_BASE = 'http://localhost:4000/api'

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



function Home() {
  const navigate = useNavigate()
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')

const [categories, setCategories] = useState([])
const [makes, setMakes] = useState([])
const [featuredProducts, setFeaturedProducts] = useState([])
const [featuredLoading, setFeaturedLoading] = useState(true)
const [siteStats, setSiteStats] = useState([])

  useEffect(() => {
  fetch(`${API_BASE}/categories`).then((r) => r.json()).then(setCategories).catch(() => {})
  fetch(`${API_BASE}/makes`).then((r) => r.json()).then(setMakes).catch(() => {})
  fetch(`${API_BASE}/settings/stats`).then((r) => r.json()).then(setSiteStats).catch(() => {})

  fetch(`${API_BASE}/products?featured=true&page=1&pageSize=4`)
    .then((r) => r.json())
    .then((data) => setFeaturedProducts(data.items || []))
    .catch(() => {})
}, [])

  const modelOptions = selectedMake ? makes.find((m) => m.name === selectedMake)?.models || [] : []

  const handleVehicleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedMake) params.set('make', selectedMake)
    if (selectedModel) params.set('model', selectedModel)
    navigate(`/products?${params.toString()}`)
  }

  return (
    <div className="bg-steel min-h-screen">
      <Hero />

      <div className="border-b border-ink/10 bg-paper">
        <BrandMarquee />
      </div>

      {/* Vehicle Finder */}
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
                    {makes.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
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
                    {modelOptions.map((m) => <option key={m.id} value={m.name}>{m.name}</option>)}
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

      {/* Categories — dark interactive selector, live data */}
      <section className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-blueprint-light uppercase block mb-2">
                  Full Catalog
                </span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-paper">
                  Shop by Category
                </h2>
              </div>
              <Link to="/products" className="font-mono text-xs tracking-widest text-blueprint-light hover:text-paper transition-colors uppercase flex items-center gap-2">
                View All <FaArrowRight size={10} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <CategorySelector categories={categories} iconMap={CATEGORY_ICONS} fallbackIcon={FaCogs} />
          </Reveal>
        </div>
      </section>

      <section className="relative py-24 bg-paper border-y border-ink/10 overflow-hidden">
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />
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

    <FeaturedCarousel products={featuredProducts} loading={featuredLoading} />
  </div>
</section>



      <HowItWorks />
      
      <AudienceTabs />

      {/* Stats strip */}
      <section className="bg-ink py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
         {siteStats.map((stat, i) => (
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