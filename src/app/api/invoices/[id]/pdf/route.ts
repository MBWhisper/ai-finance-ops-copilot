import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { invoices } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { generateInvoicePdf } from '@/lib/invoice-pdf';
import { logger } from '@/lib/logger';

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const invoice = await db.query.invoices.findFirst({
      where: eq(invoices.id, params.id),
    });

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }

    const pdfBytes = await generateInvoicePdf({
      invoiceNumber: invoice.id.slice(0, 8),
      customerName: invoice.customerEmail.split('@')[0] || invoice.customerEmail,
      customerEmail: invoice.customerEmail,
      amountCents: invoice.amountCents,
      currency: 'USD',
      issueDate: invoice.createdAt?.toISOString().split('T')[0] ?? invoice.dueDate,
      dueDate: invoice.dueDate,
      status: invoice.status,
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${invoice.id.slice(0, 8)}.pdf"`,
      },
    });
  } catch (err) {
    logger.error({ err, invoiceId: params.id }, 'Failed to generate invoice PDF');
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
