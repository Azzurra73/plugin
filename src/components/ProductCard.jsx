import React from 'react'
import { ExternalLink, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { categoryMeta } from '../data/products'

export default function ProductCard({ product, onSubscribe, locked = false }) {
  const { t } = useAuth()
  const meta = categoryMeta[product.category]

  const formatTicket = (n) => {
    if (n >= 1000000) return `€${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `€${(n / 1000).toFixed(0)}k`
    return `€${n}`
  }

  return (
    <div className={`relative bg-navy-card border border-navy-border rounded-2xl p-6 card-hover flex flex-col gap-4 ${locked ? 'opacity-60' : ''}`}>
      {locked && (
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center bg-navy/40 backdrop-blur-[1px] z-10">
          <Lock className="text-gold" size={28} />
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-2 ${meta.tag}`}>
            {meta.label}
          </span>
          <h3 className="text-text-primary font-bold text-base leading-snug">{product.name}</h3>
          {product.isin && <p className="text-text-faint text-xs mt-1 font-mono">{product.isin}</p>}
        </div>
        <span className="text-text-muted text-xs border border-navy-border px-2 py-1 rounded-lg whitespace-nowrap">
          {product.assetClass}
        </span>
      </div>

      {/* Strategy */}
      <p className="text-text-muted text-sm leading-relaxed line-clamp-3 flex-1">{product.strategy}</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Stat label={t('prod_min_ticket')} value={formatTicket(product.minTicket)} />
        <Stat label={t('prod_currency')} value={product.currency} />
        <Stat label={t('prod_target')} value={product.targetReturn} />
      </div>

      {/* CTA */}
      <button
        onClick={() => !locked && onSubscribe(product)}
        disabled={locked}
        className="w-full flex items-center justify-center gap-2 bg-transparent border border-gold text-gold hover:bg-gold hover:text-navy font-semibold text-sm py-2.5 rounded-full transition-all duration-200 disabled:cursor-not-allowed mt-1"
      >
        {t('prod_subscribe_btn')}
        <ExternalLink size={14} />
      </button>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-navy rounded-xl px-3 py-2 text-center">
      <p className="text-text-faint text-[10px] uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-text-primary text-xs font-bold">{value}</p>
    </div>
  )
}
