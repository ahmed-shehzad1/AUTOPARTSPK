import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-steel/80">
      {/* Fading top hairline */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blueprint-light/50 to-transparent" />

      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-blueprint-light) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-light) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-paper/10">

          {/* Brand */}
          <div>
            <span className="font-mono text-xs tracking-widest text-blueprint-light uppercase">
              Fig. 02 — Directory
            </span>

            <h3 className="font-display font-semibold text-xl text-paper mt-2 mb-3">
              Al Madina <span className="text-blueprint-light">Autos</span>
            </h3>

            <p className="font-body text-sm text-steel/50 max-w-xs leading-relaxed">
              Genuine and aftermarket auto parts supplied at retail and wholesale
              scale across Pakistan.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-steel/40 mb-4">
              Navigate
            </h4>

            <ul className="space-y-3 text-sm font-body">
              <li>
                <Link
                  to="/products"
                  className="hover:text-blueprint-light transition-colors"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/wholesale"
                  className="hover:text-blueprint-light transition-colors"
                >
                  Wholesale
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-blueprint-light transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-blueprint-light transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-steel/40 mb-4">
              Contact
            </h4>

            <ul className="space-y-3 text-sm font-body">
              <li className="flex items-center gap-3">
                <FaPhoneAlt
                  className="text-blueprint-light shrink-0"
                  size={12}
                />
                +92-XXX-XXXXXXX
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope
                  className="text-blueprint-light shrink-0"
                  size={12}
                />
                info@almadinaautos.com
              </li>

              <li className="flex items-center gap-3">
                <FaMapMarkerAlt
                  className="text-blueprint-light shrink-0"
                  size={12}
                />
                DG Khan, Pakistan
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-steel/40 mb-4">
              Follow
            </h4>

            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaWhatsapp].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 flex items-center justify-center rounded-md bg-paper/5 border border-paper/10 text-steel/60 hover:bg-blueprint-light hover:text-ink hover:border-blueprint-light transition-colors duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs font-mono text-steel/40">
          <span>
            © {new Date().getFullYear()} Al Madina Autos — ALL RIGHTS RESERVED
          </span>

          <span className="text-steel/30">
            CATALOG REF: PAK-2026 · WHOLESALE &amp; RETAIL
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer