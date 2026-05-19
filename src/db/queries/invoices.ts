import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import type { Invoice } from "@/lib/invoice-types";

export async function getInvoiceStats(userId: string) {
  const rows = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
  });

  const total = rows.length;
  const paid = rows.filter((r) => r.status === "paid").length;
  const totalAmountCents = rows.reduce((sum, r) => sum + r.amountCents, 0);

  return { total, paid, totalAmountCents };
}

export async function getAllInvoices(userId: string): Promise<Invoice[]> {
  const rows = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
    orderBy: (i) => [desc(i.dueDate)],
  });

  return rows.map((r) => {
    const createdStr = r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt ?? '')
    return {
      id: r.id,
      customerName: ((r.customerEmail ?? '').split('@')[0]) || r.customerEmail || '',
      customerEmail: r.customerEmail ?? '',
      amountCents: r.amountCents,
      currency: 'USD',
      issueDate: createdStr ? createdStr.split('T')[0] : (r.dueDate ?? ''),
      dueDate: r.dueDate ?? '',
      status: r.status === 'draft' || r.status === 'sent' || r.status === 'paid' || r.status === 'overdue'
        ? r.status : 'draft',
      remindersSent: r.remindersSent ?? 0,
      reminders: [],
      lineItems: [{ description: 'Invoice', quantity: 1, unitPriceCents: r.amountCents, totalCents: r.amountCents }],
      notes: '',
      stripeInvoiceId: r.stripeInvoiceId ?? null,
      paymentLink: null,
      paidAt: null,
      createdAt: createdStr,
      updatedAt: createdStr,
    }
  });
}
