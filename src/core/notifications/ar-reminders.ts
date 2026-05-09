import { db } from "@/db";
import { invoices } from "@/db/schema";
import { MAX_REMINDER_COUNT } from "@/lib/constants";
import { eq, and, lt, lte } from "drizzle-orm";
import { buildReminderEmail } from "./templates";
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

  for (const inv of overdueInvoices) {
    try {
      const dueDate = new Date(inv.dueDate);
      const daysOverdue = Math.floor(
        (new Date().getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const email = buildReminderEmail({
        customerEmail: inv.customerEmail,
        invoiceNumber: inv.id.slice(0, 8),
        amountCents: inv.amountCents,
        dueDate: inv.dueDate,
        daysOverdue,
      });

      logger.info(
        { invoiceId: inv.id, to: email.to, subject: email.subject },
        "Sending AR reminder"
      );

      await db
        .update(invoices)
        .set({ remindersSent: inv.remindersSent + 1 })
        .where(eq(invoices.id, inv.id));

      sentCount++;
    } catch (err) {
      logger.error({ err, invoiceId: inv.id }, "Failed to send AR reminder");
    }
  }

  return sentCount;
}
