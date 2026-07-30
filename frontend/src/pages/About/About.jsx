import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaWarehouse,
  FaStore,
  FaPaintBrush,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTruck,
  FaShieldAlt,
  FaCogs,
  FaCheckCircle,
  FaShippingFast,
  FaHandshake,
  FaBoxes
} from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { COMPANY } from '../../data/companyInfo'

const STATS = [
  { label: 'SKUs Managed', value: '27,000+' },
  { label: 'OEM Brands', value: '150+' },
  { label: 'Workshops Served', value: '1,200+' },
  { label: 'Dispatch Speed', value: 'Same Day' },
]

const PILLARS = [
  {
    icon: FaShieldAlt,
    title: '100% Verified Quality',
    desc: 'Every mechanical part, sensor, and body component undergoes rigorous cross-reference verification before cataloging.',
  },
  {
    icon: FaCogs,
    title: 'Precision OEM & Aftermarket',
    desc: 'Direct sourcing relationships with Tier-1 manufacturers ensure exact fitment for Japanese, European, and local vehicles.',
  },
  {
    icon: FaShippingFast,
    title: 'Rapid Logistics Network',
    desc: 'Integrated supply chain designed for high-frequency orders across commercial hubs and nationwide retail dispatch.',
  },
  {
    icon: FaHandshake,
    title: 'Transparent Pricing',
    desc: 'Tiered wholesale quotes for bulk buyers, retailers, and fleet owners without hidden markups or intermediary fees.',
  },
]

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Global Sourcing & Quality Audit',
    desc: 'We procure genuine parts and high-grade aftermarket accessories directly from verified manufacturers.',
  },
  {
    step: '02',
    title: 'Inventory & Fitment Indexing',
    desc: 'Parts are serialized with OEM reference numbers to ensure 100% compatibility before dispatch.',
  },
  {
    step: '03',
    title: 'Industrial Warehousing',
    desc: 'Stored in climate-controlled environments to protect precision electronics, gaskets, and finished body parts.',
  },
  {
    step: '04',
    title: 'Express Dispatch',
    desc: 'Delivered via our dedicated wholesale transport for local partners or trusted nationwide courier networks.',
  },
]

function About() {
  const [scrollY, setScrollY] = useState(0)

  // Scroll position listener for subtle parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-steel min-h-screen overflow-hidden">
      {/* ------------------ HERO SECTION WITH PARALLAX ------------------ */}
      <section className="relative overflow-hidden bg-paper border-b border-ink/10 py-20 md:py-28">
        {/* Parallax Blueprint Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.06] transition-transform duration-75 ease-out pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />

        {/* Decorative Parallax Glow Circle */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blueprint/10 blur-3xl pointer-events-none transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blueprint/10 border border-blueprint/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-blueprint animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
                Official Company Overview
              </span>
            </div>

            <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl text-ink mt-1 mb-6 max-w-4xl leading-tight">
              Powering the Automotive Industry with Precision Parts
            </h1>

            <p className="font-body text-slate text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              {COMPANY.name} supplies genuine and premium aftermarket auto spare parts at direct wholesale rates across{' '}
              <strong className="text-ink font-medium">{COMPANY.regionWholesale}</strong>, with nationwide retail sales and express delivery available across{' '}
              <strong className="text-ink font-medium">{COMPANY.regionRetail}</strong>.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-blueprint text-paper font-medium text-sm px-7 py-3.5 rounded-md hover:bg-ink transition-colors shadow-sm"
              >
                Browse Product Catalog
              </Link>
              <Link
                to="/wholesale"
                className="bg-paper border border-ink/15 text-ink font-medium text-sm px-7 py-3.5 rounded-md hover:border-blueprint hover:text-blueprint transition-colors"
              >
                Become Wholesale Partner
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------ STATS / METRICS BAR ------------------ */}
      <section className="bg-paper border-b border-ink/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <div className="border-l-2 border-blueprint pl-4 py-1">
                  <div className="font-mono font-semibold text-2xl sm:text-3xl text-ink">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate/70 mt-1">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-24">
        {/* ------------------ CORE OFFERINGS ------------------ */}
        <section>
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
              Core Divisions
            </span>
            <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink mb-10 max-w-xl">
              Engineered for workshops, auto retailers, and individual car owners
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [
                FaWarehouse,
                'Wholesale Supply',
                `Bulk and dealer pricing on genuine spare parts engineered for workshops, fleet managers, and spare part retailers across ${COMPANY.regionWholesale}.`,
                'Bulk Orders & Quotes',
              ],
              [
                FaStore,
                'Retail Distribution',
                'Direct ordering channel for individual car owners looking for hard-to-find components with reliable home delivery.',
                'Nationwide Shipping',
              ],
              [
                FaPaintBrush,
                'Car Accessories & Trim',
                'Beyond core mechanical items, we stock body upgrades, interior trims, lighting assemblies, and exterior protection parts.',
                'Styling & Utility',
              ],
            ].map(([Icon, title, desc, tag], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group relative bg-paper border border-ink/10 rounded-lg p-8 hover:border-blueprint transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl">
                  {/* Corner Accent Marks */}
                  <span className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-12 h-12 rounded-md bg-steel border border-ink/10 flex items-center justify-center mb-6 group-hover:bg-blueprint group-hover:text-paper transition-colors duration-300">
                    <Icon className="text-blueprint group-hover:text-paper text-xl transition-colors duration-300" />
                  </div>

                  <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase mb-2">
                    {tag}
                  </span>
                  <h3 className="font-display font-semibold text-ink text-xl mb-3">{title}</h3>
                  <p className="font-body text-sm text-slate leading-relaxed mb-6 flex-grow">{desc}</p>

                  <div className="pt-4 border-t border-ink/5 flex items-center justify-between font-mono text-xs text-blueprint">
                    <span>Explore Capabilities</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------ WHY CHOOSE US / PILLARS ------------------ */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 items-start">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
                  Why Choose Us
                </span>
                <h2 className="font-display font-semibold text-3xl text-ink mb-4">
                  Built on Technical Accuracy & Trust
                </h2>
                <p className="font-body text-slate text-sm leading-relaxed mb-6">
                  We eliminate catalog ambiguity by cross-matching part numbers, verifying OEM fitments, and ensuring parts arrive intact and on schedule.
                </p>

                <div className="p-4 bg-paper border border-ink/10 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blueprint shrink-0" />
                    <span className="font-body text-xs text-ink font-medium">Genuine OEM Cross-Referencing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blueprint shrink-0" />
                    <span className="font-body text-xs text-ink font-medium">Batch Quality Verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-blueprint shrink-0" />
                    <span className="font-body text-xs text-ink font-medium">Dedicated Fleet Support</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <Reveal key={pillar.title} delay={i * 0.1}>
                    <div className="bg-paper border border-ink/10 rounded-lg p-7 hover:border-blueprint/50 transition-colors h-full">
                      <Icon className="text-blueprint text-2xl mb-4" />
                      <h3 className="font-display font-semibold text-ink text-base mb-2">
                        {pillar.title}
                      </h3>
                      <p className="font-body text-xs text-slate leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ------------------ SUPPLY CHAIN PROCESS TIMELINE ------------------ */}
        <section className="bg-paper border border-ink/10 rounded-xl p-8 sm:p-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <Reveal>
            <div className="max-w-xl mb-12">
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
                Operational Workflow
              </span>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink">
                How We Guarantee Part Fitment & Quality
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <div className="relative">
                  <span className="font-mono font-bold text-4xl text-blueprint/20 block mb-2">
                    {step.step}
                  </span>
                  <h3 className="font-display font-semibold text-ink text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs text-slate leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------ COVERAGE & REGIONAL REACH ------------------ */}
        <section>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
                Regional Presence
              </span>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-ink">
                Distribution Network & Logistics Reach
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wholesale Coverage Card */}
              <div className="bg-paper border border-ink/10 rounded-xl p-8 relative overflow-hidden group hover:border-blueprint transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-blueprint/10 flex items-center justify-center text-blueprint">
                    <FaWarehouse />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase block">
                      Wholesale Hub
                    </span>
                    <h3 className="font-display font-semibold text-ink text-lg">
                      {COMPANY.regionWholesale}
                    </h3>
                  </div>
                </div>
                <p className="font-body text-sm text-slate leading-relaxed mb-6">
                  Bulk order fulfillment, scheduled delivery runs, and direct workshop accounts servicing businesses across {COMPANY.regionWholesale}.
                </p>
                <div className="flex items-center gap-2 font-mono text-xs text-ink/70 bg-steel p-3 rounded-md border border-ink/5">
                  <FaBoxes className="text-blueprint shrink-0" />
                  <span>Bulk Freight & Same-Day Local Dispatch Available</span>
                </div>
              </div>

              {/* Retail Logistics Card */}
              <div className="bg-paper border border-ink/10 rounded-xl p-8 relative overflow-hidden group hover:border-blueprint transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-md bg-blueprint/10 flex items-center justify-center text-blueprint">
                    <FaTruck />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase block">
                      Retail Logistics
                    </span>
                    <h3 className="font-display font-semibold text-ink text-lg">
                      {COMPANY.regionRetail}
                    </h3>
                  </div>
                </div>
                <p className="font-body text-sm text-slate leading-relaxed mb-6">
                  {COMPANY.deliveryNote}
                </p>
                <div className="flex items-center gap-2 font-mono text-xs text-ink/70 bg-steel p-3 rounded-md border border-ink/5">
                  <FaTruck className="text-blueprint shrink-0" />
                  <span>Insured Courier Delivery & Part Tracking</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ------------------ CONTACT / CTA BANNER ------------------ */}
        <section>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink px-8 py-12 md:py-16 shadow-2xl">
              {/* Dynamic Grid Effect */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Glowing Accent Circle */}
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blueprint-light/10 blur-3xl pointer-events-none" />

              <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-center">
                <div>
                  <span className="font-mono text-xs tracking-widest text-blueprint-light uppercase block mb-2">
                    Direct Contact
                  </span>
                  <h2 className="font-display font-semibold text-2xl sm:text-3xl text-paper mb-6">
                    Looking for a specific part or wholesale catalog quote?
                  </h2>

                  <div className="space-y-4">
                    {COMPANY.phones.map((p) => (
                      <div key={p.number} className="flex flex-wrap items-center gap-6">
                        <a
                          href={`tel:${p.tel}`}
                          className="flex items-center gap-2.5 font-mono text-sm text-steel/90 hover:text-paper transition-colors"
                        >
                          <FaPhoneAlt className="text-blueprint-light" size={13} /> {p.number} ({p.label})
                        </a>
                        <a
                          href={`https://wa.me/${p.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 font-mono text-sm text-steel/90 hover:text-paper transition-colors"
                        >
                          <FaWhatsapp className="text-blueprint-light" size={15} /> Instant WhatsApp
                        </a>
                      </div>
                    ))}

                    <div className="flex items-center gap-2.5 font-mono text-sm text-steel/70 pt-2 border-t border-paper/10">
                      <FaMapMarkerAlt className="text-blueprint-light shrink-0" size={13} />
                      {COMPANY.address ?? <span className="italic">Address details available on contact page</span>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/wholesale"
                    className="inline-block text-center bg-ignition text-paper font-medium px-8 py-4 rounded-md hover:brightness-110 transition shadow-lg whitespace-nowrap"
                  >
                    Become a Wholesale Partner
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-block text-center bg-paper/10 text-paper font-medium px-8 py-4 rounded-md hover:bg-paper/20 transition whitespace-nowrap border border-paper/20"
                  >
                    Contact Sales Team
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  )
}

export default About