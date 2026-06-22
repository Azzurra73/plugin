import React, { createContext, useContext, useState, useEffect } from 'react'
import translations from '../i18n'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [subscriber, setSubscriber] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('framont_subscriber')) } catch { return null }
  })
  const [language, setLanguage] = useState(() => sessionStorage.getItem('framont_lang') || 'en')

  useEffect(() => {
    if (subscriber) sessionStorage.setItem('framont_subscriber', JSON.stringify(subscriber))
    else sessionStorage.removeItem('framont_subscriber')
  }, [subscriber])

  useEffect(() => { sessionStorage.setItem('framont_lang', language) }, [language])

  const login = (data) => setSubscriber(data)
  const logout = () => setSubscriber(null)
  const isAuthenticated = Boolean(subscriber)

  const t = (key) => {
    const dict = translations[language] || translations.en
    return dict[key] || translations.en[key] || key
  }

  return (
    <AuthContext.Provider value={{ subscriber, isAuthenticated, login, logout, language, setLanguage, t }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
