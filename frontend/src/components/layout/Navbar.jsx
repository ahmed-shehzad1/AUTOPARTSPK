import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import { CATEGORY_MENU } from '../../data/categoryMenu'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)

  const closeMobile = () => {
    setMobileOpen(false)
    setCatOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4 border-b border-ink/10">
        <Link to="/" className="font-display font-semibold text-xl text-ink" onClick={closeMobile}>
          Al Madina <span className="text-blueprint">Autos</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-ink/80">
          <Link to="/" className="hover:text-blueprint transition-colors">Home</Link>
          <Link to="/products" className="hover:text-blueprint transition-colors">Products</Link>
          <Link to="/wholesale" className="hover:text-blueprint transition-colors">Wholesale</Link>
          <Link to="/about" className="hover:text-blueprint transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blueprint transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/92XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-mono text-slate hover:text-blueprint transition-colors"
          >
            <FaWhatsapp /> +92-XXX-XXXXXXX
          </a>
          <Link
            to="/wholesale"
            className="hidden sm:inline-block bg-ink text-paper text-sm font-medium px-5 py-2.5 rounded-md hover:bg-blueprint transition-colors"
          >
            Get Quote
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-md border border-ink/10 text-ink"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-y-auto bg-paper border-b border-ink/10 transition-all duration-300 ${
          mobileOpen ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col font-body text-sm text-ink/80">
          <Link to="/" onClick={closeMobile} className="py-3 border-b border-ink/5">Home</Link>
          <Link to="/products" onClick={closeMobile} className="py-3 border-b border-ink/5">Products</Link>

          {/* Shop by Category accordion */}
          <button
            onClick={() => setCatOpen((v) => !v)}
            className="py-3 border-b border-ink/5 flex items-center justify-between text-left"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-slate">
              Shop by Category
            </span>
            <FaChevronDown size={10} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${catOpen ? 'max-h-96' : 'max-h-0'}`}>
            <div className="flex flex-col pl-3">
              {CATEGORY_MENU.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={closeMobile}
                  className="py-2.5 font-mono text-xs text-slate hover:text-blueprint transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/wholesale" onClick={closeMobile} className="py-3 border-b border-ink/5">Wholesale</Link>
          <Link to="/about" onClick={closeMobile} className="py-3 border-b border-ink/5">About</Link>
          <Link to="/contact" onClick={closeMobile} className="py-3 border-b border-ink/5">Contact</Link>

          <a
            href="https://wa.me/92XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-4 font-mono text-sm text-blueprint"
          >
            <FaWhatsapp /> +92-XXX-XXXXXXX
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar