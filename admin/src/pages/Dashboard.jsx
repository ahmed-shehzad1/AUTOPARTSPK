import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaBoxOpen, FaShoppingCart, FaClock, FaTags,
  FaCarSide, FaEnvelope, FaArrowRight,
} from 'react-icons/fa'
import api from '../api/client'

const STATUS_COLOR = {
  pending: 'bg-gold/10 text-gold',
  confirmed: 'bg-blueprint/10 text-blueprint',
  dispatched: 'bg-volt/10 text-volt',
  delivered: 'bg-slate/10 text-slate',
  cancelled: 'bg-ignition/10 text-ignition',
}

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/dashboard/summary')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="p-8 font-body text-slate">Loading…</div>
  if (!data) return <div className="p-8 font-body text-slate">Failed to load dashboard.</div>

  const stats = [
    { label: 'Total Products', value: data.totalProducts, icon: FaBoxOpen, to: '/products', color: 'text-blueprint' },
    { label: 'Total Orders', value: data.totalOrders, icon: FaShoppingCart, to: '/orders', color: 'text-volt' },
    { label: 'Pending Orders', value: data.pendingOrders, icon: FaClock, to: '/orders', color: 'text-gold' },
    { label: 'New Inquiries', value: data.newInquiries, icon: FaEnvelope, to: '/inquiries', color: 'text-ignition' },
    { label: 'Categories', value: data.totalCategories, icon: FaTags, to: '/categories', color: 'text-blueprint' },
    { label: 'Vehicle Makes', value: data.totalMakes, icon: FaCarSide, to: '/vehicles', color: 'text-blueprint' },
  ]

  return (
    <div className="p-8">
      <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Overview</span>
      <h1 className="font-display font-semibold text-2xl text-ink mt-1 mb-8">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, to, color }) => (
          <Link
            key={label}
            to={to}
            className="bg-paper border border-ink/10 rounded-lg p-6 hover:border-blueprint transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <Icon className={`text-xl ${color}`} />
              <FaArrowRight size={11} className="text-slate/20 group-hover:text-blueprint group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="font-display font-semibold text-3xl text-ink mb-1">{value}</p>
            <p className="font-mono text-[10px] tracking-widest text-slate/60 uppercase">{label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-paper border border-ink/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-ink">Recent Orders</h2>
            <Link to="/orders" className="font-mono text-[10px] uppercase text-blueprint hover:underline">View all</Link>
          </div>
          {data.recentOrders.length === 0 ? (
            <p className="font-body text-sm text-slate">No orders yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs text-ink">{order.orderNumber}</p>
                    <p className="font-body text-xs text-slate">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm text-ink">PKR {order.subtotal.toLocaleString()}</p>
                    <span className={`font-mono text-[9px] uppercase px-2 py-0.5 rounded ${STATUS_COLOR[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-paper border border-ink/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-semibold text-ink">Recent Inquiries</h2>
            <Link to="/inquiries" className="font-mono text-[10px] uppercase text-blueprint hover:underline">View all</Link>
          </div>
          {data.recentInquiries.length === 0 ? (
            <p className="font-body text-sm text-slate">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {data.recentInquiries.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <p className="font-body text-sm text-ink">{item.name}</p>
                  <span className="font-mono text-[9px] uppercase text-slate/50 bg-steel px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard