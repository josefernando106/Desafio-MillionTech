import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'

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
    // Simple fixed credential check (admin / admin)
    await new Promise((r) => setTimeout(r, 300))
    const ok = (email === 'admin' || email === 'admin@admin.com' || email === 'admin@admin') && password === 'admin'
    if (!ok) throw new Error('Credenciais inválidas')
    const u = { name: 'admin', email: 'admin' }
    setUser(u)
    // store user and a simple token in localStorage
    localStorage.setItem('user', JSON.stringify(u))
    localStorage.setItem('token', 'fake-jwt-token')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
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
