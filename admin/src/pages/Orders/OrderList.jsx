import { useEffect, useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import api from '../../api/client'

const STATUSES = ['pending', 'confirmed', 'dispatched', 'delivered', 'cancelled']

const STATUS_COLOR = {
  pending: 'bg-gold/10 text-gold',
  confirmed: 'bg-blueprint/10 text-blueprint',
  dispatched: 'bg-volt/10 text-volt',
  delivered: 'bg-slate/10 text-slate',
  cancelled: 'bg-ignition/10 text-ignition',
}

function OrderList() {
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await api.get('/orders', { params: { status: filter } })
      setOrders(res.data.items)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [filter])

  const handleStatusChange = async (id, status) => {
    await api.patch(`/orders/${id}`, { status })
    fetchOrders()
  }

  return (
    <div className="p-8">
      <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Fulfillment</span>
      <h1 className="font-display font-semibold text-2xl text-ink mt-1 mb-6">Orders</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`font-mono text-xs uppercase px-3 py-1.5 rounded-md border transition-colors capitalize ${
              filter === s ? 'bg-ink text-paper border-ink' : 'bg-paper text-slate border-ink/10 hover:border-ink/20'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="font-body text-slate text-sm">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="font-body text-slate text-sm">No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-paper border border-ink/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded((e) => (e === order.id ? null : order.id))}
                className="w-full flex items-center justify-between px-5 py-4"
              >
                <div className="flex items-center gap-4">
                  {expanded === order.id ? <FaChevronDown size={11} /> : <FaChevronRight size={11} />}
                  <div className="text-left">
                    <p className="font-mono text-sm text-ink">{order.orderNumber}</p>
                    <p className="font-body text-xs text-slate">{order.customerName} — {order.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body text-sm text-ink">PKR {order.subtotal.toLocaleString()}</span>
                  <span className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded ${STATUS_COLOR[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </button>

              {expanded === order.id && (
                <div className="border-t border-ink/5 px-5 py-4 bg-steel/30">
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs font-body">
                    <div><span className="text-slate/60 font-mono uppercase">Phone:</span> {order.phone}</div>
                    <div><span className="text-slate/60 font-mono uppercase">Payment:</span> {order.paymentMethod}</div>
                    <div className="col-span-2"><span className="text-slate/60 font-mono uppercase">Address:</span> {order.address}</div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs font-body">
                        <span className="text-ink">{item.name} ({item.partNo}) × {item.qty}</span>
                        <span className="text-slate">PKR {(item.unitPrice * item.qty).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(order.id, s)}
                        className={`font-mono text-[10px] uppercase px-3 py-1.5 rounded-md border capitalize transition-colors ${
                          order.status === s ? 'bg-ink text-paper border-ink' : 'bg-paper text-slate border-ink/10 hover:border-blueprint'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default OrderList