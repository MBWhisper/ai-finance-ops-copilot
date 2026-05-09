export function buildReminderEmail(params: {
  customerEmail: string;
  invoiceNumber: string;
  amountCents: number;
  dueDate: string;
  daysOverdue: number;
}) {
  const { customerEmail, invoiceNumber, amountCents, dueDate, daysOverdue } = params;
  const amount = (amountCents / 100).toFixed(2);

  return {
    to: customerEmail,
    subject: `Payment Reminder: Invoice #${invoiceNumber} is ${daysOverdue} days overdue`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Payment Reminder</h2>
        <p>This is a friendly reminder that Invoice #${invoiceNumber} for <strong>$${amount}</strong> was due on <strong>${dueDate}</strong> and is now <strong>${daysOverdue} days overdue</strong>.</p>
        <p>Please make your payment at your earliest convenience to avoid any service interruption.</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This is an automated reminder from your Finance Ops dashboard.</p>
      </div>
    `,
  };
}
