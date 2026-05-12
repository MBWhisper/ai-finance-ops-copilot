import { createClient } from '@/lib/supabase/server'

export type PlanId = 'free' | 'starter' | 'pro' | 'growth'

export interface SubscriptionInfo {
  plan: PlanId
  status: string | null
  isActive: boolean
  isFree: boolean
  isStarter: boolean
  isPro: boolean
  isGrowth: boolean
}

const ACTIVE_STATUSES = ['active', 'on_trial']

export async function getUserSubscription(userId: string): Promise<SubscriptionInfo> {
  const supabase = createClient()
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', userId)
    .in('status', ACTIVE_STATUSES)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const plan = (subscription?.plan as PlanId) ?? 'free'
  const status = subscription?.status ?? null
  const isActive = ACTIVE_STATUSES.includes(status ?? '')

  return {
    plan,
    status,
    isActive,
    isFree: plan === 'free' || !isActive,
    isStarter: isActive && plan === 'starter',
    isPro: isActive && plan === 'pro',
    isGrowth: isActive && plan === 'growth',
  }
}

export const PLAN_FEATURES = {
  stripeConnections: { free: 1, starter: 1, pro: 3, growth: 10 },
  forecastDays:      { free: 30, starter: 30, pro: 90, growth: 90 },
  aiCopilot:         { free: false, starter: false, pro: true, growth: true },
  csvExport:         { free: false, starter: true, pro: true, growth: true },
  teamMembers:       { free: 1, starter: 1, pro: 3, growth: 10 },
} as const
