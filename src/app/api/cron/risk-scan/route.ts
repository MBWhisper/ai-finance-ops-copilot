import { NextResponse } from "next/server";
import { db } from "@/db";
import { invoices } from "@/db/schema/invoices";
import { subscriptions } from "@/db/schema/subscriptions";
import { metricsDaily } from "@/db/schema/metrics-daily";
import { and, eq, lt, gte, lte, sql } from "drizzle-orm";
import { logger } from "@/lib/logger";
import * as Sentry from '@sentry/nextjs';

type RiskItem = {
  type: 'overdue_invoice' | 'payment_failed' | 'churn_signal' | 'trial_ending';
  severity: 'critical' | 'warning';
  message: string;
  recordId?: string;
  meta?: Record<string, unknown>;
};

type RiskScanResult = {
  scannedAt: string;
  critical: RiskItem[];
  warnings: RiskItem[];
  summary: { criticalCount: number; warningCount: number };
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result: RiskScanResult = {
    scannedAt: new Date().toISOString(),
    critical: [],
    warnings: [],
    summary: { criticalCount: 0, warningCount: 0 },
  };

  const today = new Date().toISOString().split('T')[0];
  const threeDaysFromNow = new Date(Date.now() + 3 * 86400000);

  // 1. Overdue invoices
  try {
    const overdueInvoices = await db.query.invoices.findMany({
      where: and(
        lt(invoices.dueDate, today),
        sql`${invoices.status} != 'paid'`,
      ),
    });
    for (const inv of overdueInvoices) {
      result.critical.push({
        type: 'overdue_invoice',
        severity: 'critical',
        message: `Invoice ${inv.id.slice(0, 8)} for $${(inv.amountCents / 100).toFixed(2)} is overdue (due ${inv.dueDate}).`,
        recordId: inv.id,
        meta: { userId: inv.userId, amountCents: inv.amountCents, dueDate: inv.dueDate },
      });
    }
  } catch (err) {
    logger.error({ err }, "[RISK-SCAN] Failed to query overdue invoices");
    Sentry.addBreadcrumb({ category: 'risk-scan', message: 'Overdue invoice query failed', level: 'error' });
  }

  // 2. Payment failures (past_due subscriptions)
  try {
    const pastDueSubs = await db.query.subscriptions.findMany({
      where: eq(subscriptions.status, 'past_due'),
    });
    for (const sub of pastDueSubs) {
      result.critical.push({
        type: 'payment_failed',
        severity: 'critical',
        message: `Subscription ${sub.plan} payment failed for user ${sub.userId.slice(0, 8)}.`,
        recordId: sub.id,
        meta: { userId: sub.userId, plan: sub.plan },
      });
    }
  } catch (err) {
    logger.error({ err }, "[RISK-SCAN] Failed to query past-due subscriptions");
    Sentry.addBreadcrumb({ category: 'risk-scan', message: 'Past-due subscription query failed', level: 'error' });
  }

  // 3. High churn signal (MRR dropped >10% between last two metrics_daily records)
  try {
    const userIds = await db
      .select({ userId: metricsDaily.userId })
      .from(metricsDaily)
      .groupBy(metricsDaily.userId);

    for (const { userId } of userIds) {
      const records = await db.query.metricsDaily.findMany({
        where: eq(metricsDaily.userId, userId),
        orderBy: (m) => [m.date],
        limit: 2,
      });
      if (records.length < 2) continue;
      const [older, newer] = records;
      const olderMrr = older.mrrCents;
      const newerMrr = newer.mrrCents;
      if (olderMrr > 0 && newerMrr < olderMrr * 0.9) {
        const dropPct = Math.round((1 - newerMrr / olderMrr) * 100);
        result.warnings.push({
          type: 'churn_signal',
          severity: 'warning',
          message: `MRR dropped ${dropPct}% for user ${userId.slice(0, 8)} (from $${(olderMrr / 100).toFixed(0)} to $${(newerMrr / 100).toFixed(0)}).`,
          recordId: userId,
          meta: { userId, olderMrrCents: olderMrr, newerMrrCents: newerMrr, dropPercent: dropPct },
        });
      }
    }
  } catch (err) {
    logger.error({ err }, "[RISK-SCAN] Failed to query churn signals");
    Sentry.addBreadcrumb({ category: 'risk-scan', message: 'Churn signal query failed', level: 'error' });
  }

  // 4. Trials ending soon (ends_at < now + 3 days)
  try {
    const endingTrials = await db.query.subscriptions.findMany({
      where: and(
        eq(subscriptions.status, 'trialing'),
        lte(subscriptions.endsAt, threeDaysFromNow),
      ),
    });
    for (const sub of endingTrials) {
      const endsAt = sub.endsAt ? new Date(sub.endsAt).toLocaleDateString() : 'unknown';
      result.warnings.push({
        type: 'trial_ending',
        severity: 'warning',
        message: `Trial ending ${endsAt} for user ${sub.userId.slice(0, 8)} (plan: ${sub.plan}).`,
        recordId: sub.id,
        meta: { userId: sub.userId, plan: sub.plan, endsAt: sub.endsAt },
      });
    }
  } catch (err) {
    logger.error({ err }, "[RISK-SCAN] Failed to query ending trials");
    Sentry.addBreadcrumb({ category: 'risk-scan', message: 'Trial ending query failed', level: 'error' });
  }

  result.summary.criticalCount = result.critical.length;
  result.summary.warningCount = result.warnings.length;

  Sentry.addBreadcrumb({
    category: 'risk-scan',
    message: `Scan complete: ${result.summary.criticalCount} critical, ${result.summary.warningCount} warnings`,
    level: 'info',
    data: result.summary,
  });

  logger.info({ criticalCount: result.summary.criticalCount, warningCount: result.summary.warningCount }, "[RISK-SCAN] Scan complete");
  return NextResponse.json(result);
}
