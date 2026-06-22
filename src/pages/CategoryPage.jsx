import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { products, education, categoryMeta } from '../data/products'
import ProductCard from '../components/ProductCard'
import ProductDetailModal from '../components/ProductDetailModal'
import SubscribeConfirm from '../components/SubscribeConfirm'

export default function CategoryPage({ category }) {
  const { isAuthenticated, t } = useAuth()
  const navigate = useNavigate()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [confirmedProduct, setConfirmedProduct] = useState(null)
  const [filterAsset, setFilterAsset] = useState('All')
  const [filterCurrency, setFilterCurrency] = useState('All')
  const [filterTicket, setFilterTicket] = useState('All')
  const [openFaq, setOpenFaq] = useState(null)

  if (!isAuthenticated) { navigate('/'); return null }

  const meta = categoryMeta[category]
  const edu = education[category]
  const categoryProducts = products.filter((p) => p.category === category && p.active)

  const assetClasses = ['All', ...new Set(categoryProducts.map((p) => p.assetClass))]
  const currencies = ['All', ...new Set(categoryProducts.map((p) => p.currency))]

  const filtered = useMemo(() => categoryProducts.filter((p) => {
    if (filterAsset !== 'All' && p.assetClass !== filterAsset) return false
    if (filterCurrency !== 'All' && p.currency !== filterCurrency) return false
    if (filterTicket === t('prod_ticket_small') && p.minTicket >= 10000) return false
    if (filterTicket === t('prod_ticket_mid') && (p.minTicket < 10000 || p.minTicket > 100000)) return false
    if (filterTicket === t('prod_ticket_large') && p.minTicket <= 100000) return false
    return true
  }), [categoryProducts, filterAsset, filterCurrency, filterTicket])

  return (
    <div className="min-h-screen pt-16">
      {/* Category hero */}
      <div className={`bg-gradient-to-br ${meta.color} py-16 border-b border-navy-border`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${meta.tag}`}>
            {meta.label}
          </span>
          <h1 className="text-text-primary text-5xl font-extrabold mb-4">{meta.label}</h1>
          <p className="text-text-muted text-lg max-w-2xl leading-relaxed">{t(`cat_${category}_desc`)}</p>
        </div>
      </div>

      {/* Educational section */}
      <section className="bg-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">{t('edu_what')}</p>
          <div className="grid md:grid-cols-3 gap-12">
            {/* What */}
            <div className="md:col-span-2">
              <h2 className="text-text-primary text-3xl font-extrabold mb-6">{t('edu_what')} {meta.label}?</h2>
              <p className="text-text-muted text-base leading-loose">{edu.whatIsIt}</p>

              <h3 className="text-text-primary font-bold text-lg mt-10 mb-4">{t('edu_who')}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{edu.whoCanSubscribe}</p>
            </div>

            {/* Advantages */}
            <div className="bg-navy-card border border-navy-border rounded-2xl p-7">
              <h3 className="text-gold text-xs font-bold uppercase tracking-widest mb-5">{t('edu_advantages')}</h3>
              <ul className="space-y-3">
                {edu.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-gold flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-text-muted text-sm leading-relaxed">{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Characteristics */}
          <div className="mt-14">
            <h3 className="text-text-primary font-bold text-lg mb-5">{t('edu_characteristics')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {edu.characteristics.map(({ label, value }) => (
                <div key={label} className="bg-navy-card border border-navy-border rounded-xl px-5 py-4">
                  <p className="text-text-faint text-xs uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-text-primary text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <h3 className="text-text-primary font-bold text-lg mb-5">{t('edu_faq')}</h3>
            <div className="space-y-2 max-w-3xl">
              {edu.faq.map((item, i) => (
                <div key={i} className="bg-navy-card border border-navy-border rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-navy/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-text-primary text-sm font-medium pr-4">{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-gold flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 pt-0">
                      <p className="text-text-muted text-sm leading-relaxed border-t border-navy-border pt-4">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products catalogue */}
      <section className="bg-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">{t('edu_available')}</p>
              <h2 className="text-text-primary text-3xl font-extrabold">{meta.label} Products</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <FilterSelect
                value={filterAsset}
                onChange={setFilterAsset}
                options={assetClasses}
                placeholder={t('prod_filter_asset')}
              />
              <FilterSelect
                value={filterCurrency}
                onChange={setFilterCurrency}
                options={currencies}
                placeholder={t('prod_filter_currency')}
              />
              <FilterSelect
                value={filterTicket}
                onChange={setFilterTicket}
                options={[t('prod_filter_all'), t('prod_ticket_small'), t('prod_ticket_mid'), t('prod_ticket_large')]}
                placeholder={t('prod_filter_ticket')}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-text-muted">No products match the selected filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onSubscribe={setSelectedProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSubscribed={(p) => { setSelectedProduct(null); setConfirmedProduct(p) }}
        />
      )}
      {confirmedProduct && (
        <SubscribeConfirm
          product={confirmedProduct}
          onBack={() => setConfirmedProduct(null)}
        />
      )}
    </div>
  )
}

function FilterSelect({ value, onChange, options, placeholder }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-navy-card border border-navy-border text-text-muted text-xs rounded-full px-4 py-2 focus:outline-none focus:border-gold transition-colors cursor-pointer"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}
