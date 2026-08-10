import { createContext, useContext, useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const TOKEN_KEY = 'autopartspk_customer_token'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) {
      setLoading(false)
      return
    }
    fetch(`${API_BASE}/customer-auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false))
  }, [])

  const register = async ({ name, email, phone, password, accountType, businessName }) => {
    const res = await fetch(`${API_BASE}/customer-auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password, accountType, businessName }),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, error: data.error }
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.customer)
    return { success: true }
  }

  const login = async ({ email, password }) => {
    const res = await fetch(`${API_BASE}/customer-auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, error: data.error }
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.customer)
    return { success: true }
  }

  const loginWithGoogle = async (credential) => {
    const res = await fetch(`${API_BASE}/customer-auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential }),
    })
    const data = await res.json()
    if (!res.ok) return { success: false, error: data.error }
    localStorage.setItem(TOKEN_KEY, data.token)
    setUser(data.customer)
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const updateProfile = async (updates) => {
    const token = localStorage.getItem(TOKEN_KEY)
    const res = await fetch(`${API_BASE}/customer-auth/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    })
    const data = await res.json()
    if (res.ok) setUser(data)
    return res.ok
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}