import { Link } from 'react-router-dom'
import { FaWarehouse, FaStore, FaPaintBrush, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaTruck } from 'react-icons/fa'
import Reveal from '../../components/common/Reveal'
import { COMPANY } from '../../data/companyInfo'

function About() {
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
            About Us
          </span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-2 mb-4">
            {COMPANY.name}
          </h1>
          <p className="font-body text-slate max-w-xl">
            {COMPANY.name} supplies genuine and aftermarket auto spare parts at wholesale rates across {COMPANY.regionWholesale}, with retail sales and nationwide delivery available across {COMPANY.regionRetail}.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* What we do */}
        <Reveal>
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase block mb-2">
            What We Do
          </span>
          <h2 className="font-display font-semibold text-2xl text-ink mb-10">
            Built to supply workshops, dealers and individual buyers
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            [FaWarehouse, 'Wholesale Supply', `Bulk pricing on spare parts for workshops and retailers across ${COMPANY.regionWholesale}.`],
            [FaStore, 'Retail Sales', 'Individual buyers can order parts directly, with delivery available nationwide.'],
            [FaPaintBrush, 'Decoration Parts', 'Beyond mechanical parts, we also supply car decoration and accessory items.'],
          ].map(([Icon, title, desc], i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="group relative bg-paper border border-ink/10 rounded-lg p-7 pl-9 hover:border-blueprint transition-colors duration-300 h-full overflow-hidden">
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-blueprint scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />
                <Icon className="text-blueprint text-2xl mb-4" />
                <h3 className="font-display font-semibold text-ink mb-2">{title}</h3>
                <p className="font-body text-sm text-slate">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Coverage */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <div className="bg-paper border border-ink/10 rounded-lg p-7">
              <FaWarehouse className="text-blueprint text-xl mb-3" />
              <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase">
                Wholesale Coverage
              </span>
              <h3 className="font-display font-semibold text-ink text-lg mt-1 mb-2">
                {COMPANY.regionWholesale}
              </h3>
              <p className="font-body text-sm text-slate">
                Bulk and dealer pricing available for workshops and retailers throughout {COMPANY.regionWholesale}.
              </p>
            </div>
            <div className="bg-paper border border-ink/10 rounded-lg p-7">
              <FaTruck className="text-blueprint text-xl mb-3" />
              <span className="font-mono text-[10px] tracking-widest text-blueprint uppercase">
                Retail Delivery
              </span>
              <h3 className="font-display font-semibold text-ink text-lg mt-1 mb-2">
                {COMPANY.regionRetail}
              </h3>
              <p className="font-body text-sm text-slate">{COMPANY.deliveryNote}</p>
            </div>
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-ink px-8 py-12 md:py-14">
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h2 className="font-display font-semibold text-2xl text-paper mb-5">
                  Get in Touch
                </h2>
                <div className="space-y-3">
                  {COMPANY.phones.map((p) => (
                    <div key={p.number} className="flex flex-wrap items-center gap-4">
                      <a href={`tel:${p.tel}`} className="flex items-center gap-2 font-mono text-sm text-steel/80 hover:text-paper transition-colors">
                        <FaPhoneAlt className="text-blueprint-light" size={12} /> {p.number} ({p.label})
                      </a>
                      <a href={`https://wa.me/${p.whatsapp}`} className="flex items-center gap-2 font-mono text-sm text-steel/80 hover:text-paper transition-colors">
                        <FaWhatsapp className="text-blueprint-light" size={13} /> WhatsApp
                      </a>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 font-mono text-sm text-steel/60 pt-1">
                    <FaMapMarkerAlt className="text-blueprint-light shrink-0" size={12} />
                    {COMPANY.address ?? <span className="italic">Address coming soon</span>}
                  </div>
                </div>
              </div>
              <Link
                to="/wholesale"
                className="inline-block text-center bg-ignition text-paper font-medium px-7 py-3 rounded-md hover:brightness-95 transition whitespace-nowrap"
              >
                Become a Wholesale Partner
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default About