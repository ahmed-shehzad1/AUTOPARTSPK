import { Link } from 'react-router-dom'
import Hero from '../../components/home/Hero'
import Reveal from '../../components/common/Reveal'
import {
  FaCogs, FaCarSide, FaBolt, FaCar,
  FaCompactDisc, FaFilter, FaLightbulb, FaTools, FaCheckCircle,
} from 'react-icons/fa'

function Home() {
  return (
    <div>
      <Hero />

    {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
            Full inventory
          </span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mt-2 mb-10">
            Shop by Category
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { name: 'Engine Parts', code: 'CAT-ENG', icon: FaCogs },
            { name: 'Suspension', code: 'CAT-SUS', icon: FaCarSide },
            { name: 'Electrical', code: 'CAT-ELE', icon: FaBolt },
            { name: 'Body Parts', code: 'CAT-BDY', icon: FaCar },
            { name: 'Brakes', code: 'CAT-BRK', icon: FaCompactDisc },
            { name: 'Filters', code: 'CAT-FIL', icon: FaFilter },
            { name: 'Lighting', code: 'CAT-LGT', icon: FaLightbulb },
            { name: 'Accessories', code: 'CAT-ACC', icon: FaTools },
          ].map(({ name, code, icon: Icon }, i) => (
            <Reveal key={name} delay={i * 0.06}>
              <div className="group bg-paper border border-ink/10 rounded-lg p-6 text-center hover:border-blueprint hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                <div className="h-14 w-14 mx-auto flex items-center justify-center rounded-md bg-steel group-hover:bg-blueprint transition-colors duration-300 mb-4">
                  <Icon className="text-blueprint group-hover:text-paper transition-colors duration-300 text-xl" />
                </div>
                <p className="font-body font-medium text-ink text-sm mb-1">{name}</p>
                <p className="font-mono text-[10px] tracking-widest text-slate/60 uppercase">{code}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-paper border-y border-ink/10 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
              Why AutoPartsPK
            </span>
            <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mt-2 mb-12">
              Built for workshops and dealers
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [FaTools, 'Bulk & Wholesale Pricing', 'Special rates for workshops, retailers and dealers across Pakistan.'],
              [FaCheckCircle, 'Genuine Quality', 'Sourced from trusted manufacturers and verified suppliers.'],
              [FaCar, 'Nationwide Delivery', 'Fast, reliable shipping to every major city in Pakistan.'],
            ].map(([Icon, title, desc], i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="border border-ink/10 rounded-lg p-7 hover:border-blueprint transition-colors duration-300 h-full">
                  <Icon className="text-blueprint text-2xl mb-4" />
                  <h3 className="font-display font-semibold text-ink mb-2">{title}</h3>
                  <p className="font-body text-sm text-slate">{desc}</p>
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
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative">
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-paper mb-4">
                Own a workshop or auto shop?
              </h2>
              <p className="font-body text-steel/70 mb-8 max-w-xl mx-auto">
                Get wholesale pricing and priority stock access when you register as a bulk buyer.
              </p>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-9 font-mono text-xs text-steel/60">
                {['No minimum order', 'Priority stock access', 'Dedicated account support'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <FaCheckCircle className="text-blueprint-light" /> {item}
                  </span>
                ))}
              </div>

              <Link
                to="/wholesale"
                className="inline-block bg-ignition text-paper font-medium px-8 py-3 rounded-md hover:brightness-95 transition"
              >
                Apply for Wholesale Account
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  )
}

export default Home