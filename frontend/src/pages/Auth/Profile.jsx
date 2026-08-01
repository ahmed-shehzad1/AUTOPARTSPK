import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { FaCamera, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out.')
    navigate('/')
  }

  return (
    <div className="bg-steel min-h-[calc(100vh-176px)] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-paper border border-ink/10 rounded-xl p-8 mb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="h-20 w-20 rounded-full bg-steel border border-ink/10 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <FaCamera className="text-slate/40" />
              )}
            </div>
            <div>
              <h1 className="font-display font-semibold text-xl text-ink">{user.name}</h1>
              <p className="font-mono text-xs text-slate/60">{user.email}</p>
              <span className="inline-block mt-1 font-mono text-[10px] uppercase text-blueprint bg-blueprint/10 px-2 py-0.5 rounded">
                {user.accountType === 'business' ? user.businessName || 'Business Account' : 'Individual Account'}
              </span>
            </div>
          </div>

          {!user.profileComplete && (
            <div className="bg-gold/10 border border-gold/30 rounded-md px-4 py-3 mb-6">
              <p className="font-body text-sm text-ink">
                Your profile isn't complete yet.{' '}
                <button onClick={() => navigate('/profile/setup')} className="text-blueprint hover:underline font-medium">
                  Finish it now
                </button>
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm font-body">
            <div>
              <span className="font-mono text-[10px] text-slate/50 uppercase block mb-1">Phone</span>
              <span className="text-ink">{user.phone || '—'}</span>
            </div>
            <div>
              <span className="font-mono text-[10px] text-slate/50 uppercase block mb-1">Address</span>
              <span className="text-ink">{user.address || '—'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 font-mono text-xs uppercase text-slate hover:text-ignition transition-colors"
        >
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  )
}

export default Profile