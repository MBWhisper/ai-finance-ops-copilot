'use client';

import { useEffect, useState } from 'react'

// Extend Window interface for dataLayer and gtag
declare global {
  interface Window {
    dataLayer?: any[]
  }
  function gtag(command: string, ...args: unknown[]): void
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'granted')
    // Update Google Consent Mode v2 — signals GA to begin tracking
    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'denied')
    // Update Google Consent Mode v2 — keeps analytics denied
    if (typeof window !== 'undefined' && typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
    setShowBanner(false)
  }

  useEffect(() => {
    // Check localStorage for consent (only in browser)
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent')
      if (consent === null) {
        // No consent found, show banner
        setShowBanner(true)
      } else {
        // Consent found, hide banner
        setShowBanner(false)
      }
      setConsentChecked(true)
    } else {
      // During SSR, we don't show the banner yet
      setConsentChecked(true)
    }
  }, [])

  if (!showBanner || !consentChecked) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 text-white p-4 z-50">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        <p className="mb-4">
          We use cookies to improve your experience. By continuing, you accept our use of cookies.
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}