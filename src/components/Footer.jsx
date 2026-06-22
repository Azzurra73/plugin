import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Footer() {
  const { t } = useAuth()
  return (
    <footer className="bg-navy border-t border-navy-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex flex-col leading-none mb-4">
              <span className="text-gold font-bold text-lg tracking-widest">FRAMONT</span>
              <span className="text-text-muted text-xs tracking-[0.2em] uppercase">Access</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Institutional-grade investment products, curated and made accessible through Framont's distribution platform.
            </p>
          </div>
          <div>
            <h4 className="text-text-primary text-sm font-semibold mb-4 tracking-wide uppercase">Platform</h4>
            <ul className="space-y-2">
              {[
                ['Funds', '/funds'],
                ['AMC', '/amc'],
                ['ETI', '/eti'],
                ['VC Deals', '/vc'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-text-muted hover:text-gold text-sm transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-text-primary text-sm font-semibold mb-4 tracking-wide uppercase">Legal</h4>
            <ul className="space-y-2">
              {[
                ['Privacy Policy', '/privacy'],
                ['Terms of Use', '/privacy'],
                ['Contact', 'mailto:access@framont.com'],
              ].map(([label, to]) => (
                <li key={label}>
                  {to.startsWith('mailto') ? (
                    <a href={to} className="text-text-muted hover:text-gold text-sm transition-colors">{label}</a>
                  ) : (
                    <Link to={to} className="text-text-muted hover:text-gold text-sm transition-colors">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-border mt-10 pt-6">
          <p className="text-text-faint text-xs leading-relaxed max-w-4xl">
            Framont Access is an investment platform reserved for eligible investors. The information presented does not constitute investment advice or a solicitation to buy or sell any financial instrument. All investments carry risk, including the potential loss of principal. Past performance is not indicative of future results. Please read the relevant documentation before subscribing to any product.
          </p>
          <p className="text-text-faint text-xs mt-3">© {new Date().getFullYear()} Framont. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
