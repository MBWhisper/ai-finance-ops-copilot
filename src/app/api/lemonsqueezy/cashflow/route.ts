import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getLemonSqueezyAccount,
  getLemonSqueezyDashboardData,
} from '@/db/queries/lemon-squeezy'
import { db } from '@/db'
import { lemonSqueezyOrders } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const account = await getLemonSqueezyAccount(user.id)
  if (!account) return NextResponse.json({ connected: false })

  const dashboard = await getLemonSqueezyDashboardData(user.id)

  const paidOrders = await db.query.lemonSqueezyOrders.findMany({
    where: eq(lemonSqueezyOrders.userId, user.id),
  })

  const totalPaid = paidOrders
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + o.total, 0)

  const totalRefunds = paidOrders
    .filter((o) => o.status === 'refunded')
    .reduce((sum, o) => sum + o.total, 0)

  const lifetimeRevenue = Math.round((totalPaid - totalRefunds) / 100)

  return NextResponse.json({
    connected: true,
    mrr: Math.round(dashboard.mrr / 100),
    activeSubscriptions: dashboard.activeSubscriptions,
    lifetimeRevenue,
    totalRevenue: Math.round(dashboard.totalRevenue / 100),
  })
}
