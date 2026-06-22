import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ onOpenRegister }) {
  const { isAuthenticated, subscriber, logout, language, setLanguage, t } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: t('nav_funds'), to: '/funds' },
    { label: t('nav_amc'), to: '/amc' },
    { label: t('nav_eti'), to: '/eti' },
    { label: t('nav_vc'), to: '/vc' },
  ]

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-navy/80 backdrop-blur-sm'
      } border-b border-navy-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex flex-col leading-none">
            <span className="text-gold font-bold text-lg tracking-widest">FRAMONT</span>
            <span className="text-text-muted text-xs tracking-[0.2em] uppercase">Access</span>
          </div>
        </Link>

        {/* Desktop nav */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-text-muted hover:text-gold text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-navy-card border border-navy-border rounded-full px-1 py-1">
            {['en', 'it'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase transition-all duration-200 ${
                  language === lang ? 'bg-gold text-navy font-bold' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-text-muted text-sm">
                {subscriber?.firstName} {subscriber?.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-text-muted hover:text-gold text-sm transition-colors"
              >
                <LogOut size={14} />
                {t('nav_logout')}
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenRegister}
              className="bg-gold hover:bg-gold-light text-navy font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
            >
              {t('nav_login')}
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-muted hover:text-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-navy/98 z-40 flex flex-col p-8 gap-6 animate-fadeIn">
          {isAuthenticated && navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-text-primary text-xl font-medium hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            {['en', 'it'].map((lang) => (
              <button
                key={lang}
                onClick={() => { setLanguage(lang); setMenuOpen(false) }}
                className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase border transition-all ${
                  language === lang ? 'bg-gold border-gold text-navy' : 'border-navy-border text-text-muted'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false) }}
              className="flex items-center gap-2 text-text-muted text-base mt-2"
            >
              <LogOut size={16} /> {t('nav_logout')}
            </button>
          ) : (
            <button
              onClick={() => { onOpenRegister(); setMenuOpen(false) }}
              className="bg-gold text-navy font-bold py-3 rounded-full text-base mt-2"
            >
              {t('nav_login')}
            </button>
          )}
        </div>
      )}
    </header>
  )
}
