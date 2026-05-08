import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/db", () => ({
  db: {
    query: {
      invoices: {
        findMany: vi.fn(),
      },
    },
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    }),
  },
}));

vi.mock("@/lib/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe("notifications.ar-reminders.sendArReminders", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 0 when no overdue invoices", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.invoices.findMany).mockResolvedValue([]);

    const { sendArReminders } = await import("@/core/notifications/ar-reminders");
    const result = await sendArReminders();

    expect(result).toBe(0);
  });

  it("processes overdue invoices and increments reminder count", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.invoices.findMany).mockResolvedValue([
      {
        id: "inv-1",
        userId: "user-1",
        customerEmail: "test@example.com",
        amountCents: 9900,
        dueDate: "2026-04-01",
        status: "sent",
        stripeInvoiceId: null,
        remindersSent: 0,
        createdAt: new Date(),
      },
    ]);

    const { sendArReminders } = await import("@/core/notifications/ar-reminders");
    const result = await sendArReminders();

    expect(result).toBe(1);
  });

  it("skips invoices that already hit max reminders", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.invoices.findMany).mockResolvedValue([]);

    const { sendArReminders } = await import("@/core/notifications/ar-reminders");
    const result = await sendArReminders();

    expect(result).toBe(0);
  });
});
