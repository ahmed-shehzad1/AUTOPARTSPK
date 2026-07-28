import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        <Link to="/" className="font-display font-semibold text-xl text-ink">
          AutoParts<span className="text-blueprint">PK</span>
        </Link>

        <nav className="hidden md:flex gap-8 font-body text-sm font-medium text-ink/80">
          <Link to="/" className="hover:text-blueprint transition-colors">
            Home
          </Link>
          <Link to="/products" className="hover:text-blueprint transition-colors">
            Products
          </Link>
          <Link to="/wholesale" className="hover:text-blueprint transition-colors">
            Wholesale
          </Link>
          <Link to="/about" className="hover:text-blueprint transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-blueprint transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/92XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-mono text-slate hover:text-blueprint transition-colors"
          >
            <FaWhatsapp />
            +92-XXX-XXXXXXX
          </a>

          <Link
            to="/wholesale"
            className="bg-ink text-paper text-sm font-medium px-5 py-2.5 rounded-md hover:bg-blueprint transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar