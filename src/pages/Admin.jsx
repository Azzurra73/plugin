import React, { useState } from 'react'
import { LogOut, Download, Users, FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getAdminData } from '../lib/api'

const ADMIN_TOKEN = 'framont2025'

export default function Admin() {
  const { t } = useAuth()
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('subscribers')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (password !== ADMIN_TOKEN) { setError('Invalid password.'); return }
    setLoading(true)
    try {
      const res = await getAdminData(password)
      setData(res)
      setAuthed(true)
    } catch {
      setData({ subscribers: [], subscriptions: [] })
      setAuthed(true)
    } finally {
      setLoading(false)
    }
  }

  const exportCsv = (rows, cols, filename) => {
    const header = cols.map((c) => c.label).join(',')
    const body = rows.map((r) => cols.map((c) => `"${r[c.key] ?? ''}"`).join(',')).join('\n')
    const blob = new Blob([header + '\n' + body], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
  }

  if (!authed) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <div className="bg-navy-card border border-navy-border rounded-2xl p-10 w-full max-w-sm">
          <h1 className="text-text-primary text-2xl font-bold mb-6 text-center">{t('admin_title')}</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-text-muted text-xs font-medium mb-1.5 uppercase tracking-wide">{t('admin_password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy border border-navy-border rounded-lg px-3 py-2.5 text-text-primary text-sm focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-navy font-bold py-3 rounded-full transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Loading...' : t('admin_enter')}
            </button>
          </form>
        </div>
      </div>
    )
  }

  const subscribers = data?.subscribers || []
  const subscriptions = data?.subscriptions || []

  const subCols = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'investorCategory', label: 'Category' },
    { key: 'createdAt', label: 'Registered' },
    { key: 'verified', label: 'Verified' },
  ]

  const txCols = [
    { key: 'email', label: 'Email' },
    { key: 'productName', label: 'Product' },
    { key: 'productId', label: 'Product ID' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date' },
  ]

  return (
    <div className="min-h-screen pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-text-primary text-3xl font-extrabold">{t('admin_title')}</h1>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-2 text-text-muted hover:text-gold text-sm transition-colors"
          >
            <LogOut size={16} /> {t('admin_logout')}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'subscribers', label: t('admin_subscribers'), icon: Users, count: subscribers.length },
            { key: 'subscriptions', label: t('admin_subscriptions'), icon: FileText, count: subscriptions.length },
          ].map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                tab === key
                  ? 'bg-gold text-navy font-bold'
                  : 'bg-navy-card border border-navy-border text-text-muted hover:text-text-primary'
              }`}
            >
              <Icon size={15} />
              {label}
              <span className={`text-xs px-2 py-0.5 rounded-full ${tab === key ? 'bg-navy/20' : 'bg-navy-border'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        {tab === 'subscribers' && (
          <TableSection
            title={t('admin_subscribers')}
            rows={subscribers}
            cols={subCols}
            onExport={() => exportCsv(subscribers, subCols, 'framont-subscribers.csv')}
            t={t}
          />
        )}
        {tab === 'subscriptions' && (
          <TableSection
            title={t('admin_subscriptions')}
            rows={subscriptions}
            cols={txCols}
            onExport={() => exportCsv(subscriptions, txCols, 'framont-subscriptions.csv')}
            t={t}
          />
        )}
      </div>
    </div>
  )
}

function TableSection({ title, rows, cols, onExport, t }) {
  return (
    <div className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-navy-border">
        <h2 className="text-text-primary font-bold">{title} ({rows.length})</h2>
        <button
          onClick={onExport}
          className="flex items-center gap-2 text-gold hover:text-gold-light text-sm font-medium transition-colors"
        >
          <Download size={15} />
          {t('admin_export')}
        </button>
      </div>
      {rows.length === 0 ? (
        <div className="py-16 text-center text-text-muted text-sm">No data yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy-border">
                {cols.map((c) => (
                  <th key={c.key} className="px-5 py-3 text-left text-text-faint text-xs font-bold uppercase tracking-wider">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-navy-border last:border-0 hover:bg-navy/40 transition-colors">
                  {cols.map((c) => (
                    <td key={c.key} className="px-5 py-3.5 text-text-muted text-sm">
                      {String(row[c.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
