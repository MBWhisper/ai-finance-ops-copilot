import 'server-only';
import { Resend } from "resend";
import { db } from "@/db";
import { invoices } from "@/db/schema";
import { MAX_REMINDER_COUNT } from "@/lib/constants";
import { eq, and, lt, lte } from "drizzle-orm";
import { buildReminderEmail } from "./templates";
import { logger } from "@/lib/logger";

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  return new Resend(apiKey);
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "noreply@aifinanceops.app";
}

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
        (Date.now() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const email = buildReminderEmail({
        customerEmail: inv.customerEmail,
        invoiceNumber: inv.id.slice(0, 8),
        amountCents: inv.amountCents,
        dueDate: inv.dueDate,
        daysOverdue,
      });

      const resend = getResendClient();
      const { error } = await resend.emails.send({
        from: getFromEmail(),
        to: email.to,
        subject: email.subject,
        html: email.html,
      });

      if (error) {
        logger.error(
          { invoiceId: inv.id, to: email.to, error },
          "Resend rejected AR reminder"
        );
        continue;
      }

      await db
        .update(invoices)
        .set({ remindersSent: inv.remindersSent + 1 })
        .where(eq(invoices.id, inv.id));

      logger.info(
        { invoiceId: inv.id, to: email.to, subject: email.subject, daysOverdue },
        "AR reminder sent"
      );

      sentCount++;
    } catch (err) {
      logger.error({ err, invoiceId: inv.id }, "Failed to send AR reminder");
    }
  }

  logger.info({ sentCount, totalOverdue: overdueInvoices.length }, "AR reminders run complete");
  return sentCount;
}
