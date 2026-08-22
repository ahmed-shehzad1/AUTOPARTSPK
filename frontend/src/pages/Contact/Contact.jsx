import { useState, useEffect } from 'react'
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaQuestionCircle,
  FaChevronDown,
  FaPaperPlane,
  FaCopy,
  FaBoxes,
} from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'

const INQUIRY_TYPES = [
  'Part Availability & Fitment',
  'Wholesale Catalog / Bulk Order',
  'Existing Order Status',
  'Part Cross-Reference Request',
  'General Inquiry',
]
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const FAQS = [
  {
    q: 'How do I verify if a part fits my specific car model?',
    a: 'You can share your vehicle chassis number (VIN) or frame number with our team via WhatsApp or the contact form. We cross-reference it against official manufacturer catalogs.',
  },
  {
    q: 'What are your wholesale order minimums (MOQ)?',
    a: 'Wholesale tiering typically begins at 5 to 10 units per SKU, depending on the component category. Bulk discounts apply automatically on qualified quantities.',
  },
  {
    q: 'What are the delivery timeframes for retail and wholesale?',
    a: 'Local commercial hubs in our main wholesale region receive same-day or next-day delivery. Nationwide retail shipments arrive within 2 to 4 business days via tracked couriers.',
  },
  {
    q: 'Do you offer Cash on Delivery (COD)?',
    a: 'Yes, COD is available for standard retail orders nationwide. Bulk wholesale dispatches require advance payment or approved credit terms.',
  },
]

function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: INQUIRY_TYPES[0],
    message: '',
  })
  const company = useCompanyInfo()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [copiedPhone, setCopiedPhone] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [isOpenNow, setIsOpenNow] = useState(true)

  // Check current business hours (Monday - Saturday, 9 AM - 8 PM)
  useEffect(() => {
    const now = new Date()
    const day = now.getDay() // 0 = Sunday
    const hour = now.getHours()
    setIsOpenNow(day !== 0 && hour >= 9 && hour < 20)
  }, [])

const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) {
      setError('Name, phone, and message are required.')
      return
    }
    setError('')

    try {
      const res = await fetch(`${API_BASE}/inquiries/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Submit failed')
      setSubmitted(true)
    } catch (err) {
      setError('Could not send your message — please check your connection and try again.')
    }
  }
  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedPhone(text)
    setTimeout(() => setCopiedPhone(null), 2000)
  }

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      inquiryType: INQUIRY_TYPES[0],
      message: '',
    })
    setSubmitted(false)
  }

  return (
    <div className="bg-steel min-h-screen">
      {/* ------------------ HERO SECTION ------------------ */}
      <section className="relative overflow-hidden bg-paper border-b border-ink/10 py-16 md:py-20">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-blueprint) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10">
          <Reveal>
            <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
              Direct Support &amp; Sales
            </span>
            <h1 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
              Contact {company.name}
            </h1>
            <p className="font-body text-slate max-w-2xl text-base leading-relaxed">
              Have a question regarding part compatibility, bulk pricing, or order delivery? Reach out to our technical team directly via phone, WhatsApp, or through the inquiry form below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------ MAIN CONTENT GRID ------------------ */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10">
        {/* Left Column: Direct Channels & Hours */}
        <div className="space-y-6">
          {/* Quick WhatsApp Action Banner */}
          <Reveal>
            <div className="bg-blueprint text-paper rounded-lg p-6 relative overflow-hidden shadow-md">
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="font-mono text-[10px] tracking-widest uppercase opacity-80 block mb-1">
                    Fastest Response Channel
                  </span>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Need Part Fitment Instantly?
                  </h3>
                  <p className="font-body text-xs text-paper/80 mb-4 max-w-xs leading-relaxed">
                    Send us your vehicle details or chassis number (VIN) on WhatsApp for immediate catalog matching.
                  </p>
                </div>
                <FaWhatsapp size={36} className="text-paper/20 shrink-0" />
              </div>

              {company.phones[0] && (
                <a
                  href={`https://wa.me/${company.phones[0].whatsapp}?text=${encodeURIComponent(
                    'Hi AutoPartsPK, I have an inquiry about part fitment and availability.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-paper text-ink font-medium text-xs px-5 py-2.5 rounded-md hover:bg-steel transition-colors"
                >
                  <FaWhatsapp className="text-blueprint" size={14} /> Start WhatsApp Chat
                </a>
              )}
            </div>
          </Reveal>

          {/* Contact Details */}
          <Reveal delay={0.1}>
            <div className="bg-paper border border-ink/10 rounded-lg p-6 space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block border-b border-ink/5 pb-2">
                Direct Phone Lines
              </span>

              <div className="space-y-5">
                {company.phones.map((p, i) => (
  <div key={p.label || i} className="group flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[10px] text-blueprint uppercase mb-0.5">
                        {p.label}
                      </p>
                      <div className="flex items-center gap-3">
                        <a
                          href={`tel:${p.tel}`}
                          className="font-body font-medium text-sm text-ink hover:text-blueprint transition-colors"
                        >
                          {p.number}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(p.number)}
                        title="Copy Number"
                        className="p-2 rounded hover:bg-steel text-slate/60 hover:text-ink transition-colors"
                      >
                        <FaCopy size={12} />
                      </button>
                      <a
                        href={`https://wa.me/${p.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded bg-steel hover:bg-blueprint hover:text-paper text-slate transition-colors"
                        title="Open WhatsApp"
                      >
                        <FaWhatsapp size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {copiedPhone && (
                <div className="font-mono text-[11px] text-blueprint bg-blueprint/10 px-3 py-1.5 rounded text-center">
                  Copied {copiedPhone} to clipboard!
                </div>
              )}
            </div>
          </Reveal>

          {/* Location & Coverage */}
          <Reveal delay={0.2}>
            <div className="bg-paper border border-ink/10 rounded-lg p-6">
              <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-3 border-b border-ink/5 pb-2">
                Location &amp; Regional Reach
              </span>
              <div className="flex items-start gap-2.5 font-body text-sm text-ink mb-3">
                <FaMapMarkerAlt className="text-blueprint shrink-0 mt-1" size={14} />
                <span>
                  {company.address ?? (
                    <span className="italic text-slate">Main Hub Address Available Upon Request</span>
                  )}
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-xs text-slate/80 bg-steel p-3 rounded-md border border-ink/5">
                <div className="flex items-center gap-2">
                  <FaBoxes className="text-blueprint" size={12} />
                  <span>Wholesale Hub: {company.regionWholesale}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blueprint" size={12} />
                  <span>Retail Logistics: {company.regionRetail}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Business Hours with Live Indicator */}
          <Reveal delay={0.3}>
            <div className="bg-paper border border-ink/10 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4 border-b border-ink/5 pb-2">
                <span className="font-mono text-[10px] tracking-widest text-slate/60 uppercase flex items-center gap-2">
                  <FaClock className="text-blueprint" size={11} /> Business Hours
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] ${
                    isOpenNow
                      ? 'bg-blueprint/10 text-blueprint border border-blueprint/20'
                      : 'bg-slate/10 text-slate border border-slate/20'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isOpenNow ? 'bg-blueprint animate-pulse' : 'bg-slate'
                    }`}
                  />
                  {isOpenNow ? 'Open Now' : 'Currently Closed'}
                </span>
              </div>

              <div className="font-body text-sm text-ink space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate">Monday – Saturday</span>
                  <span className="font-mono text-xs font-medium">9:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate">Sunday</span>
                  <span className="font-mono text-xs text-ignition">Closed</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Inquiry Form */}
        <Reveal delay={0.1}>
          <div className="bg-paper border border-ink/10 rounded-lg p-6 sm:p-8 relative shadow-sm">
            {/* Corner Decorative Accent */}
            <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blueprint opacity-40" />

            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-blueprint/10 text-blueprint rounded-full flex items-center justify-center mx-auto">
                  <FaCheckCircle size={32} />
                </div>
                <h3 className="font-display font-semibold text-ink text-xl">
                  Inquiry Received
                </h3>
                <p className="font-body text-slate text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-ink">{form.name}</strong>. Our team has received your query regarding{' '}
                  <span className="text-blueprint font-medium">{form.inquiryType}</span> and will reach out to{' '}
                  <strong className="text-ink">{form.phone}</strong> shortly.
                </p>

                <div className="pt-6">
                  <button
                    onClick={resetForm}
                    className="bg-steel border border-ink/10 text-ink text-xs font-mono uppercase px-6 py-2.5 rounded-md hover:border-blueprint transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-ink/5 pb-3">
                  <h3 className="font-display font-semibold text-ink text-lg">
                    Send an Inquiry
                  </h3>
                  <p className="font-body text-xs text-slate">
                    Fill out the form below and an auto parts specialist will respond to you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="e.g. Tariq Mahmood"
                      className="w-full bg-steel border border-ink/10 rounded-md px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="03XX XXXXXXX"
                      className="w-full bg-steel border border-ink/10 rounded-md px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="name@example.com"
                      className="w-full bg-steel border border-ink/10 rounded-md px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-1.5">
                      Inquiry Category *
                    </label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm((f) => ({ ...f, inquiryType: e.target.value }))}
                      className="w-full bg-steel border border-ink/10 rounded-md px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                    >
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-1.5">
                    Message / Part Details *
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Include part numbers, car make, model, year, or chassis number if applicable..."
                    className="w-full bg-steel border border-ink/10 rounded-md px-3.5 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors resize-none"
                  />
                </div>

                {error && <p className="font-mono text-xs text-ignition">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FaPaperPlane size={12} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      {/* ------------------ FAQ ACCORDION SECTION ------------------ */}
      <section className="border-t border-ink/10 bg-paper py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <Reveal>
            <div className="text-center mb-10">
              <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="font-display font-semibold text-2xl md:text-3xl text-ink">
                Quick Answers Before You Contact Us
              </h2>
            </div>
          </Reveal>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <Reveal key={faq.q} delay={index * 0.05}>
                  <div className="border border-ink/10 rounded-lg overflow-hidden bg-steel/50 transition-colors">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-display font-medium text-ink hover:text-blueprint transition-colors"
                    >
                      <span className="flex items-center gap-3 text-sm sm:text-base">
                        <FaQuestionCircle className="text-blueprint shrink-0" size={14} />
                        {faq.q}
                      </span>
                      <FaChevronDown
                        size={12}
                        className={`text-slate transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-xs sm:text-sm font-body text-slate leading-relaxed border-t border-ink/5 bg-paper">
                        {faq.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact