import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'sem_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem('sem_token') || null)

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  useEffect(() => {
    if (token) localStorage.setItem('sem_token', token)
    else localStorage.removeItem('sem_token')
  }, [token])

  const signIn = (userData, authToken) => {
    setUser(userData)
    setToken(authToken)
    if (userData) localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    else localStorage.removeItem(STORAGE_KEY)
    if (authToken) localStorage.setItem('sem_token', authToken)
    else localStorage.removeItem('sem_token')
  }

  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('sem_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}