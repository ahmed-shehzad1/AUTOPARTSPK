import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'
import CategoryBar from './components/layout/CategoryBar'
import ScrollToTop from './components/common/ScrollToTop'
import { CartProvider } from './context/CartContext'

function App() {
  return (
        <CartProvider>
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <CategoryBar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
    </CartProvider>
  )
}

export default App