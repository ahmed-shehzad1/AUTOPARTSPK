import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'
import CategoryBar from './components/layout/CategoryBar'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryBar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App