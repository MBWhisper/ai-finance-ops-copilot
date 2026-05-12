import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq, lt, gte, isNull } from 'drizzle-orm';
import {
  sendWelcomeEmail,
  sendDay3Nudge,
  sendTrialEndingSoon,
  sendTrialExpired,
} from '@/lib/emails/sequences';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let sent = { welcome: 0, nudge: 0, trialEnding: 0, trialExpired: 0 };

  try {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    const twoDaysFromNow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const allUsers = await db.select().from(users);

    for (const user of allUsers) {
      try {
        const createdAt = new Date(user.createdAt);
        const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000));

        // Welcome email: send on day 0 (just signed up)
        if (diffDays === 0) {
          await sendWelcomeEmail({ email: user.email, name: user.name });
          sent.welcome++;
        }

        // Day 3 nudge: if still on free plan with no onboarding
        if (diffDays === 3 && user.plan === 'free' && !user.onboardingCompleted) {
          await sendDay3Nudge({ email: user.email, name: user.name });
          sent.nudge++;
        }

        // Trial ending soon: 2 days before trial ends
        if (user.trialEndsAt) {
          const trialEnd = new Date(user.trialEndsAt);
          const diffToTrialEnd = Math.ceil((trialEnd.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

          if (diffToTrialEnd === 2) {
            await sendTrialEndingSoon({ email: user.email, name: user.name });
            sent.trialEnding++;
          }

          // Trial expired: 1 day after trial ends
          if (diffToTrialEnd === -1) {
            await sendTrialExpired({ email: user.email, name: user.name });
            sent.trialExpired++;
          }
        }
      } catch {
        // continue to next user on error
      }
    }

    return NextResponse.json({ ok: true, sent });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process email sequences' }, { status: 500 });
  }
}
