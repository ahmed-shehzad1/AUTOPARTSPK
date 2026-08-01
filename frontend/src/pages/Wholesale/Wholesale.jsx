import { useState } from 'react'
import { FaCheckCircle, FaTruck, FaHeadset, FaTags, FaMoneyBillWave } from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { CATEGORIES } from '../../data/products'
import { useLocation } from 'react-router-dom'

const VOLUME_OPTIONS = [
  'Under PKR 50,000 / month',
  'PKR 50,000 – 200,000 / month',
  'PKR 200,000 – 500,000 / month',
  'Above PKR 500,000 / month',
]

function Wholesale() {
 const [form, setForm] = useState({
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  city: '',
  volume: '',
  categories: [],
  message: location.state?.prefill || '',
})
  const location = useLocation()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const toggleCategory = (cat) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.businessName || !form.contactName || !form.phone) {
      setError('Business name, contact name, and phone number are required.')
      return
    }
    setError('')
    // No backend yet — this is where a real API call goes once one exists.
    // e.g. await fetch('/api/wholesale-inquiries', { method: 'POST', body: JSON.stringify(form) })
    setSubmitted(true)
  }

  return (
    <div className="bg-steel min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-paper border-b border-ink/10 py-16">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">
            For workshops, retailers &amp; dealers
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-2 mb-4">
            Wholesale &amp; Bulk Orders
          </h1>
          <p className="font-body text-slate max-w-xl">
            Competitive per-unit pricing at volume, dedicated support, and priority stock access — for businesses that buy parts regularly, not just once.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* Benefits */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {[
              [FaTags, 'Tiered Pricing', 'Lower per-unit cost the more you order.'],
              [FaTruck, 'Priority Stock', 'First access when supply is limited.'],
              [FaHeadset, 'Dedicated Support', 'A direct contact for your account.'],
              [FaMoneyBillWave, 'Flexible Payment', 'COD, bank transfer, JazzCash or EasyPaisa.'],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="bg-paper border border-ink/10 rounded-lg p-5 text-center">
                <Icon className="text-blueprint text-xl mx-auto mb-3" />
                <p className="font-display font-semibold text-ink text-sm mb-1">{title}</p>
                <p className="font-body text-xs text-slate">{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* How it works */}
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
            Process
          </span>
          <h2 className="font-display font-semibold text-2xl text-ink mb-10">How Wholesale Works</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            ['Submit an inquiry', 'Tell us what you need and how much you typically order.'],
            ['We confirm pricing & availability', 'Our team reviews your request and responds within 24 hours.'],
            ['Order and receive delivery', 'Place recurring orders directly — instant for smaller quantities, confirmed manually for large ones.'],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="relative bg-paper border border-ink/10 rounded-lg p-6 h-full">
                <span className="font-mono text-[10px] tracking-widest text-slate/40 block mb-3">
                  N&deg; 0{i + 1}
                </span>
                <h3 className="font-display font-semibold text-ink mb-2">{title}</h3>
                <p className="font-body text-sm text-slate">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Inquiry form */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10">
            <div>
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
                Get Started
              </span>
              <h2 className="font-display font-semibold text-2xl text-ink mb-4">
                Request Wholesale Access
              </h2>
              <p className="font-body text-slate text-sm max-w-sm">
                Fill in your business details and what you're looking for — we'll get back to you with pricing and next steps within one business day.
              </p>
            </div>

            <div className="bg-paper border border-ink/10 rounded-lg p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <FaCheckCircle className="text-blueprint text-3xl mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-ink text-lg mb-2">
                    Inquiry received
                  </h3>
                  <p className="font-body text-slate text-sm max-w-sm mx-auto">
                    Thanks, {form.contactName.split(' ')[0] || 'there'} — our team will contact you at {form.phone} within 24 hours to confirm pricing and availability.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={form.businessName}
                        onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                        className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        value={form.contactName}
                        onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                        className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="+92 3XX XXXXXXX"
                        className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                        className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                        Estimated Monthly Volume
                      </label>
                      <select
                        value={form.volume}
                        onChange={(e) => setForm((f) => ({ ...f, volume: e.target.value }))}
                        className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                      >
                        <option value="">Select a range</option>
                        {VOLUME_OPTIONS.map((v) => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                      Categories You're Interested In
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className={`font-mono text-xs px-3 py-1.5 rounded-md border transition-colors ${
                            form.categories.includes(cat)
                              ? 'bg-blueprint text-paper border-blueprint'
                              : 'bg-steel text-slate border-ink/10 hover:border-blueprint'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">
                      Additional Details
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Specific parts, brands, or quantities you're looking for..."
                      className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-xs text-ignition">{error}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default Wholesale