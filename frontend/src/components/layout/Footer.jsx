import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-ink text-steel/80">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display font-semibold text-lg text-paper mb-3">
            AutoParts<span className="text-blueprint-light">PK</span>
          </h3>
          <p className="font-body text-sm text-steel/60 max-w-xs">
            Genuine and aftermarket auto parts supplied at retail and wholesale scale, across Pakistan.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-steel/50 mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm font-body">
            <li><Link to="/products" className="hover:text-paper transition-colors">Products</Link></li>
            <li><Link to="/wholesale" className="hover:text-paper transition-colors">Wholesale</Link></li>
            <li><Link to="/about" className="hover:text-paper transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-paper transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-steel/50 mb-4">Contact</h4>
          <ul className="space-y-2 text-sm font-body text-steel/60">
            <li>+92-XXX-XXXXXXX</li>
            <li>info@autopartspk.com</li>
            <li>Lahore, Pakistan</li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest uppercase text-steel/50 mb-4">Follow</h4>
          <div className="flex gap-4 text-lg text-steel/60">
            <a href="#" className="hover:text-paper transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-paper transition-colors"><FaInstagram /></a>
            <a href="#" className="hover:text-paper transition-colors"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 text-center py-5 text-xs font-mono text-steel/40">
        © {new Date().getFullYear()} AUTOPARTSPK — ALL RIGHTS RESERVED
      </div>
    </footer>
  )
}

export default Footer