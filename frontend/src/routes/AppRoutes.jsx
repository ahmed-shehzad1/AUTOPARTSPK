import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Products from '../pages/Products/Products'
import Wholesale from '../pages/Wholesale/Wholesale'
import Contact from '../pages/Contact/Contact'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/wholesale" element={<Wholesale />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default AppRoutes