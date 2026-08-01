import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'
import CategoryBar from './components/layout/CategoryBar'
import ScrollToTop from './components/common/ScrollToTop'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

function App() {
  return (
        <CartProvider>
          <AuthProvider>
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <CategoryBar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
     </AuthProvider>
    </CartProvider>

    
  )
    return GOOGLE_CLIENT_ID
    ? <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{content}</GoogleOAuthProvider>
    : content
}

export default App