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
    <div className="bg-steel min-h-screen selection:bg-blueprint/30 selection:text-ink">
      <Hero/>

     <div className="border-b border-ink/10 bg-paper/80 backdrop-blur-md">
  <BrandMarquee/>
</div>

      {/* Vehicle Finder - Modernized with Glassmorphism & Gradients */}
      <section className="bg-paper border-b border-ink/5 py-12 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blueprint/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <Reveal>
            <div className="bg-white/50 backdrop-blur-xl border border-ink/10 shadow-xl shadow-blueprint/5 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blueprint to-ignition" />
              
              <span className="font-mono text-xs tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blueprint to-ignition uppercase font-bold block mb-6">
                Find Parts For Your Vehicle
              </span>

              <form onSubmit={handleVehicleSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
                <div className="group">
                  <label className="text-[11px] font-mono text-slate/70 uppercase block mb-1.5 group-focus-within:text-blueprint transition-colors">Make</label>
                  <select
                    value={selectedMake}
                    onChange={(e) => { setSelectedMake(e.target.value); setSelectedModel('') }}
                    className="w-full bg-paper/80 backdrop-blur-sm border border-ink/10 rounded-lg px-4 py-3 text-sm font-body text-ink focus:outline-none focus:ring-2 focus:ring-blueprint/20 focus:border-blueprint transition-all shadow-sm"
                  >
                    <option value="">All Makes</option>
                    {Object.keys(MAKES_MODELS).map((make) => <option key={make} value={make}>{make}</option>)}
                  </select>
                </div>

                <div className="group">
                  <label className="text-[11px] font-mono text-slate/70 uppercase block mb-1.5 group-focus-within:text-blueprint transition-colors">Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedMake}
                    className="w-full bg-paper/80 backdrop-blur-sm border border-ink/10 rounded-lg px-4 py-3 text-sm font-body text-ink disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blueprint/20 focus:border-blueprint transition-all shadow-sm"
                  >
                    <option value="">All Models</option>
                    {modelOptions.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blueprint to-blue-600 text-paper font-semibold text-sm rounded-lg px-4 py-3 hover:shadow-lg hover:shadow-blueprint/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 h-[46px]"
                >
                  <FaSearch size={14} /> Find Compatible Parts
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories - Colorful Hover Effects */}
      <section className="relative bg-steel py-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2 font-semibold">
                  Full Catalog
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
                  Shop by Category
                </h2>
              </div>
              <Link className="group font-mono text-xs tracking-widest text-blueprint hover:text-ignition transition-colors uppercase flex items-center gap-2 font-semibold" to="/products">
                View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, i) => {
              const IconComponent = CATEGORY_ICONS[cat] || FaCogs
              return (
                <Reveal delay={i * 0.05} key={cat}>
                  <Link 
                    className="group relative block bg-paper/60 backdrop-blur-sm border border-ink/5 rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-2xl hover:shadow-blueprint/10 hover:border-blueprint/30 transition-all duration-500 cursor-pointer h-full overflow-hidden" 
                    to={`/products?category=${encodeURIComponent(cat)}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blueprint/5 to-ignition/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative h-16 w-16 mx-auto flex items-center justify-center rounded-2xl bg-steel/50 border border-ink/5 group-hover:bg-gradient-to-br group-hover:from-blueprint group-hover:to-blue-500 group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-blueprint/40 transition-all duration-500 mb-5">
                      <IconComponent className="text-slate-500 group-hover:text-paper transition-colors duration-500 text-2xl"/>
                    </div>
                    <p className="relative font-body font-semibold text-ink text-sm md:text-base mb-1 group-hover:text-blueprint transition-colors">{cat}</p>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-blueprint to-ignition w-0 group-hover:w-1/2 rounded-t-full transition-all duration-500" />
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-paper py-24 border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="font-mono text-xs tracking-widest text-ignition uppercase block mb-2 font-semibold">
                  High-Demand Parts
                </span>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-ink to-slate-600">
                  Featured Catalog Items
                </h2>
              </div>
              <Link className="group font-mono text-xs tracking-widest text-blueprint hover:text-ink transition-colors uppercase flex items-center gap-2 font-semibold" to="/products">
                Explore Full Catalog <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p, i) => (
              <Reveal delay={i * 0.08} key={p.id}>
                <Link 
                  className="group relative block bg-white border border-ink/5 rounded-2xl overflow-hidden hover:border-blueprint/30 hover:shadow-2xl hover:shadow-blueprint/10 hover:-translate-y-2 transition-all duration-500 h-full flex flex-col" 
                  to={`/products/${p.id}`}
                >
                  <span className={`absolute top-0 left-0 right-0 h-1 ${CONDITION_STRIPE[p.condition]} opacity-80 group-hover:opacity-100 transition-opacity`} />

                  {p.images && p.images.length > 0 && (
                    <div className="h-48 bg-steel/20 border-b border-ink/5 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] tracking-widest text-blueprint font-bold uppercase bg-blueprint/10 px-2 py-1 rounded">{p.category}</span>
                      <span className="font-mono text-[10px] text-slate/50 font-semibold uppercase">{p.partBrand}</span>
                    </div>
                    <h3 className="font-display font-bold text-ink text-base leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blueprint group-hover:to-blue-600 transition-all">{p.name}</h3>
                    <p className="font-mono text-xs text-slate/60 mb-4">Part No. <span className="font-semibold text-slate/80">{p.partNo}</span></p>

                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase font-semibold text-slate/60 mb-4">
                      <span className="flex items-center gap-1.5 bg-steel px-2 py-1 rounded-md">
                        <span className={`w-1.5 h-1.5 rounded-full ${STOCK_DOT[p.stock]} shadow-sm`} /> {p.stock}
                      </span>
                      <span className="bg-steel px-2 py-1 rounded-md">{p.condition}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-ink/5">
                      <span className="font-display font-bold text-ink text-lg">PKR {p.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks/>
      <AudienceTabs/>

      {/* Stats strip - Enhanced with Parallax effect */}
      <section 
        className="relative py-24 overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: 'linear-gradient(to right bottom, #0f172a, #1e293b, #0f172a)'
        }}
      >
        {/* Parallax Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none bg-fixed"></div>
        <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {SITE_STATS.map((stat, i) => (
            <Reveal delay={i * 0.1} key={stat.id}>
              <div className="group flex flex-col items-center justify-center p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                <span className="font-display font-black text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-br from-blueprint-light via-white to-blueprint block mb-3 drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter value={stat.value} />
                </span>
                <span className="font-mono text-xs text-steel/80 uppercase tracking-widest font-semibold group-hover:text-white transition-colors">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials/>

      {/* Why choose us */}
      <section className="relative bg-paper py-24">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-steel/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase font-bold block mb-3">
                Why {COMPANY.name}
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ink leading-tight">
                Built for Workshops, Dealers &amp; Vehicle Owners
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              [FaTools, 'Bulk & Wholesale Pricing', `Competitive commercial rates for registered workshops and retailers across ${COMPANY.regionWholesale}.`, 'from-blue-500/10 to-transparent'],
              [FaShieldAlt, 'Genuine Quality', 'Sourced from trusted manufacturers and verified distributors ensuring peak performance.', 'from-emerald-500/10 to-transparent'],
              [FaShippingFast, 'Nationwide Delivery', COMPANY.deliveryNote, 'from-purple-500/10 to-transparent'],
            ].map(([Icon, title, desc, gradient], i) => (
              <Reveal delay={i * 0.15} key={title}>
                <div className="group relative bg-white border border-ink/5 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blueprint to-ignition scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />
                  
                  <div className="relative flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-steel/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                      <Icon className="text-blueprint text-2xl group-hover:text-blue-600 transition-colors"/>
                    </div>
                    <span className="font-mono text-xs tracking-widest text-slate/30 font-bold group-hover:text-blueprint/30 transition-colors">N&deg; 0{i + 1}</span>
                  </div>
                  
                  <h3 className="relative font-display font-bold text-ink text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-ink group-hover:to-blueprint transition-all">{title}</h3>
                  <p className="relative font-body text-sm text-slate leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale CTA - Vibrant & Modern */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink text-center shadow-2xl shadow-ink/20 group">
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#111827] to-[#1e1b4b] transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blueprint via-transparent to-transparent pointer-events-none" />
            
            <div className="relative px-8 py-16 md:py-20">
              <div className="inline-block p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 mb-6">
                <FaTools className="text-blueprint-light text-3xl"/>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 tracking-tight">
                Own a workshop or retail auto shop?
              </h2>
              <p className="font-body text-steel/80 mb-10 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                Get wholesale pricing and priority stock access when you register as a bulk buyer. Unlock exclusive margins today.
              </p>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10 font-mono text-sm text-steel/90 font-semibold">
                {['No minimum order limit', 'Priority stock allocation', 'Dedicated support'].map((item) => (
                  <span key={item} className="flex items-center gap-2.5">
                    <FaCheckCircle className="text-ignition text-lg drop-shadow-[0_0_8px_rgba(255,107,0,0.5)]"/> {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-5">
                <Link className="bg-gradient-to-r from-ignition to-orange-600 text-white font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:-translate-y-1 transition-all duration-300" to="/wholesale">
                  Apply for Wholesale Account
                </Link>
                <Link className="bg-white/5 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/40 hover:-translate-y-1 transition-all duration-300" to="/contact">
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