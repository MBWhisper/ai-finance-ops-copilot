import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getInvoiceStats(userId: string) {
  const rows = await db.query.invoices.findMany({
    where: eq(invoices.userId, userId),
  });

  const total = rows.length;
  const paid = rows.filter((r) => r.status === "paid").length;
  const totalAmountCents = rows.reduce((sum, r) => sum + r.amountCents, 0);

  return { total, paid, totalAmountCents };
}
