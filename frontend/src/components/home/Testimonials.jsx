import Reveal from '../common/Reveal'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

// Real workshop / wholesale buyer feedback placeholders
const TESTIMONIALS = [
  {
    quote: 'Consistent stock and fast dispatch — exactly what we need for daily workshop turnover.',
    role: 'Workshop Owner',
    city: 'Multan',
    initial: 'M'
  },
  {
    quote: 'Wholesale pricing made it worth switching our whole parts supply over. Highly recommended.',
    role: 'Auto Parts Retailer',
    city: 'Bahawalpur',
    initial: 'B'
  },
  {
    quote: 'Ordering by part number saves us so much time compared to browsing catalogs manually.',
    role: 'Garage Manager',
    city: 'Rahim Yar Khan',
    initial: 'R'
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-ink py-24 border-b border-white/10 overflow-hidden">
      {/* Subtle Industrial Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#EDF0F2 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 z-10">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-xs font-bold tracking-widest text-blueprint uppercase bg-blueprint/15 px-3 py-1.5 rounded-sm block mb-3 border border-blueprint/30">
              Trusted Feedback
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight uppercase">
              What Our Buyers Say
            </h2>
            <p className="font-body text-slate text-base md:text-lg mt-2 font-medium">
              Proven reliability for workshops and parts retailers across Pakistan.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={`${t.city}-${i}`} delay={i * 0.12}>
              <div className="group relative bg-[#1B222B] border border-white/10 rounded-xl p-8 h-full hover:border-blueprint/50 transition-all duration-300 flex flex-col justify-between shadow-md">
                
                {/* Watermark Quote Icon */}
                <FaQuoteLeft className="absolute top-6 right-6 text-5xl text-white/5 group-hover:text-blueprint/10 transition-colors duration-300 pointer-events-none" />

                <div>
                  {/* Star Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-[#C9962B] text-sm" />
                    ))}
                  </div>

                  {/* Quote Text */}
                  <p className="font-body text-base text-steel/90 leading-relaxed mb-8">
                    "{t.quote}"
                  </p>
                </div>

                {/* Author Meta */}
                <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-blueprint/20 border border-blueprint/40 flex items-center justify-center font-display font-bold text-blueprint text-base">
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">{t.role}</p>
                    <p className="font-mono text-[10px] tracking-wider text-slate uppercase mt-0.5">{t.city}</p>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}