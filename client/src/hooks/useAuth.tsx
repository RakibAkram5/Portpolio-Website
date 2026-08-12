import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { request } from '@/services/api'

const TOKEN_KEY = 'portfolio_admin_token'

interface AuthContextValue {
  token: string | null
  isAuthenticated: boolean
  isChecking: boolean
  login: (password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!token) {
      setIsChecking(false)
      return
    }

    request('/auth/me', { headers: { Authorization: `Bearer ${token}` } }).then((res) => {
      if (!res.success) {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
      }
      setIsChecking(false)
    })
  }, [token])

  async function login(password: string) {
    const res = await request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })

    if (res.success && res.data) {
      localStorage.setItem(TOKEN_KEY, res.data.token)
      setToken(res.data.token)
      return { success: true }
    }

    return { success: false, message: res.message ?? 'Login failed.' }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, isChecking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
