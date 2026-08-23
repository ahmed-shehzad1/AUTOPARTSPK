import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'
import CategoryBar from './components/layout/CategoryBar'
import ScrollToTop from './components/common/ScrollToTop'
import { CartProvider } from './context/CartContext'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ErrorBoundary from './components/common/ErrorBoundary'

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

function App() {
  const content = (
    <CartProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Toaster position="top-center" richColors />
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

  return (
    <ErrorBoundary>
      {GOOGLE_CLIENT_ID
        ? <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>{content}</GoogleOAuthProvider>
        : content}
    </ErrorBoundary>
  )
}

export default App