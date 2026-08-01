import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { FaCamera, FaSignOutAlt, FaEdit, FaShoppingBag, FaMapMarkerAlt, FaWarehouse, FaHistory } from 'react-icons/fa'
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

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
    : '—'

  return (
    <div className="bg-steel min-h-[calc(100vh-176px)] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header card */}
        <div className="bg-paper border border-ink/10 rounded-xl p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-full bg-steel border border-ink/10 flex items-center justify-center overflow-hidden shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <FaCamera className="text-slate/40" />
                )}
              </div>
              <div>
                <h1 className="font-display font-semibold text-xl text-ink">{user.name}</h1>
                <p className="font-mono text-xs text-slate/60 mt-0.5">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-blueprint bg-blueprint/10 px-2 py-0.5 rounded">
                    {user.accountType === 'business' ? <FaWarehouse size={9} /> : null}
                    {user.accountType === 'business' ? user.businessName || 'Business Account' : 'Individual Account'}
                  </span>
                  <span className="font-mono text-[10px] text-slate/40 uppercase">
                    Member since {memberSince}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/profile/setup"
              className="flex items-center gap-2 font-mono text-xs uppercase text-ink border border-ink/10 hover:border-blueprint hover:text-blueprint px-4 py-2.5 rounded-md transition-colors self-start sm:self-center"
            >
              <FaEdit size={12} /> Edit Profile
            </Link>
          </div>

          {!user.profileComplete && (
            <div className="bg-gold/10 border border-gold/30 rounded-md px-4 py-3 mt-6">
              <p className="font-body text-sm text-ink">
                Your profile isn't complete yet.{' '}
                <Link to="/profile/setup" className="text-blueprint hover:underline font-medium">
                  Finish it now
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <span className="font-mono text-[10px] tracking-widest text-slate/50 uppercase block mb-2">Phone</span>
            <p className="font-body text-sm text-ink">{user.phone || 'Not provided'}</p>
          </div>
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <span className="font-mono text-[10px] tracking-widest text-slate/50 uppercase flex items-center gap-1.5 mb-2">
              <FaMapMarkerAlt size={9} /> Delivery Address
            </span>
            <p className="font-body text-sm text-ink">{user.address || 'Not provided'}</p>
          </div>
          <div className="bg-paper border border-ink/10 rounded-lg p-5">
            <span className="font-mono text-[10px] tracking-widest text-slate/50 uppercase block mb-2">Sign-in Method</span>
            <p className="font-body text-sm text-ink capitalize">{user.authProvider === 'google' ? 'Google Account' : 'Email & Password'}</p>
          </div>
        </div>

        {user.bio && (
          <div className="bg-paper border border-ink/10 rounded-lg p-5 mb-6">
            <span className="font-mono text-[10px] tracking-widest text-slate/50 uppercase block mb-2">Bio</span>
            <p className="font-body text-sm text-slate">{user.bio}</p>
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <Link
            to="/cart"
            className="flex items-center gap-4 bg-paper border border-ink/10 hover:border-blueprint rounded-lg p-5 transition-colors group"
          >
            <div className="h-11 w-11 rounded-full bg-blueprint/10 flex items-center justify-center text-blueprint group-hover:bg-blueprint group-hover:text-paper transition-colors">
              <FaShoppingBag />
            </div>
            <div>
              <p className="font-display font-semibold text-ink text-sm">View Cart</p>
              <p className="font-body text-xs text-slate">Check your current order</p>
            </div>
          </Link>

          <div className="flex items-center gap-4 bg-paper border border-ink/10 rounded-lg p-5 opacity-60">
            <div className="h-11 w-11 rounded-full bg-slate/10 flex items-center justify-center text-slate">
              <FaHistory />
            </div>
            <div>
              <p className="font-display font-semibold text-ink text-sm">Order History</p>
              <p className="font-body text-xs text-slate">No past orders yet</p>
            </div>
          </div>
        </div>

        {user.accountType === 'individual' && (
          <div className="bg-ink rounded-lg p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display font-semibold text-paper mb-1">Own a workshop or shop?</p>
              <p className="font-body text-sm text-steel/60">Switch to a business account for wholesale pricing and bulk tools.</p>
            </div>
            <Link
              to="/wholesale"
              className="bg-ignition text-paper font-medium text-sm px-5 py-2.5 rounded-md hover:brightness-95 transition whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        )}

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