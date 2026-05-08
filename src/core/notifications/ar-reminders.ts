import { db } from "@/db";
import { invoices } from "@/db/schema";
import { eq, lt, and, lte } from "drizzle-orm";
import { MAX_REMINDER_COUNT } from "@/lib/constants";
import { logger } from "@/lib/logger";

export async function sendArReminders(): Promise<number> {
  const today = new Date().toISOString().split("T")[0]!;

  const overdueInvoices = await db.query.invoices.findMany({
    where: and(
      eq(invoices.status, "sent"),
      lt(invoices.dueDate, today),
      lte(invoices.remindersSent, MAX_REMINDER_COUNT - 1)
    ),
  });

  let sentCount = 0;

  for (const invoice of overdueInvoices) {
    try {
      await db
        .update(invoices)
        .set({
          status: "overdue",
          remindersSent: invoice.remindersSent + 1,
        })
        .where(eq(invoices.id, invoice.id));

      logger.info(
        { invoiceId: invoice.id, customerEmail: invoice.customerEmail },
        "Invoice marked as overdue"
      );

      sentCount++;
    } catch (err) {
      logger.error({ err, invoiceId: invoice.id }, "Failed to process reminder");
    }
  }

  return sentCount;
}
