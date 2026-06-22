import React, { useState } from 'react'
import { X, FileText, Download, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { subscribe } from '../lib/api'
import { categoryMeta } from '../data/products'

export default function ProductDetailModal({ product, onClose, onSubscribed }) {
  const { t, subscriber } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const meta = categoryMeta[product.category]

  const formatTicket = (n) => {
    if (n >= 1000000) return `€${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `€${(n / 1000).toFixed(0)}k`
    return `€${n}`
  }

  const handleSubscribe = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await subscribe({
        email: subscriber.email,
        product: { id: product.id, name: product.name, category: product.category, isin: product.isin },
      })
      if (res.onboardingUrl) window.open(res.onboardingUrl, '_blank', 'noopener')
      onSubscribed(product)
    } catch (err) {
      setError(err.message || t('err_generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div
        className="relative bg-navy-card border border-navy-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-navy-card border-b border-navy-border px-8 py-5 flex items-center justify-between z-10">
          <div>
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${meta.tag}`}>
              {meta.label}
            </span>
            <h2 className="text-text-primary text-xl font-bold mt-1">{product.name}</h2>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-gold transition-colors flex-shrink-0 ml-4">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 grid md:grid-cols-5 gap-8">
          {/* Left: details */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-3">Strategy</h3>
              <p className="text-text-muted text-sm leading-relaxed">{product.strategy}</p>
            </div>

            <div>
              <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{t('det_characteristics')}</h3>
              <div className="space-y-1">
                {[
                  [t('prod_isin'), product.isin || 'N/A'],
                  [t('prod_min_ticket'), formatTicket(product.minTicket)],
                  [t('prod_currency'), product.currency],
                  [t('prod_target'), product.targetReturn],
                  ['Asset Class', product.assetClass],
                  ['Category', meta.label],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-navy-border last:border-0">
                    <span className="text-text-muted text-sm">{label}</span>
                    <span className="text-text-primary text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: documents + CTA */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-navy rounded-2xl p-5 border border-navy-border">
              <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-4">{t('det_documents')}</h3>
              <div className="space-y-2">
                <DocLink icon={FileText} label={t('det_factsheet')} href={product.factsheetUrl} />
                {product.kidUrl && <DocLink icon={Download} label={t('det_kid')} href={product.kidUrl} />}
              </div>
            </div>

            <div className="space-y-3">
              {error && (
                <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>
              )}
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-navy font-bold py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-2"
              >
                {loading ? t('det_starting') : t('det_start')}
                {!loading && <ExternalLink size={15} />}
              </button>
              <button
                onClick={onClose}
                className="w-full border border-navy-border text-text-muted hover:text-text-primary hover:border-text-muted py-3 rounded-full text-sm transition-all"
              >
                {t('det_close')}
              </button>
            </div>

            <p className="text-text-faint text-xs leading-relaxed">
              Clicking "Start Subscription" will redirect you to the Framont onboarding platform powered by InvestGlass.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DocLink({ icon: Icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 bg-navy-card border border-navy-border rounded-xl hover:border-gold hover:text-gold text-text-muted text-sm transition-all group"
    >
      <Icon size={16} className="group-hover:text-gold transition-colors flex-shrink-0" />
      <span>{label}</span>
      <ExternalLink size={12} className="ml-auto opacity-50 group-hover:opacity-100" />
    </a>
  )
}
