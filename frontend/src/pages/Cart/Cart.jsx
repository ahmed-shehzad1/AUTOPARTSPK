import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaTag, FaArrowRight } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'

function Cart() {
  const { items, updateQty, removeFromCart, subtotal } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="bg-steel min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-xl text-ink mb-3">Your cart is empty</p>
          <Link to="/products" className="font-mono text-sm text-blueprint hover:underline">
            ← Browse Catalog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-steel min-h-screen">
      <section className="bg-paper border-b border-ink/10 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Your Order</span>
          <h1 className="font-display font-semibold text-3xl text-ink mt-2">Cart</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => {
            const isWholesale = item.qty >= item.wholesaleMinQty
            const unitPrice = isWholesale ? item.wholesalePrice : item.price
            return (
              <div key={item.id} className="bg-paper border border-ink/10 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-grow">
                  <Link to={`/products/${item.id}`} className="font-display font-semibold text-ink hover:text-blueprint transition-colors">
                    {item.name}
                  </Link>
                  <p className="font-mono text-xs text-slate/60 mt-1">Part No. {item.partNo}</p>
                  <p className="font-mono text-[10px] text-slate/50 uppercase mt-1">Min. {item.moq} {item.unit}</p>
                  {isWholesale && (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-ignition uppercase mt-2">
                      <FaTag size={9} /> Wholesale rate applied
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="h-9 w-9 rounded-md border border-ink/10 bg-steel text-ink hover:border-blueprint transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.qty}
                    min={item.moq}
                    onChange={(e) => updateQty(item.id, Number(e.target.value) || item.moq)}
                    className="w-16 text-center bg-steel border border-ink/10 rounded-md py-1.5 font-body text-ink focus:outline-none focus:border-blueprint"
                  />
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="h-9 w-9 rounded-md border border-ink/10 bg-steel text-ink hover:border-blueprint transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right sm:w-32">
                  <p className="font-display font-semibold text-ink">PKR {(unitPrice * item.qty).toLocaleString()}</p>
                  <p className="font-mono text-[10px] text-slate/50">@ {unitPrice.toLocaleString()}/{item.unit}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate/40 hover:text-ignition transition-colors self-start sm:self-center"
                  aria-label="Remove item"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="bg-paper border border-ink/10 rounded-lg p-6 h-fit sticky top-24">
          <h2 className="font-display font-semibold text-lg text-ink mb-5">Order Summary</h2>
          <div className="flex items-baseline justify-between pb-5 border-b border-ink/10 mb-5">
            <span className="font-mono text-xs text-slate/60 uppercase">Subtotal</span>
            <span className="font-display font-semibold text-xl text-ink">PKR {subtotal.toLocaleString()}</span>
          </div>
          <p className="font-mono text-[10px] text-slate/50 uppercase mb-5">
            Delivery charges calculated at checkout
          </p>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors flex items-center justify-center gap-2"
          >
            Proceed to Checkout <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart