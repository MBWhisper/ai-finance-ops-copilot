interface WelcomeEmailProps {
  firstName?: string
}

export function buildWelcomeEmail({ firstName }: WelcomeEmailProps = {}): string {
  const name = firstName ?? 'there'

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f6f9fc; padding: 40px 0;">
      <div style="background: #ffffff; border: 1px solid #e6e6e6; border-radius: 8px; max-width: 560px; margin: 0 auto; padding: 40px 32px;">
        <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 20px;">
          Welcome to AI Finance Ops 🚀
        </h1>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 12px;">Hi ${name},</p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 12px;">Welcome! Your account is ready.</p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 12px;">Here's what you can do now:</p>
        <div style="margin: 16px 0;">
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 4px 0;">• Connect your Stripe account</p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 4px 0;">• View your MRR &amp; ARR dashboard</p>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 4px 0;">• See your 30-day cash flow forecast</p>
        </div>
        <div style="margin: 28px 0; text-align: center;">
          <a href="https://aifinanceops.app/dashboard" style="background: #10b981; border-radius: 8px; color: #ffffff; font-size: 16px; font-weight: 600; padding: 12px 28px; text-decoration: none; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        <hr style="border: none; border-top: 1px solid #e6e6e6; margin: 28px 0;" />
        <p style="color: #9ca3af; font-size: 14px; margin: 0 0 8px;">— Mo, Founder of AI Finance Ops</p>
        <a href="https://aifinanceops.app" style="color: #10b981; font-size: 14px; text-decoration: none;">aifinanceops.app</a>
      </div>
    </div>
  `
}
