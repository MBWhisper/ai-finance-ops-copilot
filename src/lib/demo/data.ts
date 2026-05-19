export interface DemoMetrics {
  mrrCents: number
  arrCents: number
  churnRate: number
  ltvCents: number
  activeCustomers: number
  runwayMonths: number
}

export interface DemoMetricsHistory {
  date: string
  mrrCents: number
  arrCents: number
  churnRate: number
  ltvCents: number
}

export interface DemoInvoice {
  id: string
  customerName: string
  customerEmail: string
  amountCents: number
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue"
}

export interface DemoForecast {
  forecastDate: string
  amountCents: number
  type: "revenue" | "expense"
  p50Cents: number | null
  p80Cents: number | null
  p95Cents: number | null
}

export function getDemoMetrics(): DemoMetrics {
  return {
    mrrCents: 2450000,
    arrCents: 29400000,
    churnRate: 2.1,
    ltvCents: 1780000,
    activeCustomers: 142,
    runwayMonths: 18,
  }
}

export function getDemoMetricsHistory(days = 90): DemoMetricsHistory[] {
  const data: DemoMetricsHistory[] = []
  const baseMrr = 3500000
  const baseArr = 42000000
  const baseChurn = 4.5
  const baseLtv = 1200000

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const growthFactor = 1 + ((days - i) / days) * 0.3
    const noise = 1 + (Math.random() - 0.5) * 0.05

    data.push({
      date: date.toISOString().split("T")[0],
      mrrCents: Math.round(baseMrr * growthFactor * noise),
      arrCents: Math.round(baseArr * growthFactor * noise),
      churnRate: Math.round((baseChurn - (days - i) * 0.015) * 10) / 10,
      ltvCents: Math.round(baseLtv * growthFactor * noise),
    })
  }
  return data
}

export function getDemoInvoices(): DemoInvoice[] {
  const now = new Date()
  return [
    { id: 'demo_inv_1', customerName: 'Acme Corp', customerEmail: 'billing@acmecorp.com', amountCents: 420000, dueDate: new Date(now.getTime() - 5 * 86400000).toISOString().split('T')[0], status: 'paid' },
    { id: 'demo_inv_2', customerName: 'Globex Inc', customerEmail: 'ap@globex.io', amountCents: 150000, dueDate: new Date(now.getTime() + 10 * 86400000).toISOString().split('T')[0], status: 'sent' },
    { id: 'demo_inv_3', customerName: 'Initech', customerEmail: 'finance@initech.com', amountCents: 780000, dueDate: new Date(now.getTime() - 12 * 86400000).toISOString().split('T')[0], status: 'overdue' },
    { id: 'demo_inv_4', customerName: 'Umbrella Co', customerEmail: 'treasury@umbrella.co', amountCents: 250000, dueDate: new Date(now.getTime() - 2 * 86400000).toISOString().split('T')[0], status: 'paid' },
    { id: 'demo_inv_5', customerName: 'Stark Industries', customerEmail: 'invoices@stark.com', amountCents: 995000, dueDate: new Date(now.getTime() + 14 * 86400000).toISOString().split('T')[0], status: 'draft' },
  ]
}

export function getDemoInvoiceStats() {
  const invoices = getDemoInvoices()
  return {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "paid").length,
    totalAmountCents: invoices.reduce((sum, i) => sum + i.amountCents, 0),
  }
}

export function getDemoForecasts(days = 90): DemoForecast[] {
  const data: DemoForecast[] = []
  const baseRevenue = 150000
  const baseExpense = 120000
  const growthRate = 0.02

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const dateStr = date.toISOString().split("T")[0]
    const growth = 1 + growthRate * i
    const noise = 1 + (Math.random() - 0.5) * 0.1

    const revenueAmount = Math.round(baseRevenue * growth * noise)
    const expenseAmount = Math.round(baseExpense * growth * (1 + (Math.random() - 0.5) * 0.05))
    const stdDev = revenueAmount * 0.1 * Math.sqrt(1 + i / 30)

    data.push({
      forecastDate: dateStr,
      amountCents: revenueAmount,
      type: "revenue",
      p50Cents: revenueAmount,
      p80Cents: revenueAmount - Math.round(stdDev * 0.84),
      p95Cents: revenueAmount - Math.round(stdDev * 1.65),
    })
    data.push({
      forecastDate: dateStr,
      amountCents: expenseAmount,
      type: "expense",
      p50Cents: expenseAmount,
      p80Cents: expenseAmount + Math.round(stdDev * 0.84),
      p95Cents: expenseAmount + Math.round(stdDev * 1.65),
    })
  }
  return data
}
