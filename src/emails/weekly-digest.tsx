interface DigestCustomer {
  name: string
  email: string
  mrrCents: number
  riskLevel: string
  riskScore: number
  recommendation: string
}

interface WeeklyDigestProps {
  firstName?: string
  currentMrrCents: number
  mrrChangePercent: number
  atRiskCount: number
  pmfStatus: string
  topCustomers: DigestCustomer[]
}

export function buildWeeklyDigestEmail({
  firstName = "there",
  currentMrrCents = 0,
  mrrChangePercent = 0,
  atRiskCount = 0,
  pmfStatus = "Unknown",
  topCustomers = [],
}: WeeklyDigestProps): string {
  const formatCents = (c: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(c / 100)

  const mrrColor = mrrChangePercent >= 0 ? "#10b981" : "#ef4444"
  const mrrSign = mrrChangePercent >= 0 ? "+" : ""

  const customerRows = topCustomers
    .map(
      (c) => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e6e6e6; color: #111827; font-size: 14px;">${c.name}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e6e6e6; color: #4b5563; font-size: 14px;">${formatCents(c.mrrCents)}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e6e6e6; color: ${
        c.riskLevel === "critical" ? "#ef4444" : c.riskLevel === "at-risk" ? "#f97316" : "#eab308"
      }; font-size: 14px; text-transform: capitalize;">${c.riskLevel} (${c.riskScore})</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e6e6e6; color: #4b5563; font-size: 14px;">${c.recommendation}</td>
    </tr>`
    )
    .join("")

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f6f9fc; padding: 40px 0;">
      <div style="background: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px; max-width: 600px; margin: 0 auto; padding: 40px 32px;">
        <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 8px;">Weekly Digest 📊</h1>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">Hi ${firstName}, here's your business snapshot for this week.</p>

        <!-- MRR Summary -->
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 4px;">Current MRR</p>
          <p style="color: #111827; font-size: 32px; font-weight: 700; margin: 0 0 4px;">${formatCents(currentMrrCents)}</p>
          <p style="color: ${mrrColor}; font-size: 14px; font-weight: 500; margin: 0;">
            ${mrrSign}${mrrChangePercent.toFixed(1)}% vs last week
          </p>
        </div>

        <!-- Key Metrics -->
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <div style="flex: 1; background: #fef2f2; border-radius: 8px; padding: 16px; text-align: center;">
            <p style="color: #ef4444; font-size: 24px; font-weight: 700; margin: 0 0 2px;">${atRiskCount}</p>
            <p style="color: #dc2626; font-size: 13px; margin: 0;">Customers at risk</p>
          </div>
          <div style="flex: 1; background: #f0fdf4; border-radius: 8px; padding: 16px; text-align: center;">
            <p style="color: #10b981; font-size: 24px; font-weight: 700; margin: 0 0 2px;">${pmfStatus}</p>
            <p style="color: #059669; font-size: 13px; margin: 0;">Product-Market Fit</p>
          </div>
        </div>

        <!-- At-Risk Customers -->
        ${topCustomers.length > 0 ? `
        <h2 style="color: #111827; font-size: 18px; font-weight: 600; margin: 0 0 12px;">Top At-Risk Customers</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="padding: 10px 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Customer</th>
              <th style="padding: 10px 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">MRR</th>
              <th style="padding: 10px 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Risk</th>
              <th style="padding: 10px 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${customerRows}
          </tbody>
        </table>
        ` : '<p style="color: #6b7280; font-size: 14px;">No at-risk customers this week.</p>'}

        <!-- CTA -->
        <div style="margin: 28px 0; text-align: center;">
          <a href="https://www.aifinanceops.app/dashboard/warnings" style="background: #10b981; border-radius: 8px; color: #ffffff; font-size: 16px; font-weight: 600; padding: 12px 28px; text-decoration: none; display: inline-block;">
            View Full Dashboard
          </a>
        </div>

        <!-- Footer -->
        <hr style="border: none; border-top: 1px solid #e6e6e6; margin: 28px 0;" />
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          Sent by AI Finance Ops · <a href="https://www.aifinanceops.app" style="color: #10b981; text-decoration: none;">aifinanceops.app</a>
        </p>
        <p style="color: #9ca3af; font-size: 12px; margin: 4px 0 0;">
          To unsubscribe from these digests, visit your <a href="https://www.aifinanceops.app/dashboard/settings" style="color: #10b981; text-decoration: none;">notification settings</a>.
        </p>
      </div>
    </div>
  `
}
