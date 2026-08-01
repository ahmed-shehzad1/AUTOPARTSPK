import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { FaEye, FaEyeSlash, FaWarehouse, FaUser } from 'react-icons/fa'
import AuthModalLeftPanel from '../../components/auth/AuthModalLeftPanel'
import { useAuth } from '../../context/AuthContext'
import { getRecaptchaToken } from '../../utils/recaptcha'
import AuthModalLayout from '../../components/auth/AuthModalLayout'

const GOOGLE_CONFIGURED = !!import.meta.env.VITE_GOOGLE_CLIENT_ID

function Register() {
  const { register, registerWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState('individual')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', businessName: '',
  })

  const passwordStrength = form.password.length >= 10 ? 'Strong' : form.password.length >= 6 ? 'Medium' : 'Weak'
  const strengthColor = passwordStrength === 'Strong' ? 'text-blueprint' : passwordStrength === 'Medium' ? 'text-gold' : 'text-ignition'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.password) {
      toast.error('Please fill in all required fields.')
      return
    }
    if (accountType === 'business' && !form.businessName) {
      toast.error('Business name is required for a dealer account.')
      return
    }

    setSubmitting(true)
    await getRecaptchaToken('register') // token ready for backend verification once it exists
    const result = register({ ...form, accountType })
    setSubmitting(false)

    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success('Account created — let\'s finish your profile.')
    navigate('/profile/setup')
  }

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    registerWithGoogle({ name: decoded.name, email: decoded.email, avatar: decoded.picture })
    toast.success(`Welcome, ${decoded.given_name || decoded.name}`)
    navigate('/profile/setup')
  }

return (
<AuthModalLayout visual={<AuthModalLeftPanel />}>
    <div className="w-full max-w-md mx-auto">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Create Account</span>
          <h1 className="font-display font-semibold text-2xl text-ink mt-2 mb-8">Join AutoPartsPK</h1>

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
                  accountType === t.key ? 'border-blueprint bg-paper' : 'border-ink/10 bg-paper/50 hover:border-ink/20'
                }`}
              >
                <t.icon className={accountType === t.key ? 'text-blueprint' : 'text-slate/50'} />
                <span className="font-mono text-xs uppercase text-ink">{t.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text" placeholder="Full Name" value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full bg-paper border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
            />
            {accountType === 'business' && (
              <input
                type="text" placeholder="Business Name" value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
                className="w-full bg-paper border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
              />
            )}
            <input
              type="email" placeholder="Email" value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full bg-paper border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
            />
            <input
              type="tel" placeholder="+92 3XX XXXXXXX" value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full bg-paper border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
            />
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'} placeholder="Password" value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-paper border border-ink/10 rounded-md px-4 py-3 pr-11 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate/50">
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              {form.password && (
                <p className={`font-mono text-[10px] uppercase mt-1.5 ${strengthColor}`}>
                  {passwordStrength} password
                </p>
              )}
            </div>

            <button
              type="submit" disabled={submitting}
              className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors disabled:opacity-50"
            >
              {submitting ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-grow bg-ink/10" />
            <span className="font-mono text-[10px] text-slate/40 uppercase">or</span>
            <div className="h-px flex-grow bg-ink/10" />
          </div>

          {GOOGLE_CONFIGURED ? (
            <div className="flex justify-center">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google sign-in failed.')} />
            </div>
          ) : (
            <button
              disabled
              title="Google Sign-In not configured yet — add VITE_GOOGLE_CLIENT_ID to .env"
              className="w-full border border-ink/10 text-slate/40 font-medium py-3 rounded-md cursor-not-allowed"
            >
              Sign in with Google (not configured)
            </button>
          )}

          <p className="font-body text-sm text-slate text-center mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-blueprint hover:underline">Log in</Link>
          </p>
</div>
  </AuthModalLayout>
)
}

export default Register