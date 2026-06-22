import React, { useState } from 'react'
import { X, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { verify, register } from '../lib/api'

export default function VerifyModal({ subscriberData, onClose, onVerified }) {
  const { t, login } = useAuth()
  const [emailCode, setEmailCode] = useState('')
  const [smsCode, setSmsCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const [resent, setResent] = useState(false)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!emailCode || !smsCode) { setError('Please enter both codes.'); return }
    setLoading(true)
    setError('')
    try {
      await verify({ email: subscriberData.email, emailCode, smsCode })
      login({
        firstName: subscriberData.firstName,
        lastName: subscriberData.lastName,
        email: subscriberData.email,
        phone: subscriberData.phone,
        investorCategory: subscriberData.investorCategory,
      })
      onVerified()
    } catch (err) {
      setError(err.message || t('err_generic'))
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    try {
      await register({ ...subscriberData, gdprConsent: true })
      setResent(true)
      setTimeout(() => setResent(false), 4000)
    } catch {
      // silent
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-navy-card border border-navy-border rounded-2xl w-full max-w-sm p-8 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-gold transition-colors">
          <X size={20} />
        </button>

        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <ShieldCheck className="text-gold" size={26} />
          </div>
        </div>

        <h2 className="text-text-primary text-xl font-bold mb-1 text-center">{t('ver_title')}</h2>
        <p className="text-text-muted text-sm mb-6 text-center">{t('ver_sub')}</p>
        <p className="text-gold text-xs text-center mb-6 font-medium">{subscriberData.email}</p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-text-muted text-xs font-medium mb-1.5 uppercase tracking-wide">{t('ver_email_code')}</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary text-center text-xl tracking-[0.3em] font-mono focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-text-muted text-xs font-medium mb-1.5 uppercase tracking-wide">{t('ver_sms_code')}</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={smsCode}
              onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary text-center text-xl tracking-[0.3em] font-mono focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{error}</p>}
          {resent && <p className="text-emerald-400 text-sm text-center">Codes resent successfully.</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-navy font-bold py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/20"
          >
            {loading ? t('ver_verifying') : t('ver_submit')}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-text-muted hover:text-gold text-sm transition-colors disabled:opacity-50"
          >
            {resending ? 'Sending...' : t('ver_resend')}
          </button>
        </form>
      </div>
    </div>
  )
}
