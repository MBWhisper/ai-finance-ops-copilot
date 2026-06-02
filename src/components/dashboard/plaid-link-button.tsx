'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Building2 } from 'lucide-react'

interface PlaidLinkButtonProps {
  onSuccess: (publicToken: string, institutionName?: string, institutionId?: string) => void
  onExit?: () => void
  onError?: (error: Error) => void
  label?: string
  variant?: 'default' | 'outline'
  className?: string
}

declare global {
  interface Window {
    Plaid: {
      create: (config: {
        token: string
        onSuccess: (publicToken: string, metadata: { institution?: { name?: string; institution_id?: string } }) => void
        onExit?: (err: Error | null) => void
        onLoad?: () => void
        onEvent?: (eventName: string, metadata: Record<string, unknown>) => void
      }) => { open: () => void; destroy: () => void }
    }
  }
}

export function PlaidLinkButton({
  onSuccess,
  onExit,
  onError,
  label = 'Connect Bank Account',
  variant = 'default',
  className,
}: PlaidLinkButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || window.Plaid) return
    const script = document.createElement('script')
    script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const handleClick = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/plaid/create-link-token', { method: 'POST' })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error ?? `Request failed (${res.status})`)
      }
      const { link_token } = await res.json()
      if (!link_token) throw new Error('No link token returned')

      if (!window.Plaid) {
        const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
        for (let i = 0; i < 20; i++) {
          if (window.Plaid) break
          await wait(250)
        }
        if (!window.Plaid) {
          throw new Error('Plaid Link library failed to load — check network or ad blocker')
        }
      }

      const handler = window.Plaid.create({
        token: link_token,
        onSuccess: (publicToken, metadata) => {
          onSuccess(publicToken, metadata.institution?.name, metadata.institution?.institution_id)
          handler.destroy()
          setLoading(false)
        },
        onExit: (err) => {
          if (err && onError) onError(new Error(err.message))
          if (onExit) onExit()
          handler.destroy()
          setLoading(false)
        },
      })
      handler.open()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to open Plaid Link'
      setError(message)
      if (onError) onError(new Error(message))
      setLoading(false)
    }
  }, [onSuccess, onExit, onError])

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={loading}
        variant={variant}
        className={className}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-1" />
        ) : (
          <Building2 className="h-4 w-4 mr-1" />
        )}
        {loading ? 'Connecting...' : label}
      </Button>
      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  )
}
