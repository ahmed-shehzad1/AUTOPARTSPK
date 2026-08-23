import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaMoneyBillWave, FaUniversity, FaMobileAlt } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: FaMoneyBillWave, desc: 'Pay when your order arrives' },
  { id: 'bank', label: 'Bank Transfer', icon: FaUniversity, desc: 'Transfer to our account, we confirm and dispatch' },
  { id: 'wallet', label: 'JazzCash / EasyPaisa', icon: FaMobileAlt, desc: 'Pay via mobile wallet' },
]

function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login', { state: { redirectTo: '/checkout' } })
    }
  }, [authLoading, user, navigate])
  const [payment, setPayment] = useState('cod')
 const [form, setForm] = useState({
  name: user?.name || '',
  phone: user?.phone || '',
  address: user?.address || '',
  city: '',
})
  const [error, setError] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(null)

    if (authLoading || !user) {
    return (
      <div className="bg-steel min-h-screen flex items-center justify-center">
        <p className="font-body text-slate">Checking your account…</p>
      </div>
    )
  }

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart')
    return null
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.address || !form.city) {
      setError('All fields are required.')
      return
    }
    setError('')

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          paymentMethod: payment,
          subtotal,
          items: items.map((i) => ({
            productId: i.id,
            name: i.name,
            partNo: i.partNo,
            qty: i.qty,
            unitPrice: i.qty >= i.wholesaleMinQty ? i.wholesalePrice : i.price,
          })),
        }),
      })

      if (!res.ok) throw new Error('Order failed')
      const order = await res.json()

      setOrderPlaced({ orderId: order.orderNumber, name: form.name })
      clearCart()
    } catch (err) {
      setError('Could not place your order — please check your connection and try again.')
    }
  }

  if (orderPlaced) {
    return (
      <div className="bg-steel min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <FaCheckCircle className="text-blueprint text-4xl mx-auto mb-5" />
          <h1 className="font-display font-semibold text-2xl text-ink mb-3">Order Placed</h1>
          <p className="font-body text-slate mb-2">
            Thanks, {orderPlaced.name.split(' ')[0]} — your order has been received.
          </p>
          <p className="font-mono text-sm text-blueprint mb-8">Order ID: {orderPlaced.orderId}</p>
          <Link to="/products" className="inline-block bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-blueprint transition-colors">
            Continue Browsing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-steel min-h-screen">
      <section className="bg-paper border-b border-ink/10 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Final Step</span>
          <h1 className="font-display font-semibold text-3xl text-ink mt-2">Checkout</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8">
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          {/* Delivery info */}
          <div className="bg-paper border border-ink/10 rounded-lg p-6">
            <h2 className="font-display font-semibold text-ink mb-5">Delivery Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+92 3XX XXXXXXX"
                  className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Address *</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">City *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-paper border border-ink/10 rounded-lg p-6">
            <h2 className="font-display font-semibold text-ink mb-5">Payment Method</h2>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-4 border rounded-md p-4 cursor-pointer transition-colors ${
                    payment === m.id ? 'border-blueprint bg-steel' : 'border-ink/10 hover:border-ink/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === m.id}
                    onChange={() => setPayment(m.id)}
                    className="accent-blueprint"
                  />
                  <m.icon className="text-blueprint text-lg" />
                  <div>
                    <p className="font-body font-medium text-ink text-sm">{m.label}</p>
                    <p className="font-body text-xs text-slate">{m.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="font-mono text-xs text-ignition">{error}</p>}

          <button type="submit" className="w-full bg-ink text-paper font-medium py-3.5 rounded-md hover:bg-blueprint transition-colors">
  Place Order
</button>
<p className="font-mono text-[10px] text-slate/50 uppercase text-center">
  By placing this order, you agree to our{' '}
  <Link to="/terms-of-service" className="text-blueprint hover:underline">Terms</Link> and{' '}
  <Link to="/return-policy" className="text-blueprint hover:underline">Return Policy</Link>
</p>
        </form>

        {/* Summary */}
        <div className="bg-paper border border-ink/10 rounded-lg p-6 h-fit sticky top-24">
          <h2 className="font-display font-semibold text-lg text-ink mb-5">Order Summary</h2>
          <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
            {items.map((item) => {
              const isWholesale = item.qty >= item.wholesaleMinQty
              const unitPrice = isWholesale ? item.wholesalePrice : item.price
              return (
                <div key={item.id} className="flex justify-between text-sm font-body">
                  <span className="text-slate">{item.name} × {item.qty}</span>
                  <span className="text-ink">PKR {(unitPrice * item.qty).toLocaleString()}</span>
                </div>
              )
            })}
          </div>
          <div className="flex items-baseline justify-between pt-5 border-t border-ink/10">
            <span className="font-mono text-xs text-slate/60 uppercase">Total</span>
            <span className="font-display font-semibold text-xl text-ink">PKR {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout