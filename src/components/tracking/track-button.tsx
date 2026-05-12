"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"

interface TrackButtonProps extends ButtonProps {
  eventName: string
  eventMetadata?: Record<string, unknown>
}

export function TrackButton({ eventName, eventMetadata, onClick, ...props }: TrackButtonProps) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        trackEvent(eventName as any, { metadata: eventMetadata }).catch(() => {})
        onClick?.(e)
      }}
    />
  )
}
