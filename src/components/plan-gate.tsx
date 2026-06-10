'use client'

import Link from 'next/link'
import { type PlanId } from '@/lib/subscription'

interface PlanGateProps {
  children: React.ReactNode
  requiredPlan: 'starter' | 'pro' | 'growth'
  currentPlan: PlanId
  feature?: string
}

const PLAN_RANK: Record<PlanId, number> = {
  free: 0, starter: 1, pro: 2, growth: 3, admin: 99,
}

export function PlanGate({ children, requiredPlan, currentPlan, feature }: PlanGateProps) {
  // admin bypasses all gates
  const hasAccess = PLAN_RANK[currentPlan] >= PLAN_RANK[requiredPlan]
  if (hasAccess) return <>{children}</>

  return (
    <div className="relative rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
      <div className="absolute inset-0 rounded-xl bg-white/60 backdrop-blur-[2px]" />
      <div className="relative z-10">
        <div className="mb-3 text-3xl">🔒</div>
        <h3 className="mb-2 text-base font-semibold text-gray-900">
          {feature ?? 'This feature'} requires{' '}
          <span className="capitalize">{requiredPlan}</span> plan
        </h3>
        <p className="mb-4 text-sm text-gray-500">
          You&apos;re on the <span className="font-medium capitalize">{currentPlan}</span> plan.
        </p>
        <Link href="/pricing" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Upgrade Plan →
        </Link>
      </div>
    </div>
  )
}
