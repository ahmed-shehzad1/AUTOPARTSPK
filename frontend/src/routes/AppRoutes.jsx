import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Products from '../pages/Products/Products'
import Wholesale from '../pages/Wholesale/Wholesale'
import Contact from '../pages/Contact/Contact'
import ProductDetail from '../pages/ProductDetail/ProductDetail'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ProfileSetup from '../pages/Auth/ProfileSetup'
import Profile from '../pages/Auth/Profile'
import Blog from '../pages/Blog/Blog'
import BlogDetail from '../pages/BlogDetail/BlogDetail'
import PrivacyPolicy from '../pages/Legal/PrivacyPolicy'
import TermsOfService from '../pages/Legal/TermsOfService'
import ReturnPolicy from '../pages/Legal/ReturnPolicy'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/wholesale" element={<Wholesale />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/setup" element={<ProfileSetup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-of-service" element={<TermsOfService />} />
<Route path="/return-policy" element={<ReturnPolicy />} />
    </Routes>
  )
}

export default AppRoutes