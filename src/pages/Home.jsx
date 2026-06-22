import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, ShieldCheck, Award, Zap, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { categoryMeta } from '../data/products'

const CATEGORIES = [
  { key: 'fund', icon: '📊' },
  { key: 'amc', icon: '⚡' },
  { key: 'eti', icon: '📈' },
  { key: 'vc', icon: '🚀' },
]

export default function Home({ onOpenRegister }) {
  const { isAuthenticated, t } = useAuth()
  const navigate = useNavigate()

  const handleCategoryClick = (slug) => {
    if (isAuthenticated) navigate(`/${slug}`)
    else onOpenRegister()
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 40%)',
        }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-gold text-xs font-semibold uppercase tracking-wider">{t('hero_badge')}</span>
            </div>

            <h1 className="text-text-primary text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
              {t('hero_title').split('Framont').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-gold">Framont</span>}
                </React.Fragment>
              ))}
            </h1>

            <p className="text-text-muted text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-gold/25 hover:-translate-y-0.5"
              >
                {t('hero_cta')}
                <ArrowRight size={18} />
              </button>
              {!isAuthenticated && (
                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center justify-center text-text-muted hover:text-gold text-sm transition-colors"
                >
                  {t('hero_signin')}
                </button>
              )}
            </div>
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20">
            {[
              { num: '4', label: 'Asset Classes' },
              { num: '10+', label: 'Active Products' },
              { num: '100%', label: 'Digital Process' },
              { num: '1 day', label: 'Onboarding Time' },
            ].map((s) => (
              <div key={s.label} className="bg-navy-card/60 backdrop-blur-sm border border-navy-border rounded-2xl p-5 text-center">
                <p className="text-gold text-3xl font-extrabold mb-1">{s.num}</p>
                <p className="text-text-muted text-xs uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-24 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Product Universe</p>
            <h2 className="text-text-primary text-4xl font-extrabold mb-4">Four Asset Classes. One Platform.</h2>
            <p className="text-text-muted text-base max-w-xl mx-auto">
              Each category is supported by curated product selection, educational content, and a direct subscription path.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORIES.map(({ key, icon }) => {
              const meta = categoryMeta[key]
              return (
                <button
                  key={key}
                  onClick={() => handleCategoryClick(meta.slug)}
                  className="group relative bg-navy-card border border-navy-border rounded-2xl p-7 text-left card-hover flex flex-col gap-4"
                >
                  {!isAuthenticated && (
                    <Lock className="absolute top-5 right-5 text-text-faint group-hover:text-gold transition-colors" size={16} />
                  )}
                  <div className="text-4xl">{icon}</div>
                  <div>
                    <h3 className="text-text-primary font-bold text-lg mb-1">{t(`cat_${key}`)}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{t(`cat_${key}_desc`)}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-gold text-xs font-semibold mt-auto">
                    {isAuthenticated ? 'Explore' : 'Subscribe to access'}
                    <ArrowRight size={13} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Framont */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Why Framont</p>
            <h2 className="text-text-primary text-4xl font-extrabold">{t('why_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, key: 'why_1' },
              { icon: ShieldCheck, key: 'why_2' },
              { icon: Zap, key: 'why_3' },
            ].map(({ icon: Icon, key }) => (
              <div key={key} className="bg-navy-card border border-navy-border rounded-2xl p-8 card-hover">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5">
                  <Icon className="text-gold" size={22} />
                </div>
                <h3 className="text-text-primary font-bold text-lg mb-3">{t(`${key}_title`)}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{t(`${key}_desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-gradient-to-r from-gold-dark via-gold to-gold-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-navy text-4xl font-extrabold mb-3">{t('cta_banner_title')}</h2>
          <p className="text-navy/70 text-lg mb-8">{t('cta_banner_sub')}</p>
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-gold font-bold text-base px-10 py-4 rounded-full transition-all duration-200 hover:shadow-2xl"
          >
            {t('cta_banner_btn')}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  )
}
