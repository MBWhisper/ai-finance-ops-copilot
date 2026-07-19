import { createClient } from '@/lib/supabase/server'

export type PlanId = 'free' | 'starter' | 'pro' | 'growth' | 'admin'

export interface SubscriptionInfo {
  plan: PlanId
  status: string | null
  isActive: boolean
  isFree: boolean
  isStarter: boolean
  isPro: boolean
  isGrowth: boolean
  isAdmin: boolean
}

const ACTIVE_STATUSES = ['active', 'on_trial']

export async function getUserSubscription(userId: string): Promise<SubscriptionInfo> {
  const supabase = await createClient()

  // Check admin role first via user metadata
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.user_metadata?.role === 'admin' || user?.app_metadata?.role === 'admin') {
    return {
      plan: 'admin',
      status: 'active',
      isActive: true,
      isFree: false,
      isStarter: false,
      isPro: false,
      isGrowth: false,
      isAdmin: true,
    }
  }

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
    isAdmin: false,
  }
}

export const PLAN_FEATURES = {
  stripeConnections: { free: 1, starter: 1, pro: 3, growth: 10, admin: 999 },
  forecastDays:      { free: 30, starter: 30, pro: 90, growth: 90, admin: 365 },
  aiCopilot:         { free: false, starter: false, pro: true, growth: true, admin: true },
  csvExport:         { free: false, starter: true, pro: true, growth: true, admin: true },
  teamMembers:       { free: 1, starter: 1, pro: 3, growth: 10, admin: 999 },
} as const
