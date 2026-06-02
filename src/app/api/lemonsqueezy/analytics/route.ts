import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getLemonSqueezyAccount,
  getLemonSqueezyMonthlyRevenue,
  getLemonSqueezyTopProducts,
  getLemonSqueezySubscriptionStatusBreakdown,
  getLemonSqueezyOrdersPaginated,
} from '@/db/queries/lemon-squeezy'

export async function GET(req: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const account = await getLemonSqueezyAccount(user.id)
  if (!account) return NextResponse.json({ connected: false })

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') ?? '1')

  const [revenue, topProducts, statusBreakdown, orders] = await Promise.all([
    getLemonSqueezyMonthlyRevenue(user.id),
    getLemonSqueezyTopProducts(user.id),
    getLemonSqueezySubscriptionStatusBreakdown(user.id),
    getLemonSqueezyOrdersPaginated(user.id, page),
  ])

  return NextResponse.json({
    connected: true,
    revenue,
    topProducts,
    statusBreakdown,
    orders,
  })
}
