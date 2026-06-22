import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { register } from '../lib/api'

const PREFIXES = ['+39', '+41', '+44', '+49', '+33', '+1', '+34', '+31', '+32', '+43']

export default function RegisterModal({ onClose, onSuccess }) {
  const { t } = useAuth()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', prefix: '+39', phone: '',
    investorCategory: 'Retail', gdprConsent: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = t('err_required')
    if (!form.lastName.trim()) e.lastName = t('err_required')
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('err_email')
    if (!form.phone.trim()) e.phone = t('err_required')
    else if (!/^[0-9\s\-()]{4,15}$/.test(form.phone)) e.phone = t('err_phone')
    if (!form.gdprConsent) e.gdprConsent = t('err_gdpr')
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setServerError('')
    try {
      const fullPhone = form.prefix + form.phone.replace(/\s/g, '')
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: fullPhone,
        investorCategory: form.investorCategory,
        gdprConsent: form.gdprConsent,
      })
      onSuccess({ ...form, phone: fullPhone })
    } catch (err) {
      setServerError(err.message || t('err_generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-navy-card border border-navy-border rounded-2xl w-full max-w-md p-8 shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-text-muted hover:text-gold transition-colors">
          <X size={20} />
        </button>

        <h2 className="text-text-primary text-2xl font-bold mb-1">{t('reg_title')}</h2>
        <p className="text-text-muted text-sm mb-6">{t('reg_sub')}</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label={t('reg_first')} error={errors.firstName}>
              <input className={input(errors.firstName)} value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            </Field>
            <Field label={t('reg_last')} error={errors.lastName}>
              <input className={input(errors.lastName)} value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            </Field>
          </div>

          <Field label={t('reg_email')} error={errors.email}>
            <input type="email" className={input(errors.email)} value={form.email} onChange={(e) => set('email', e.target.value)} />
          </Field>

          <Field label={t('reg_phone')} error={errors.phone}>
            <div className="flex gap-2">
              <select
                className="bg-navy border border-navy-border rounded-lg px-2 py-2.5 text-text-primary text-sm focus:outline-none focus:border-gold"
                value={form.prefix}
                onChange={(e) => set('prefix', e.target.value)}
              >
                {PREFIXES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <input className={`${input(errors.phone)} flex-1`} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="3401234567" />
            </div>
          </Field>

          <Field label={t('reg_category')}>
            <select className={input()} value={form.investorCategory} onChange={(e) => set('investorCategory', e.target.value)}>
              <option value="Retail">{t('reg_cat_retail')}</option>
              <option value="Professional">{t('reg_cat_pro')}</option>
              <option value="Institutional">{t('reg_cat_inst')}</option>
            </select>
          </Field>

          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={form.gdprConsent}
                onChange={(e) => set('gdprConsent', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-gold flex-shrink-0"
              />
              <span className="text-text-muted text-xs leading-relaxed group-hover:text-text-primary transition-colors">
                {t('reg_gdpr')}
              </span>
            </label>
            {errors.gdprConsent && <p className="text-red-400 text-xs mt-1">{errors.gdprConsent}</p>}
          </div>

          {serverError && <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg px-3 py-2">{serverError}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-navy font-bold py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-gold/20 mt-2"
          >
            {loading ? t('reg_sending') : t('reg_submit')}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-text-muted text-xs font-medium mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

function input(error) {
  return `w-full bg-navy border ${error ? 'border-red-500' : 'border-navy-border'} rounded-lg px-3 py-2.5 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-gold transition-colors`
}
