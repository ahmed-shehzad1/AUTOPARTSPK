import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import AuthVisual from '../../components/auth/AuthVisual'
import { useAuth } from '../../context/AuthContext'
import AuthModalLayout from '../../components/auth/AuthModalLayout'

const GOOGLE_CONFIGURED = !!import.meta.env.VITE_GOOGLE_CLIENT_ID

function Login() {
  const { login, registerWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = login(form)
    if (!result.success) {
      toast.error(result.error)
      return
    }
    toast.success('Welcome back!')
    navigate('/profile')
  }

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential)
    registerWithGoogle({ name: decoded.name, email: decoded.email, avatar: decoded.picture })
    toast.success(`Welcome, ${decoded.given_name || decoded.name}`)
    navigate('/profile')
  }

 return (
  <AuthModalLayout visual={<AuthVisual />}>
    <div className="w-full max-w-md mx-auto">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Welcome Back</span>
          <h1 className="font-display font-semibold text-2xl text-ink mt-2 mb-8">Log In</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email" placeholder="Email" value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full bg-paper border border-ink/10 rounded-md px-4 py-3 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
            />
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

            <button type="submit" className="w-full bg-ink text-paper font-medium py-3 rounded-md hover:bg-blueprint transition-colors">
              Log In
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
            <button disabled className="w-full border border-ink/10 text-slate/40 font-medium py-3 rounded-md cursor-not-allowed">
              Sign in with Google (not configured)
            </button>
          )}

          <p className="font-body text-sm text-slate text-center mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-blueprint hover:underline">Create one</Link>
          </p>
</div>
  </AuthModalLayout>
)
}

export default Login