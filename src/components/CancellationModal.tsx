'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

const REASONS = [
  'Too expensive',
  'Missing features I need',
  'Switching to another tool',
  'No longer need it',
  'Other',
]

interface CancellationModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function CancellationModal({ open, onClose, onConfirm }: CancellationModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!open) return null

  async function handleConfirm() {
    if (!selectedReason) return

    setSubmitting(true)
    try {
      await fetch('/api/cancellation-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: selectedReason, comment: comment.trim() || undefined }),
      })
      onConfirm()
    } catch {
      // proceed with cancellation even if feedback save fails
      onConfirm()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Before you go...</h2>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-5">
          <p className="text-sm text-gray-500">Help us improve by telling us why you&apos;re leaving.</p>

          <div className="space-y-2">
            {REASONS.map((reason) => (
              <label
                key={reason}
                className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                  selectedReason === reason
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="cancellation-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => setSelectedReason(reason)}
                  className="h-4 w-4 text-blue-600 accent-blue-600"
                />
                <span className="text-sm font-medium text-gray-900">{reason}</span>
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="cancel-comment" className="block text-sm font-medium text-gray-700 mb-1">
              Any additional feedback? <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="cancel-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us more..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Never mind, keep my subscription
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedReason || submitting}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin mr-1.5" />}
            {submitting ? 'Processing...' : 'Cancel my subscription'}
          </button>
        </div>
      </div>
    </div>
  )
}
