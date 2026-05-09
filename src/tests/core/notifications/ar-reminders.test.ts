import { describe, it, expect, vi } from "vitest";

vi.mock("@/db", () => ({
  db: {
    query: {
      invoices: {
        findMany: vi.fn(),
      },
    },
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(),
      })),
    })),
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoUpdate: vi.fn(),
      })),
    })),
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: { info: vi.fn(), error: vi.fn() },
}));

import { sendArReminders } from "@/core/notifications/ar-reminders";

describe("sendArReminders", () => {
  it("returns 0 when no overdue invoices", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.invoices.findMany).mockResolvedValue([]);

    const result = await sendArReminders();
    expect(result).toBe(0);
  });

  it("sends reminders for overdue sent invoices", async () => {
    const { db } = await import("@/db");
    const overdueInvoice = {
      id: "inv_1",
      userId: "user_1",
      customerEmail: "test@example.com",
      amountCents: 5000,
      dueDate: "2026-01-01",
      status: "sent",
      remindersSent: 0,
      stripeInvoiceId: "stripe_inv_1",
      createdAt: new Date("2026-01-01"),
    };

    vi.mocked(db.query.invoices.findMany).mockResolvedValue([overdueInvoice]);

    const result = await sendArReminders();
    expect(result).toBe(1);
  });

  it("does not process invoices exceeding max reminder count", async () => {
    const { db } = await import("@/db");
    const maxedInvoice = {
      id: "inv_2",
      userId: "user_1",
      customerEmail: "test@example.com",
      amountCents: 5000,
      dueDate: "2026-01-01",
      status: "sent",
      remindersSent: 3,
      stripeInvoiceId: "stripe_inv_2",
      createdAt: new Date("2026-01-01"),
    };

    vi.mocked(db.query.invoices.findMany).mockResolvedValue([]);

    const result = await sendArReminders();
    expect(result).toBe(0);
  });
});
