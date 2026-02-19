import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type User = {
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication — replace with real API call
    await new Promise((r) => setTimeout(r, 400))
    const u = { name: email.split('@')[0], email }
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthProvider
