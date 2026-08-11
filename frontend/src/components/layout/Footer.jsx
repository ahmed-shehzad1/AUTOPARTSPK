import { Link } from 'react-router-dom'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa'

function Footer() {
  const company = useCompanyInfo()
  return (

    
    <footer className="relative overflow-hidden bg-ink text-steel/80">
      {/* Fading top hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blueprint/50 to-transparent" />

      {/* Background glow & Grid */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blueprint/10 blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/5">

          {/* Brand */}
          <div>
            <span className="font-mono text-[10px] font-bold tracking-widest text-blueprint uppercase bg-blueprint/10 px-2 py-1 rounded-md">
              Fig. 02 — Directory
            </span>

            <h3 className="font-display font-black text-2xl text-white mt-5 mb-4 tracking-tight">
              Al Madina <span className="text-transparent bg-clip-text bg-gradient-to-r from-blueprint to-blue-500">Autos</span>
            </h3>

            <p className="font-body text-sm text-steel/60 max-w-xs leading-relaxed">
              Genuine and aftermarket auto parts supplied at retail and wholesale
              scale across Pakistan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-white/40 mb-6">
              Navigate
            </h4>

            <ul className="space-y-4 text-sm font-body font-medium">
              {[
                { name: 'Products', path: '/products' },
                { name: 'Wholesale', path: '/wholesale' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-steel/70 hover:text-white transition-colors duration-300 inline-block"
                  >
                    <span className="w-0 h-[1px] bg-blueprint mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300 ease-out" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-white/40 mb-6">
              Contact
            </h4>

            <ul className="space-y-4 text-sm font-body font-medium text-steel/70">
              {company.phones.map((p, i) => (
                <li key={p.label || i}>
                  <a href={`tel:${p.tel}`} className="group flex items-start gap-3 hover:text-white transition-colors duration-300">
                    <FaPhoneAlt className="text-blueprint mt-1 shrink-0 group-hover:scale-110 transition-transform" size={12} />
                    <span>
                      {p.label || i} <span className="text-steel/40 block text-xs mt-0.5 uppercase tracking-wider">{p.label}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 pt-2">
                <FaMapMarkerAlt className="text-blueprint mt-1 shrink-0" size={12} />
                <span className="leading-relaxed">
                  {company.address ?? <span className="italic text-steel/40">Address coming soon</span>}
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-white/40 mb-6">
              Follow
            </h4>

            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaWhatsapp].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-steel/60 hover:bg-gradient-to-br hover:from-blueprint hover:to-blue-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-blueprint/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-mono text-steel/40">
  <span>© {new Date().getFullYear()} {company.name?.toUpperCase()} — ALL RIGHTS RESERVED</span>
  <div className="flex gap-5">
    <Link to="/privacy-policy" className="hover:text-steel/70 transition-colors">Privacy</Link>
    <Link to="/terms-of-service" className="hover:text-steel/70 transition-colors">Terms</Link>
    <Link to="/return-policy" className="hover:text-steel/70 transition-colors">Returns</Link>
  </div>
</div>
      </div>
    </footer>
  )
}

export default Footer