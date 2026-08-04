import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import CategoryList from './pages/Categories/CategoryList'
import VehicleList from './pages/Vehicles/VehicleList'
import BulkAddProducts from './pages/Products/BulkAddProducts'
import OrderList from './pages/Orders/OrderList'
import InquiryList from './pages/Inquiries/InquiryList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<div className="p-8 font-body text-slate">Dashboard — coming soon</div>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/vehicles" element={<VehicleList />} />
          <Route path="/products/bulk-add" element={<BulkAddProducts />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/inquiries" element={<InquiryList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App