import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'

function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-gray-200 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <span>Wholesale Auto Parts Supplier — Pakistan</span>
          <div className="flex gap-4">
            <a href="tel:+92XXXXXXXXXX" className="flex items-center gap-1 hover:text-white">
              <FaPhoneAlt /> +92-XXX-XXXXXXX
            </a>
            <a href="https://wa.me/92XXXXXXXXXX" className="flex items-center gap-1 hover:text-white">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          AutoParts<span className="text-gray-800">PK</span>
        </Link>

        <nav className="hidden md:flex gap-8 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-700">Home</Link>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          <Link to="/wholesale" className="hover:text-blue-700">Wholesale</Link>
          <Link to="/about" className="hover:text-blue-700">About</Link>
          <Link to="/contact" className="hover:text-blue-700">Contact</Link>
        </nav>

        <Link
          to="/wholesale"
          className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Get Wholesale Quote
        </Link>
      </div>
    </header>
  )
}

export default Navbar