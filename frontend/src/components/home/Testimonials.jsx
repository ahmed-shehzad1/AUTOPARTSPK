import Reveal from '../common/Reveal'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'

// Placeholder testimonials — replace with real customer quotes before launch.
const TESTIMONIALS = [
  { quote: 'Consistent stock and fast dispatch — exactly what we need for daily workshop turnover.', role: 'Workshop Owner', city: 'Multan' },
  { quote: 'Wholesale pricing made it worth switching our whole parts supply over. Highly recommended.', role: 'Auto Parts Retailer', city: 'Bahawalpur' },
  { quote: 'Ordering by part number saves us so much time compared to browsing catalogs manually.', role: 'Garage Manager', city: 'Rahim Yar Khan' },
]

function Testimonials() {
  return (
    <section className="relative bg-ink py-28 overflow-hidden">
      {/* Deep Space Background Effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blueprint/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-ignition/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3 translate-y-1/3" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-xs font-bold tracking-widest text-blueprint-light uppercase bg-blueprint/10 px-3 py-1.5 rounded-full block mb-4 border border-blueprint/20">
              Trusted Feedback
            </span>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight">
              What our buyers are saying
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.city} delay={i * 0.15}>
              <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 hover:border-blueprint/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col">
                
                {/* Watermark Quote Icon */}
                <FaQuoteLeft className="absolute top-6 right-6 text-6xl text-white/[0.03] group-hover:text-blueprint/[0.05] transition-colors duration-500 group-hover:scale-110 group-hover:-rotate-12" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-ignition text-sm drop-shadow-[0_0_4px_rgba(255,107,0,0.4)]" />
                  ))}
                </div>
                
                <p className="relative z-10 font-body text-base text-steel/90 mb-8 leading-relaxed flex-grow">
                  "{t.quote}"
                </p>
                
                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blueprint to-blue-600 flex items-center justify-center font-display font-bold text-white text-lg shadow-lg shadow-blueprint/30">
                    {t.role.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">{t.role}</p>
                    <p className="font-mono text-[10px] tracking-widest text-blueprint-light uppercase mt-0.5">{t.city}</p>
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

export default Testimonials