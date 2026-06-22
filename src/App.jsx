import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import RegisterModal from './components/RegisterModal'
import VerifyModal from './components/VerifyModal'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import Admin from './pages/Admin'

function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
      <h1 className="text-text-primary text-4xl font-extrabold mb-6">Privacy Policy</h1>
      <p className="text-text-muted leading-relaxed mb-4">
        Framont collects your personal data (name, email, phone number, investor category) for the purpose of providing access to the Framont Access investment platform and related financial services.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        Your data is processed in compliance with GDPR (EU) 2016/679. You have the right to access, rectify, and erase your personal data at any time by contacting privacy@framont.com.
      </p>
      <p className="text-text-muted leading-relaxed">
        Data is not shared with third parties except as necessary to provide the services (e.g. InvestGlass for onboarding) and is stored securely.
      </p>
    </div>
  )
}

function AppInner() {
  const [registerOpen, setRegisterOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)
  const [pendingSubscriber, setPendingSubscriber] = useState(null)

  const handleRegisterSuccess = (subscriberData) => {
    setRegisterOpen(false)
    setPendingSubscriber(subscriberData)
    setVerifyOpen(true)
  }

  const handleVerified = () => {
    setVerifyOpen(false)
    setPendingSubscriber(null)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenRegister={() => setRegisterOpen(true)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onOpenRegister={() => setRegisterOpen(true)} />} />
          <Route path="/funds" element={<CategoryPage category="fund" />} />
          <Route path="/amc" element={<CategoryPage category="amc" />} />
          <Route path="/eti" element={<CategoryPage category="eti" />} />
          <Route path="/vc" element={<CategoryPage category="vc" />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </main>
      <Footer />

      {registerOpen && (
        <RegisterModal
          onClose={() => setRegisterOpen(false)}
          onSuccess={handleRegisterSuccess}
        />
      )}
      {verifyOpen && pendingSubscriber && (
        <VerifyModal
          subscriberData={pendingSubscriber}
          onClose={() => setVerifyOpen(false)}
          onVerified={handleVerified}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  )
}
