import { db } from "@/db";
import {
  lemonSqueezyAccounts,
  lemonSqueezyOrders,
  lemonSqueezySubscriptions,
  lemonSqueezyCustomers,
} from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function getLemonSqueezyAccount(userId: string) {
  const row = await db.query.lemonSqueezyAccounts.findFirst({
    where: eq(lemonSqueezyAccounts.userId, userId),
  });
  return row ?? null;
}

export async function upsertLemonSqueezyAccount(
  userId: string,
  apiKey: string,
  storeName?: string,
  storeId?: string
) {
  const existing = await db.query.lemonSqueezyAccounts.findFirst({
    where: eq(lemonSqueezyAccounts.userId, userId),
  });

  if (existing) {
    await db
      .update(lemonSqueezyAccounts)
      .set({ apiKey, storeName, storeId, lastSyncAt: null })
      .where(eq(lemonSqueezyAccounts.userId, userId));
  } else {
    await db
      .insert(lemonSqueezyAccounts)
      .values({ userId, apiKey, storeName, storeId });
  }
}

export async function deleteLemonSqueezyAccount(userId: string) {
  await db
    .delete(lemonSqueezyOrders)
    .where(eq(lemonSqueezyOrders.userId, userId));
  await db
    .delete(lemonSqueezySubscriptions)
    .where(eq(lemonSqueezySubscriptions.userId, userId));
  await db
    .delete(lemonSqueezyCustomers)
    .where(eq(lemonSqueezyCustomers.userId, userId));
  await db
    .delete(lemonSqueezyAccounts)
    .where(eq(lemonSqueezyAccounts.userId, userId));
}

export async function updateLemonSqueezySyncTime(userId: string) {
  await db
    .update(lemonSqueezyAccounts)
    .set({ lastSyncAt: new Date() })
    .where(eq(lemonSqueezyAccounts.userId, userId));
}

export async function getLemonSqueezyDashboardData(userId: string) {
  const subs = await db.query.lemonSqueezySubscriptions.findMany({
    where: eq(lemonSqueezySubscriptions.userId, userId),
  });

  const activeSubs = subs.filter(
    (s) => s.status === "active" || s.status === "trial"
  );
  const cancelledSubs = subs.filter((s) => s.status === "cancelled");
  const totalMrr = activeSubs.reduce((sum, s) => sum + s.mrr, 0);

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const subsActiveLastMonth = subs.filter(
    (s) =>
      (s.status === "active" || s.status === "trial") &&
      new Date(s.createdAt) < startOfMonth
  );
  const subsActiveTwoMonthsAgo = subs.filter(
    (s) =>
      (s.status === "active" || s.status === "trial") &&
      new Date(s.createdAt) < startOfLastMonth
  );

  const cancelledThisMonth = subs.filter(
    (s) =>
      s.status === "cancelled" &&
      s.endsAt &&
      new Date(s.endsAt) >= startOfMonth &&
      new Date(s.endsAt) <= now
  );
  const cancelledLastMonth = subs.filter(
    (s) =>
      s.status === "cancelled" &&
      s.endsAt &&
      new Date(s.endsAt) >= startOfLastMonth &&
      new Date(s.endsAt) < startOfMonth
  );

  const orders = await db.query.lemonSqueezyOrders.findMany({
    where: eq(lemonSqueezyOrders.userId, userId),
  });

  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.total, 0);

  const customers = await db.query.lemonSqueezyCustomers.findMany({
    where: eq(lemonSqueezyCustomers.userId, userId),
  });

  const newCustomersThisMonth = customers.filter(
    (c) => new Date(c.createdAt) >= startOfMonth
  );
  const newCustomersLastMonth = customers.filter(
    (c) =>
      new Date(c.createdAt) >= startOfLastMonth &&
      new Date(c.createdAt) < startOfMonth
    );

  const churnRate =
    subsActiveLastMonth.length > 0
      ? (cancelledThisMonth.length / subsActiveLastMonth.length) * 100
      : 0;
  const prevChurnRate =
    subsActiveTwoMonthsAgo.length > 0
      ? (cancelledLastMonth.length / subsActiveTwoMonthsAgo.length) * 100
      : 0;

  const prevMrr = activeSubs.length > 0
    ? subs
        .filter((s) => new Date(s.createdAt) < startOfMonth)
        .filter((s) => s.status === "active" || s.status === "trial")
        .reduce((sum, s) => sum + s.mrr, 0)
    : 0;

  return {
    mrr: totalMrr,
    prevMrr,
    activeSubscriptions: activeSubs.length,
    totalRevenue,
    churnRate: Math.round(churnRate * 10) / 10,
    prevChurnRate: Math.round(prevChurnRate * 10) / 10,
    newCustomersThisMonth: newCustomersThisMonth.length,
    newCustomersLastMonth: newCustomersLastMonth.length,
    cancelledThisMonth: cancelledThisMonth.length,
    totalCustomers: customers.length,
    totalOrders: paidOrders.length,
    lastSyncAt: (await getLemonSqueezyAccount(userId))?.lastSyncAt?.toISOString() ?? null,
  };
}

export async function getLemonSqueezyMonthlyRevenue(
  userId: string,
  months: number = 12
): Promise<{ month: string; revenue: number; mrr: number }[]> {
  const orders = await db.query.lemonSqueezyOrders.findMany({
    where: eq(lemonSqueezyOrders.userId, userId),
  });
  const subs = await db.query.lemonSqueezySubscriptions.findMany({
    where: eq(lemonSqueezySubscriptions.userId, userId),
  });

  const result: { month: string; revenue: number; mrr: number }[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthStr = monthStart.toISOString().slice(0, 7);

    const monthRevenue = orders
      .filter((o) => {
        const d = new Date(o.createdAt);
        return o.status === "paid" && d >= monthStart && d < monthEnd;
      })
      .reduce((sum, o) => sum + o.total, 0);

    const monthMrr = subs
      .filter((s) => {
        const d = new Date(s.createdAt);
        return (
          (s.status === "active" || s.status === "trial") && d < monthEnd
        );
      })
      .reduce((sum, s) => sum + s.mrr, 0);

    result.push({ month: monthStr, revenue: Math.round(monthRevenue / 100), mrr: Math.round(monthMrr / 100) });
  }

  return result;
}

export async function getLemonSqueezyTopProducts(
  userId: string,
  limit: number = 10
): Promise<{ product: string; revenue: number }[]> {
  const orders = await db.query.lemonSqueezyOrders.findMany({
    where: eq(lemonSqueezyOrders.userId, userId),
  });

  const grouped: Record<string, number> = {};
  for (const o of orders) {
    if (o.status !== "paid") continue;
    const name = o.productName ?? "Unknown";
    grouped[name] = (grouped[name] ?? 0) + o.total;
  }

  return Object.entries(grouped)
    .map(([product, revenue]) => ({ product, revenue: Math.round(revenue / 100) }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, limit);
}

export async function getLemonSqueezySubscriptionStatusBreakdown(userId: string) {
  const subs = await db.query.lemonSqueezySubscriptions.findMany({
    where: eq(lemonSqueezySubscriptions.userId, userId),
  });

  const counts: Record<string, number> = {};
  for (const s of subs) {
    const status = s.status;
    counts[status] = (counts[status] ?? 0) + 1;
  }

  const total = subs.length;
  return Object.entries(counts).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));
}

export async function getLemonSqueezyOrdersPaginated(
  userId: string,
  page: number = 1,
  perPage: number = 20
) {
  const offset = (page - 1) * perPage;
  const items = await db.query.lemonSqueezyOrders.findMany({
    where: eq(lemonSqueezyOrders.userId, userId),
    orderBy: (o, { desc }) => [desc(o.createdAt)],
    limit: perPage,
    offset,
  });
  const [totalRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(lemonSqueezyOrders)
    .where(eq(lemonSqueezyOrders.userId, userId));
  const total = totalRow?.count ?? 0;
  return { items, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}
