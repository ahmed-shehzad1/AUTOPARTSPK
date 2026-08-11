import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import BulkAddProducts from './pages/Products/BulkAddProducts'
import CategoryList from './pages/Categories/CategoryList'
import VehicleList from './pages/Vehicles/VehicleList'
import OrderList from './pages/Orders/OrderList'
import InquiryList from './pages/Inquiries/InquiryList'
import Settings from './pages/Settings/Settings'
import Dashboard from './pages/Dashboard'
import BlogList from './pages/Blog/BlogList'
import BlogForm from './pages/Blog/BlogForm'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/new" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<ProductForm />} />
              <Route path="/products/bulk-add" element={<BulkAddProducts />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/vehicles" element={<VehicleList />} />
              <Route path="/orders" element={<OrderList />} />
              <Route path="/inquiries" element={<InquiryList />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/blog" element={<BlogList />} />
<Route path="/blog/new" element={<BlogForm />} />
<Route path="/blog/:id/edit" element={<BlogForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App