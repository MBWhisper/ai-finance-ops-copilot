'use client';

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function safeGtag(command: string, ...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(command, ...args)
  } else if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push([command, ...args])
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)

  // On mount: restore previous consent or show banner
  useEffect(() => {
    if (typeof window === 'undefined') {
      setConsentChecked(true)
      return
    }

    const stored = localStorage.getItem('cookieConsent')

    if (stored === 'granted') {
      // Re-apply granted consent on every page load
      safeGtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
      })
      setShowBanner(false)
    } else if (stored === 'denied') {
      // Keep everything denied — already set as default in layout.tsx
      setShowBanner(false)
    } else {
      // First visit — show banner
      setShowBanner(true)
    }

    setConsentChecked(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'granted')
    safeGtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
    })
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'denied')
    safeGtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
    })
    setShowBanner(false)
  }

  if (!consentChecked || !showBanner) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-95 text-white p-4 z-50 shadow-lg"
    >
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-200 text-center sm:text-left">
          We use cookies to improve your experience, measure analytics, and
          personalise content. You can accept or decline non-essential cookies.{' '}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-emerald-400 hover:text-emerald-300"
          >
            Learn more
          </a>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded transition-colors"
          >
            Accept all
          </button>
          <button
            onClick={handleDecline}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
