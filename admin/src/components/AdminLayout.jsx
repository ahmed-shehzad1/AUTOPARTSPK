import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  FaBoxOpen, FaTachometerAlt, FaTags, FaCarSide,
  FaShoppingCart, FaEnvelope, FaCog,
} from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: FaTachometerAlt, end: true },
  { to: '/products', label: 'Products', icon: FaBoxOpen },
  { to: '/categories', label: 'Categories', icon: FaTags },
  { to: '/vehicles', label: 'Vehicles', icon: FaCarSide },
  { to: '/orders', label: 'Orders', icon: FaShoppingCart },
  { to: '/inquiries', label: 'Inquiries', icon: FaEnvelope },
  { to: '/settings', label: 'Settings', icon: FaCog },
]

function AdminLayout() {
  const { user, logout } = useAuth()
const navigate = useNavigate()
  return (
    <div className="flex min-h-screen bg-steel">
      {/* Sidebar */}
      <aside className="w-60 bg-ink text-paper flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-paper/10">
          <span className="font-display font-semibold text-lg">
            AutoParts<span className="text-blueprint-light">PK</span>
          </span>
          <p className="font-mono text-[10px] text-steel/50 uppercase tracking-widest mt-1">
            Admin Panel
          </p>
        </div>

        <nav className="flex-grow py-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 font-body text-sm transition-colors ${
                  isActive ? 'bg-paper/10 text-paper border-r-2 border-blueprint-light' : 'text-steel/60 hover:text-paper hover:bg-paper/5'
                }`
              }
            >
              <Icon size={14} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-paper/10">
  <p className="font-body text-sm text-paper mb-1">{user?.name}</p>
  <p className="font-mono text-[10px] text-steel/40 uppercase mb-3">{user?.role}</p>
  <button
    onClick={() => { logout(); navigate('/login') }}
    className="flex items-center gap-2 font-mono text-[10px] uppercase text-steel/60 hover:text-ignition transition-colors"
  >
    <FaSignOutAlt size={11} /> Log Out
  </button>
</div>
      </aside>

      {/* Main content */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout