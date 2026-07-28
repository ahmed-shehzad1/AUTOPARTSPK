import { Link } from 'react-router-dom'
import Hero from '../../components/home/Hero'

function Home() {
  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-2">
          Shop by Category
        </h2>
        <p className="font-mono text-xs tracking-widest text-slate uppercase mb-10">
          Full inventory — updated weekly
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {['Engine Parts', 'Suspension', 'Electrical', 'Body Parts', 'Brakes', 'Filters', 'Lighting', 'Accessories'].map((cat) => (
            <div
              key={cat}
              className="bg-paper border border-ink/10 rounded-lg p-6 text-center hover:border-blueprint hover:shadow-md transition cursor-pointer"
            >
              <div className="h-16 flex items-center justify-center text-slate/50 font-mono text-xs mb-3">
                [ image ]
              </div>
              <p className="font-body font-medium text-ink text-sm">{cat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-paper border-y border-ink/10 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            ['Bulk & Wholesale Pricing', 'Special rates for workshops, retailers and dealers across Pakistan.'],
            ['Genuine Quality', 'Sourced from trusted manufacturers and verified suppliers.'],
            ['Nationwide Delivery', 'Fast, reliable shipping to every major city in Pakistan.'],
          ].map(([title, desc]) => (
            <div key={title}>
              <h3 className="font-display font-semibold text-ink mb-2">{title}</h3>
              <p className="font-body text-sm text-slate">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20 text-center">
        <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink mb-4">
          Own a workshop or auto shop?
        </h2>
        <p className="font-body text-slate mb-8 max-w-xl mx-auto">
          Get wholesale pricing and priority stock access when you register as a bulk buyer.
        </p>
        <Link
          to="/wholesale"
          className="inline-block bg-ignition text-paper font-medium px-8 py-3 rounded-md hover:brightness-95 transition"
        >
          Apply for Wholesale Account
        </Link>
      </section>
    </div>
  )
}

export default Home