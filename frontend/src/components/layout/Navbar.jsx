import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaWhatsapp, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import { CATEGORY_MENU } from '../../data/categoryMenu'
import { COMPANY } from '../../data/companyInfo'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catOpen, setCatOpen] = useState(false)
  const { itemCount } = useCart()

  const closeMobile = () => {
    setMobileOpen(false)
    setCatOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-xl border-b border-ink/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="font-display font-black text-2xl text-ink tracking-tight hover:opacity-80 transition-opacity" onClick={closeMobile}>
          Al Madina <span className="text-transparent bg-clip-text bg-gradient-to-r from-blueprint to-blue-600">Autos</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-body text-sm font-semibold text-slate">
          <Link to="/" className="hover:text-blueprint transition-colors">Home</Link>
          <Link to="/products" className="hover:text-blueprint transition-colors">Products</Link>
          <Link to="/wholesale" className="hover:text-blueprint transition-colors">Wholesale</Link>
          <Link to="/about" className="hover:text-blueprint transition-colors">About</Link>
          <Link to="/contact" className="hover:text-blueprint transition-colors">Contact</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${COMPANY.phones[0].whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm font-mono text-slate hover:text-emerald-600 transition-colors group font-semibold"
          >
            <FaWhatsapp className="text-lg text-emerald-500 group-hover:scale-110 transition-transform" /> 
            {COMPANY.phones[0].number}
          </a>
          
       <Link to="/cart" className="relative h-10 w-10 flex items-center justify-center rounded-md border border-ink/10 text-ink hover:border-blueprint hover:text-blueprint transition-colors">
  <FaShoppingCart size={15} />
  {itemCount > 0 && (
    <span className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 min-w-[18px] px-1 rounded-full bg-ignition text-paper text-[10px] font-mono flex items-center justify-center">
      {itemCount}
    </span>
  )}
</Link>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg bg-steel/50 border border-ink/5 text-ink hover:bg-white hover:text-blueprint hover:shadow-sm transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-y-auto bg-paper/95 backdrop-blur-xl border-b border-ink/10 transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col font-body text-base font-medium text-ink">
          <Link to="/" onClick={closeMobile} className="py-3.5 border-b border-ink/5 hover:text-blueprint transition-colors">Home</Link>
          <Link to="/products" onClick={closeMobile} className="py-3.5 border-b border-ink/5 hover:text-blueprint transition-colors">Products</Link>

          {/* Shop by Category accordion */}
          <button
            onClick={() => setCatOpen((v) => !v)}
            className="py-3.5 border-b border-ink/5 flex items-center justify-between text-left group hover:text-blueprint transition-colors"
          >
            <span className="font-mono text-xs font-bold tracking-widest uppercase">
              Shop by Category
            </span>
            <FaChevronDown size={12} className={`text-slate transition-transform duration-300 ${catOpen ? 'rotate-180 text-blueprint' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-steel/20 rounded-b-lg ${catOpen ? 'max-h-[500px] mb-2' : 'max-h-0'}`}>
            <div className="flex flex-col px-4 py-2">
              {CATEGORY_MENU.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={closeMobile}
                  className="py-2.5 font-mono text-xs font-semibold text-slate hover:text-blueprint transition-colors"
                >
                  — {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/wholesale" onClick={closeMobile} className="py-3.5 border-b border-ink/5 hover:text-blueprint transition-colors">Wholesale</Link>
          <Link to="/about" onClick={closeMobile} className="py-3.5 border-b border-ink/5 hover:text-blueprint transition-colors">About</Link>
          <Link to="/contact" onClick={closeMobile} className="py-3.5 border-b border-ink/5 hover:text-blueprint transition-colors">Contact</Link>

          <div className="pt-6 pb-2 flex flex-col gap-4">
            <a
              href={`https://wa.me/${COMPANY.phones[0].whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 font-mono font-bold text-sm text-ink bg-steel/50 py-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              <FaWhatsapp className="text-emerald-500 text-lg" /> Chat on WhatsApp
            </a>
            
            <Link 
              to="/wholesale" 
              onClick={closeMobile}
              className="flex items-center justify-center bg-gradient-to-r from-blueprint to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md shadow-blueprint/20"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar