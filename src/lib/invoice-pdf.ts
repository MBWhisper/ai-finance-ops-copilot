import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface PdfInvoiceData {
  invoiceNumber: string;
  companyName?: string;
  customerName: string;
  customerEmail: string;
  amountCents: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  status: string;
  notes?: string;
}

export async function generateInvoicePdf(data: PdfInvoiceData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([612, 792]);
  const { width, height } = page.getSize();
  let y = height - 50;

  // Header
  page.drawText(data.companyName ?? 'AI Finance Ops', { x: 50, y, size: 20, font: bold, color: rgb(0.13, 0.13, 0.13) });
  y -= 30;
  page.drawText('INVOICE', { x: 50, y, size: 14, font: bold, color: rgb(0.15, 0.40, 0.85) });
  y -= 20;

  // Separator
  page.drawLine({ start: { x: 50, y }, end: { x: 562, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
  y -= 20;

  // Invoice details
  const detailColor = rgb(0.4, 0.4, 0.4);
  page.drawText(`Invoice #${data.invoiceNumber}`, { x: 50, y, size: 11, font, color: detailColor });
  y -= 16;
  page.drawText(`Date Issued: ${data.issueDate}`, { x: 50, y, size: 11, font, color: detailColor });
  y -= 16;
  page.drawText(`Due Date: ${data.dueDate}`, { x: 50, y, size: 11, font, color: detailColor });
  y -= 16;
  page.drawText(`Status: ${data.status}`, { x: 50, y, size: 11, font, color: detailColor });
  y -= 30;

  // Bill To
  page.drawText('Bill To', { x: 50, y, size: 11, font: bold, color: rgb(0.13, 0.13, 0.13) });
  y -= 16;
  page.drawText(data.customerName, { x: 50, y, size: 11, font, color: detailColor });
  y -= 14;
  page.drawText(data.customerEmail, { x: 50, y, size: 10, font, color: detailColor });
  y -= 30;

  // Table header
  page.drawLine({ start: { x: 50, y }, end: { x: 562, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
  y -= 12;
  page.drawText('Description', { x: 50, y, size: 10, font: bold, color: rgb(0.13, 0.13, 0.13) });
  page.drawText('Amount', { x: 450, y, size: 10, font: bold, color: rgb(0.13, 0.13, 0.13) });
  y -= 12;
  page.drawLine({ start: { x: 50, y }, end: { x: 562, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
  y -= 14;

  // Line item
  const amount = (data.amountCents / 100).toFixed(2);
  page.drawText(`Invoice charge`, { x: 50, y, size: 11, font, color: detailColor });
  page.drawText(`${data.currency === 'USD' ? '$' : ''}${amount}`, { x: 450, y, size: 11, font: bold, color: detailColor });
  y -= 30;

  // Total
  page.drawLine({ start: { x: 50, y }, end: { x: 562, y }, thickness: 1, color: rgb(0.9, 0.9, 0.9) });
  y -= 14;
  page.drawText('Total', { x: 420, y, size: 12, font: bold, color: rgb(0.13, 0.13, 0.13) });
  page.drawText(`${data.currency === 'USD' ? '$' : ''}${amount}`, { x: 450, y, size: 12, font: bold, color: rgb(0.13, 0.13, 0.13) });

  // Notes
  if (data.notes) {
    y -= 40;
    page.drawText('Notes', { x: 50, y, size: 11, font: bold, color: rgb(0.13, 0.13, 0.13) });
    y -= 16;
    page.drawText(data.notes, { x: 50, y, size: 10, font, color: detailColor });
  }

  return doc.save();
}
