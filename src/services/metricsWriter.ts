import { db } from '@/db';
import { metricsDaily, lemonSqueezyAccounts } from '@/db/schema';
import { getLemonSqueezyDashboardData } from '@/db/queries/lemon-squeezy';
import { logger } from '@/lib/logger';

/**
 * Reads synced LemonSqueezy data from DB and writes a daily metrics snapshot.
 * Called automatically after every successful LemonSqueezy sync.
 * Uses Option A: only writes columns that exist in the current schema.
 */
export async function writeMetricsFromLemonSqueezy(userId: string) {
  const data = await getLemonSqueezyDashboardData(userId);

  if (!data || data.activeSubscriptions === 0) {
    logger.info({ userId }, 'No active subscriptions — skipping metrics write');
    return null;
  }

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const mrrCents     = data.mrr;
  const arrCents     = mrrCents * 12;
  const churnRate    = data.churnRate.toString();

  // LTV = avg MRR per customer / monthly churn rate (as decimal)
  const avgMrr       = data.activeSubscriptions > 0
    ? Math.round(mrrCents / data.activeSubscriptions)
    : 0;
  const churnDecimal = data.churnRate / 100;
  const ltvCents     = churnDecimal > 0
    ? Math.round(avgMrr / churnDecimal)
    : 0;

  await db
    .insert(metricsDaily)
    .values({ userId, date: today, mrrCents, arrCents, churnRate, ltvCents })
    .onConflictDoUpdate({
      target: [metricsDaily.userId, metricsDaily.date],
      set: { mrrCents, arrCents, churnRate, ltvCents },
    });

  logger.info({ userId, mrrCents, arrCents, churnRate, ltvCents, today }, 'metricsDaily written ✓');
  return { userId, date: today, mrrCents, arrCents, churnRate, ltvCents };
}

/**
 * Iterates all LemonSqueezy accounts and writes metrics for each user.
 * Can be called from a standalone cron if needed.
 */
export async function writeMetricsForAllUsers() {
  const accounts = await db.query.lemonSqueezyAccounts.findMany();
  const results = [];

  for (const account of accounts) {
    try {
      const result = await writeMetricsFromLemonSqueezy(account.userId);
      results.push({ userId: account.userId, status: 'ok', result });
    } catch (err) {
      logger.error({ err, userId: account.userId }, 'Metrics write failed');
      results.push({ userId: account.userId, status: 'error', error: String(err) });
    }
  }

  return results;
}
