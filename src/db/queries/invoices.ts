import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq, desc, asc, and, lt, gte } from "drizzle-orm";

export async function getInvoices(
  userId: string,
  options?: {
    status?: string;
    sortBy?: "dueDate" | "amountCents";
    sortOrder?: "asc" | "desc";
    limit?: number;
    offset?: number;
  }
) {
  const { status, sortBy = "dueDate", sortOrder = "desc", limit = 50, offset = 0 } = options ?? {};

  const conditions = [eq(invoices.userId, userId)];
  if (status) {
    conditions.push(eq(invoices.status, status as "draft" | "sent" | "paid" | "overdue"));
  }

  const orderBy =
    sortOrder === "asc"
      ? asc(invoices[sortBy])
      : desc(invoices[sortBy]);

  return db.query.invoices.findMany({
    where: and(...conditions),
    orderBy,
    limit,
    offset,
  });
}

export async function getOverdueInvoices(userId: string) {
  const today = new Date().toISOString().split("T")[0]!;

  return db.query.invoices.findMany({
    where: and(
      eq(invoices.userId, userId),
      eq(invoices.status, "overdue")
    ),
    orderBy: [desc(invoices.dueDate)],
  });
}

export async function getInvoiceStats(userId: string) {
  const allInvoices = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
  });

  const stats = {
    total: allInvoices.length,
    draft: 0,
    sent: 0,
    paid: 0,
    overdue: 0,
    totalAmountCents: 0,
    overdueAmountCents: 0,
  };

  for (const inv of allInvoices) {
    stats.totalAmountCents += inv.amountCents;
    if (inv.status === "draft") stats.draft++;
    if (inv.status === "sent") stats.sent++;
    if (inv.status === "paid") stats.paid++;
    if (inv.status === "overdue") {
      stats.overdue++;
      stats.overdueAmountCents += inv.amountCents;
    }
  }

  return stats;
}
