import { createContext, useContext, useEffect, useState } from 'react'

// PLACEHOLDER AUTH — no backend exists yet.
// Users are stored in localStorage in plain text, purely so the UI/UX can be
// built and tested now. This is NOT secure and must be replaced with real
// backend authentication (hashed passwords, sessions/JWT, verified tokens)
// before launch.
const USERS_KEY = 'autopartspk_users_demo'
const SESSION_KEY = 'autopartspk_session_demo'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || []
    } catch {
      return []
    }
  }
  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users))

  const register = ({ name, email, phone, password, accountType, businessName }) => {
    const users = getUsers()
    if (users.some((u) => u.email === email)) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      phone,
      password,
      accountType, // 'individual' | 'business'
      businessName: businessName || null,
      avatar: null,
      address: '',
      bio: '',
      profileComplete: false,
      authProvider: 'password',
    }
    saveUsers([...users, newUser])
    const { password: _pw, ...safeUser } = newUser
    setUser(safeUser)
    return { success: true }
  }

  const registerWithGoogle = ({ name, email, avatar }) => {
    const users = getUsers()
    let existing = users.find((u) => u.email === email)
    if (!existing) {
      existing = {
        id: `u${Date.now()}`,
        name,
        email,
        phone: '',
        password: null,
        accountType: 'individual',
        businessName: null,
        avatar: avatar || null,
        address: '',
        bio: '',
        profileComplete: false,
        authProvider: 'google',
      }
      saveUsers([...users, existing])
    }
    const { password: _pw, ...safeUser } = existing
    setUser(safeUser)
    return { success: true }
  }

  const login = ({ email, password }) => {
    const users = getUsers()
    const match = users.find((u) => u.email === email && u.password === password)
    if (!match) {
      return { success: false, error: 'Incorrect email or password.' }
    }
    const { password: _pw, ...safeUser } = match
    setUser(safeUser)
    return { success: true }
  }

  const logout = () => setUser(null)

  const updateProfile = (updates) => {
    const users = getUsers()
    const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, ...updates } : u))
    saveUsers(updatedUsers)
    setUser((prev) => ({ ...prev, ...updates }))
  }

  return (
    <AuthContext.Provider value={{ user, register, registerWithGoogle, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}