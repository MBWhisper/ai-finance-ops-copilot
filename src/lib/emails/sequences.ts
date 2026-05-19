import 'server-only';
import { Resend } from "resend";

function getClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY");
  return new Resend(key);
}

function getFrom(): string {
  return process.env.RESEND_FROM_EMAIL ?? "noreply@aifinanceops.app";
}

interface UserInfo {
  email: string;
  name?: string | null;
}

export async function sendWelcomeEmail(user: UserInfo) {
  const resend = getClient();
  const name = user.name ?? "there";
  return resend.emails.send({
    from: getFrom(),
    to: user.email,
    subject: "Welcome to AI Finance Ops 👋",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
        <div style="font-size: 32px; margin-bottom: 16px;">👋</div>
        <h1 style="color: #111; font-size: 24px; margin-bottom: 8px;">Welcome, ${name}!</h1>
        <p style="color: #555; line-height: 1.6; margin-bottom: 24px;">
          You've taken the first step toward financial clarity. AI Finance Ops will help you track MRR, forecast cash flow, and manage your SaaS finances — all in one place.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
          Start Onboarding →
        </a>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">Need help? Reply to this email or check our docs.</p>
      </div>
    `,
  });
}

export async function sendDay3Nudge(user: UserInfo) {
  const resend = getClient();
  const name = user.name ?? "there";
  return resend.emails.send({
    from: getFrom(),
    to: user.email,
    subject: "Your forecast is waiting...",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
        <div style="font-size: 32px; margin-bottom: 16px;">📊</div>
        <h1 style="color: #111; font-size: 24px; margin-bottom: 8px;">Hi ${name}, your forecast is waiting</h1>
        <p style="color: #555; line-height: 1.6; margin-bottom: 24px;">
          You signed up 3 days ago but haven't added any data yet. Add your first customer or connect your billing provider to see your personalized 90-day cash flow forecast.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
          Add Your First Customer →
        </a>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">Takes only 2 minutes. You've got this!</p>
      </div>
    `,
  });
}

export async function sendTrialEndingSoon(user: UserInfo) {
  const resend = getClient();
  const name = user.name ?? "there";
  return resend.emails.send({
    from: getFrom(),
    to: user.email,
    subject: "Your free trial ends in 2 days",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
        <div style="font-size: 32px; margin-bottom: 16px;">⏰</div>
        <h1 style="color: #111; font-size: 24px; margin-bottom: 8px;">Your trial ends in 2 days, ${name}</h1>
        <p style="color: #555; line-height: 1.6; margin-bottom: 24px;">
          Your 14-day free trial of AI Finance Ops is almost over. Upgrade now to keep your dashboard, forecasts, and AR management active.
        </p>
        <p style="color: #555; line-height: 1.6; margin-bottom: 24px;">
          <strong>What you'll lose:</strong> Real-time MRR tracking, 90-day cash flow forecasts, and automated AR reminders.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
          Upgrade Now →
        </a>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">Plans start at $29/mo. Cancel anytime.</p>
      </div>
    `,
  });
}

export async function sendTrialExpired(user: UserInfo) {
  const resend = getClient();
  const name = user.name ?? "there";
  return resend.emails.send({
    from: getFrom(),
    to: user.email,
    subject: "Your trial has ended",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
        <div style="font-size: 32px; margin-bottom: 16px;">😢</div>
        <h1 style="color: #111; font-size: 24px; margin-bottom: 8px;">Your trial has ended, ${name}</h1>
        <p style="color: #555; line-height: 1.6; margin-bottom: 24px;">
          Your 14-day free trial of AI Finance Ops has ended. But it's not too late — upgrade today and get <strong>20% off</strong> your first 3 months.
        </p>
        <p style="color: #555; line-height: 1.6; margin-bottom: 24px;">
          Use code: <strong style="background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">WELCOME20</strong>
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings/billing" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
          Upgrade with 20% Off →
        </a>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #999; font-size: 12px;">Offer valid for 7 days.</p>
      </div>
    `,
  });
}
