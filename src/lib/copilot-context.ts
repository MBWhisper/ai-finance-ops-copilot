export function buildCopilotContext(page: string, pageData?: any) {
  const base = {
    currentPage: page,
    timestamp: new Date().toISOString(),
    metrics: {
      mrr: { value: 72600, trend: '+12.4%', label: 'Monthly Recurring Revenue' },
      arr: { value: 871200, trend: '+12.4%', label: 'Annual Recurring Revenue' },
      churnRate: { value: '0.80%', trend: '-0.2%', label: 'Monthly Churn Rate' },
      ltv: { value: 92000, trend: '+8.1%', label: 'Customer Lifetime Value' },
      pmfScore: 'Strong',
      month1Retention: '72%',
      month3Retention: '48%',
    },
    invoices: {
      total: 5,
      paid: 2,
      outstanding: 453,
      overdueCount: 2,
    },
    mrrHistory: {
      months: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
      values: [41200, 48900, 55600, 61300, 68100, 72600],
      growthRate: '+76% over 6 months',
    },
    trialDaysLeft: 5,
  }

  if (page === 'invoices' && pageData?.invoices) {
    return { ...base, invoiceDetails: pageData.invoices }
  }
  if (page === 'analytics' && pageData?.cohorts) {
    return { ...base, cohortData: pageData.cohorts }
  }

  return base
}
