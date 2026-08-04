import { useEffect, useState } from 'react'
import api from '../../api/client'

const STATUSES = ['new', 'contacted', 'closed']
const STATUS_COLOR = {
  new: 'bg-gold/10 text-gold',
  contacted: 'bg-blueprint/10 text-blueprint',
  closed: 'bg-slate/10 text-slate',
}

function InquiryList() {
  const [tab, setTab] = useState('wholesale')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/inquiries/${tab}`)
      setItems(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [tab])

  const handleStatusChange = async (id, status) => {
    await api.patch(`/inquiries/${tab}/${id}`, { status })
    fetchItems()
  }

  return (
    <div className="p-8">
      <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Leads</span>
      <h1 className="font-display font-semibold text-2xl text-ink mt-1 mb-6">Inquiries</h1>

      <div className="flex gap-2 mb-6">
        {['wholesale', 'contact'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`font-mono text-xs uppercase px-4 py-2 rounded-md border capitalize transition-colors ${
              tab === t ? 'bg-ink text-paper border-ink' : 'bg-paper text-slate border-ink/10 hover:border-ink/20'
            }`}
          >
            {t} {t === 'wholesale' ? 'Inquiries' : 'Messages'}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {loading ? (
          <p className="font-body text-slate text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="font-body text-slate text-sm">None yet.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-paper border border-ink/10 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <p className="font-display font-semibold text-ink text-sm">
                    {tab === 'wholesale' ? item.businessName : item.name}
                  </p>
                  <p className="font-mono text-xs text-slate/60">
                    {tab === 'wholesale' ? item.contactName : item.subject || 'No subject'} · {item.phone}
                    {item.email ? ` · ${item.email}` : ''}
                  </p>
                </div>
                <span className={`font-mono text-[10px] uppercase px-2.5 py-1 rounded ${STATUS_COLOR[item.status]}`}>
                  {item.status}
                </span>
              </div>

              {tab === 'wholesale' && (
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs font-body text-slate">
                  {item.city && <span>City: {item.city}</span>}
                  {item.volume && <span>Volume: {item.volume}</span>}
                  {item.categories && <span className="col-span-2">Categories: {item.categories}</span>}
                </div>
              )}

              {item.message && (
                <p className="font-body text-sm text-ink bg-steel/40 rounded-md p-3 mb-3">{item.message}</p>
              )}

              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(item.id, s)}
                    className={`font-mono text-[10px] uppercase px-3 py-1.5 rounded-md border capitalize transition-colors ${
                      item.status === s ? 'bg-ink text-paper border-ink' : 'bg-paper text-slate border-ink/10 hover:border-blueprint'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default InquiryList