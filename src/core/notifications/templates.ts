import { formatCurrency } from "@/lib/utils";

export function getReminderEmailTemplate(
  amountCents: number,
  dueDate: string
): string {
  const formattedAmount = formatCurrency(amountCents);
  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <tr>
      <td style="background: #1e40af; color: #ffffff; padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Finance Copilot</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="margin: 0 0 16px; font-size: 20px; color: #111827;">Payment Reminder</h2>
        <p style="color: #6b7280; line-height: 1.6; margin: 0 0 24px;">
          This is a friendly reminder that an invoice is now overdue.
        </p>
        <table width="100%" cellpadding="12" cellspacing="0" style="background: #f9fafb; border-radius: 6px; margin-bottom: 24px;">
          <tr>
            <td style="color: #6b7280; font-size: 14px;">Amount Due</td>
            <td style="color: #111827; font-size: 16px; font-weight: 600; text-align: right;">${formattedAmount}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; font-size: 14px;">Due Date</td>
            <td style="color: #111827; font-size: 16px; font-weight: 600; text-align: right;">${formattedDate}</td>
          </tr>
        </table>
        <p style="color: #6b7280; line-height: 1.6; margin: 0;">
          Please process this payment at your earliest convenience. If you have already paid, please disregard this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="background: #f9fafb; padding: 24px; text-align: center; color: #9ca3af; font-size: 12px;">
        Powered by AI Finance Ops Copilot
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
