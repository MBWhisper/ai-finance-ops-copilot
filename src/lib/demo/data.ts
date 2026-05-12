export interface DemoMetrics {
  mrrCents: number
  arrCents: number
  churnRate: number
  ltvCents: number
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
    mrrCents: 4580000,
    arrCents: 54960000,
    churnRate: 3.2,
    ltvCents: 1780000,
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
  const statuses: DemoInvoice["status"][] = ["paid", "paid", "paid", "sent", "overdue", "paid", "draft", "sent", "paid", "overdue"]
  return Array.from({ length: 10 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i * 15 - 30)
    return {
      id: `demo_inv_${i + 1}`,
      customerEmail: `customer${i + 1}@example.com`,
      amountCents: Math.round((5000 + Math.random() * 45000) / 100) * 100,
      dueDate: date.toISOString().split("T")[0],
      status: statuses[i % statuses.length],
    }
  })
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
