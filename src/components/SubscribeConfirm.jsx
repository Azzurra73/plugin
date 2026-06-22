import React from 'react'
import { CheckCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function SubscribeConfirm({ product, onBack }) {
  const { t } = useAuth()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-navy-card border border-navy-border rounded-2xl w-full max-w-sm p-10 text-center shadow-2xl animate-slideUp">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
            <CheckCircle className="text-gold" size={32} />
          </div>
        </div>
        <h2 className="text-text-primary text-xl font-bold mb-3">{t('conf_title')}</h2>
        <p className="text-gold text-sm font-semibold mb-3">{product.name}</p>
        <p className="text-text-muted text-sm leading-relaxed mb-8">{t('conf_msg')}</p>
        <button
          onClick={onBack}
          className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
        >
          {t('conf_back')}
        </button>
      </div>
    </div>
  )
}
