import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

// Fixed-size glass overlay so Login/Register always render at the same
// dimensions regardless of how much content each form has — fixes the
// inconsistent-height scrolling issue from the full-page version.
function AuthModalLayout({ visual, children }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-md" />

      <Link
        to="/"
        className="absolute top-6 right-6 z-10 h-10 w-10 rounded-full bg-paper/10 hover:bg-paper/20 flex items-center justify-center text-paper transition-colors"
        aria-label="Close"
      >
        <FaTimes />
      </Link>

      <div className="relative w-full max-w-4xl h-[640px] max-h-[90vh] bg-paper/90 backdrop-blur-2xl border border-paper/20 shadow-2xl rounded-2xl overflow-hidden grid lg:grid-cols-2">
        <div className="hidden lg:block h-full">{visual}</div>
        <div className="h-full overflow-y-auto px-8 py-10 md:px-12">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthModalLayout