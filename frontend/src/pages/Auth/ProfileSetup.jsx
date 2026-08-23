import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { FaCamera, FaUser, FaWarehouse } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

function ProfileSetup() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
  const [uploading, setUploading] = useState(false)
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [accountType, setAccountType] = useState(user?.accountType || 'individual')
  const [businessName, setBusinessName] = useState(user?.businessName || '')
  const [error, setError] = useState('')

  const redirectTo = location.state?.redirectTo || '/profile'

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch(`${API_BASE}/upload/avatar`, { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAvatarPreview(data.url)
    } catch (err) {
      toast.error('Failed to upload avatar.')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setError('')
    if (accountType === 'business' && !businessName.trim()) {
      setError('Business name is required for a business account.')
      return
    }

    const success = await updateProfile({
      avatar: avatarPreview, address, bio, phone, accountType, businessName,
    })

    if (success) {
      toast.success('Profile completed!')
      navigate(redirectTo)
    } else {
      toast.error('Failed to save profile.')
    }
  }

  const handleSkip = () => navigate(redirectTo)

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="bg-steel min-h-[calc(100vh-176px)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-paper border border-ink/10 rounded-xl p-8">
        <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Almost Done</span>
        <h1 className="font-display font-semibold text-2xl text-ink mt-2 mb-8">Complete Your Profile</h1>

        <div className="flex justify-center mb-8">
          <label className="relative cursor-pointer">
            <div className="h-24 w-24 rounded-full bg-steel border-2 border-dashed border-ink/20 flex items-center justify-center overflow-hidden">
              {uploading ? (
                <span className="font-mono text-[10px] text-slate/50">Uploading…</span>
              ) : avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <FaCamera className="text-slate/40 text-xl" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" disabled={uploading} />
          </label>
        </div>

        {/* Account type */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { key: 'individual', label: 'Individual', icon: FaUser },
            { key: 'business', label: 'Business / Dealer', icon: FaWarehouse },
          ].map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setAccountType(t.key)}
              className={`flex flex-col items-center gap-2 py-4 rounded-md border transition-colors ${
                accountType === t.key ? 'border-blueprint bg-steel' : 'border-ink/10 bg-steel/50 hover:border-ink/20'
              }`}
            >
              <t.icon className={accountType === t.key ? 'text-blueprint' : 'text-slate/50'} />
              <span className="font-mono text-xs uppercase text-ink">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          {accountType === 'business' && (
            <div>
              <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Business Name</label>
              <input
                type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-steel border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
              />
            </div>
          )}
          <div>
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Phone Number</label>
            <input
              type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 3XX XXXXXXX"
              className="w-full bg-steel border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Delivery Address</label>
            <input
              type="text" value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-steel border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] tracking-widest text-slate/60 uppercase block mb-2">Bio (optional)</label>
            <textarea
              rows={3} value={bio} onChange={(e) => setBio(e.target.value)}
              className="w-full bg-steel border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors resize-none"
            />
          </div>
        </div>

        {error && <p className="font-mono text-xs text-ignition mb-4">{error}</p>}

        <button onClick={handleSave} className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors mb-3">
          Save & Continue
        </button>
        <button onClick={handleSkip} className="w-full font-mono text-xs text-slate hover:text-blueprint transition-colors uppercase">
          Skip for now
        </button>
      </div>
    </div>
  )
}

export default ProfileSetup