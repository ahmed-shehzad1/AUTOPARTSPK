import Reveal from '../common/Reveal'
import { FaQuoteLeft } from 'react-icons/fa'

// Placeholder testimonials — replace with real customer quotes before launch.
const TESTIMONIALS = [
  { quote: 'Consistent stock and fast dispatch — exactly what we need for daily workshop turnover.', role: 'Workshop Owner', city: 'Multan' },
  { quote: 'Wholesale pricing made it worth switching our whole parts supply over.', role: 'Auto Parts Retailer', city: 'Bahawalpur' },
  { quote: 'Ordering by part number saves us so much time compared to browsing catalogs.', role: 'Garage Manager', city: 'Rahim Yar Khan' },
]

function Testimonials() {
  return (
    <section className="bg-ink py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-blueprint-light uppercase block mb-2">Feedback</span>
          <h2 className="font-display font-semibold text-2xl md:text-3xl text-paper mb-12">What buyers are saying</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.city} delay={i * 0.1}>
              <div className="bg-paper/5 border border-paper/10 rounded-lg p-6 h-full">
                <FaQuoteLeft className="text-gold text-lg mb-4" />
                <p className="font-body text-sm text-steel/80 mb-5 leading-relaxed">"{t.quote}"</p>
                <p className="font-mono text-[10px] tracking-widest text-steel/40 uppercase">{t.role} — {t.city}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials