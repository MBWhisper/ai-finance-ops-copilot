'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { CancellationModal } from './CancellationModal'

interface CancelSubscriptionSectionProps {
  customerPortalUrl?: string | null
  planLabel: string
}

export function CancelSubscriptionSection({ customerPortalUrl, planLabel }: CancelSubscriptionSectionProps) {
  const [showModal, setShowModal] = useState(false)

  function handleConfirm() {
    setShowModal(false)
    if (customerPortalUrl) {
      window.location.href = customerPortalUrl
    }
  }

  if (planLabel === 'Free') return null

  return (
    <>
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-red-900">Cancel subscription</h3>
            <p className="mt-1 text-sm text-red-700">
              Your {planLabel} plan will remain active until the end of the billing period.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 inline-flex items-center rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
            >
              Cancel subscription
            </button>
          </div>
        </div>
      </div>

      <CancellationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirm}
      />
    </>
  )
}
