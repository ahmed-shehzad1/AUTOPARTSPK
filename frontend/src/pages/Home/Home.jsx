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
      <section className="relative bg-steel py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
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
                <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
                  Full inventory
                </span>
                <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mt-2">
                  Shop by Category
                </h2>
              </div>
              <span className="font-mono text-xs tracking-widest text-slate/50 uppercase">
                08 categories listed
              </span>
            </div>
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
                <div className="group relative bg-paper border border-ink/10 rounded-lg p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer h-full overflow-hidden">
                  {/* Corner registration brackets, appear on hover */}
                  {[
                    'top-2 left-2 border-t border-l',
                    'top-2 right-2 border-t border-r',
                    'bottom-2 left-2 border-b border-l',
                    'bottom-2 right-2 border-b border-r',
                  ].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} w-3 h-3 border-blueprint opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                  ))}

                  <div className="h-14 w-14 mx-auto flex items-center justify-center rounded-full border border-dashed border-blueprint-light/40 group-hover:border-blueprint group-hover:bg-blueprint transition-colors duration-300 mb-4">
                    <Icon className="text-blueprint group-hover:text-paper transition-colors duration-300 text-xl" />
                  </div>
                  <p className="font-body font-medium text-ink text-sm mb-1">{name}</p>
                  <p className="font-mono text-[10px] tracking-widest text-slate/60 uppercase">{code}</p>

                  <span className="absolute bottom-0 left-0 h-[2px] bg-blueprint w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blueprint-light/40 to-transparent" />
      </section>

      {/* Why choose us */}
      <section className="relative bg-paper py-20">
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
                <div className="group relative bg-steel/40 border border-ink/10 rounded-lg p-7 pl-9 hover:border-blueprint transition-colors duration-300 h-full overflow-hidden">
                  {/* Left accent bar, grows on hover */}
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-blueprint scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                  <div className="flex items-center justify-between mb-4">
                    <Icon className="text-blueprint text-2xl" />
                    <span className="font-mono text-[10px] tracking-widest text-slate/40">
                      N&deg; 0{i + 1}
                    </span>
                  </div>
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
            {/* Corner registration brackets on the panel itself */}
            {[
              'top-4 left-4 border-t border-l',
              'top-4 right-4 border-t border-r',
              'bottom-4 left-4 border-b border-l',
              'bottom-4 right-4 border-b border-r',
            ].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} w-4 h-4 border-blueprint-light/40`}
              />
            ))}

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