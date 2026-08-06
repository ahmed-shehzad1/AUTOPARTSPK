import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '../../api/client'

function Settings() {
  const [company, setCompany] = useState(null)
  const [stats, setStats] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/settings/company').then((res) => setCompany(res.data))
    api.get('/settings/stats').then((res) => setStats(res.data))
  }, [])

  const updateCompanyField = (field, value) => setCompany((c) => ({ ...c, [field]: value }))

  const handleSaveCompany = async () => {
    setSaving(true)
    try {
      await api.put('/settings/company', company)
      toast.success('Company info updated.')
    } catch {
      toast.error('Failed to save.')
    } finally {
      setSaving(false)
    }
  }

  const updateStatField = (id, field, value) => {
    setStats((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleSaveStat = async (stat) => {
    try {
      await api.put(`/settings/stats/${stat.id}`, { label: stat.label, value: stat.value })
      toast.success(`"${stat.label}" saved.`)
    } catch {
      toast.error('Failed to save stat.')
    }
  }

  if (!company) return <div className="p-8 font-body text-slate">Loading…</div>

  const inputClass = 'w-full bg-steel border border-ink/10 rounded-md px-3 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors'

  return (
    <div className="p-8 max-w-3xl space-y-10">
      <div>
        <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Site Settings</span>
        <h1 className="font-display font-semibold text-2xl text-ink mt-1">Company Info</h1>
      </div>

      <div className="bg-paper border border-ink/10 rounded-lg p-7 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Company Name">
            <input value={company.name} onChange={(e) => updateCompanyField('name', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Tagline">
            <input value={company.tagline} onChange={(e) => updateCompanyField('tagline', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Phone 1 Label">
            <input value={company.phone1Label} onChange={(e) => updateCompanyField('phone1Label', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Phone 1 Number">
            <input value={company.phone1Number} onChange={(e) => updateCompanyField('phone1Number', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Phone 2 Label">
            <input value={company.phone2Label} onChange={(e) => updateCompanyField('phone2Label', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Phone 2 Number">
            <input value={company.phone2Number} onChange={(e) => updateCompanyField('phone2Number', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <Field label="Address">
          <input
            value={company.address || ''}
            onChange={(e) => updateCompanyField('address', e.target.value)}
            placeholder="Leave blank to show 'Address coming soon' on the site"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Wholesale Region">
            <input value={company.regionWholesale} onChange={(e) => updateCompanyField('regionWholesale', e.target.value)} className={inputClass} />
          </Field>
          <Field label="Retail Region">
            <input value={company.regionRetail} onChange={(e) => updateCompanyField('regionRetail', e.target.value)} className={inputClass} />
          </Field>
        </div>

        <Field label="Delivery Note">
          <textarea rows={2} value={company.deliveryNote} onChange={(e) => updateCompanyField('deliveryNote', e.target.value)} className={`${inputClass} resize-none`} />
        </Field>

        <button
          onClick={handleSaveCompany}
          disabled={saving}
          className="bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-blueprint transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Company Info'}
        </button>
      </div>

      <div>
        <h2 className="font-display font-semibold text-xl text-ink mb-4">Homepage Stats</h2>
        <div className="space-y-3">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-paper border border-ink/10 rounded-lg p-5 flex items-center gap-4">
              <input
                value={stat.label}
                onChange={(e) => updateStatField(stat.id, 'label', e.target.value)}
                className={`${inputClass} flex-grow`}
                placeholder="Label"
              />
              <input
                value={stat.value}
                onChange={(e) => updateStatField(stat.id, 'value', e.target.value)}
                className={`${inputClass} w-32`}
                placeholder="Value"
              />
              <button
                onClick={() => handleSaveStat(stat)}
                className="font-mono text-xs uppercase text-blueprint hover:underline whitespace-nowrap"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">{label}</label>
      {children}
    </div>
  )
}

export default Settings