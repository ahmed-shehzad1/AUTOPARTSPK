import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { FaCamera } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

function ProfileSetup() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null)
const [address, setAddress] = useState(user?.address || '')
const [bio, setBio] = useState(user?.bio || '')

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Stored as base64 in localStorage for now — real file storage needs a backend.
    const reader = new FileReader()
    reader.onload = () => setAvatarPreview(reader.result)
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    updateProfile({ avatar: avatarPreview, address, bio, profileComplete: true })
    toast.success('Profile completed!')
    navigate('/profile')
  }

  const handleSkip = () => {
    navigate('/profile')
  }

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
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
              ) : (
                <FaCamera className="text-slate/40 text-xl" />
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </label>
        </div>

        <div className="space-y-4 mb-8">
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