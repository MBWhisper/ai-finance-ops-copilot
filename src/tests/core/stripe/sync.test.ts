import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/db", () => ({
  db: {
    query: {
      stripeAccounts: {
        findFirst: vi.fn(),
      },
    },
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
        onConflictDoNothing: vi.fn().mockResolvedValue(undefined),
      }),
    }),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    }),
  },
}));

vi.mock("@/lib/crypto", () => ({
  decrypt: vi.fn((key) => `decrypted_${key}`),
}));

const mockSubscriptionsList = vi.fn().mockResolvedValue({
  data: [
    {
      status: "active",
      items: {
        data: [
          {
            price: {
              unit_amount: 9900,
              recurring: { interval: "month" },
            },
          },
        ],
      },
    },
  ],
});

const mockInvoicesList = vi.fn().mockResolvedValue({
  data: [],
});

vi.mock("@/core/stripe/client", () => ({
  getStripeClient: vi.fn(() => ({
    subscriptions: {
      list: mockSubscriptionsList,
    },
    invoices: {
      list: mockInvoicesList,
    },
  })),
}));

vi.mock("@/lib/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe("stripe.sync", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscriptionsList.mockResolvedValue({
      data: [
        {
          status: "active",
          items: {
            data: [
              {
                price: {
                  unit_amount: 9900,
                  recurring: { interval: "month" },
                },
              },
            ],
          },
        },
      ],
    });
    mockInvoicesList.mockResolvedValue({ data: [] });
  });

  it("throws when no stripe account linked", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.stripeAccounts.findFirst).mockResolvedValue(undefined as never);

    const { syncStripeData } = await import("@/core/stripe/sync");
    await expect(syncStripeData("user-1")).rejects.toThrow(
      "No Stripe account linked"
    );
  });

  it("decrypts the stored access token", async () => {
    const { decrypt } = await import("@/lib/crypto");
    const { db } = await import("@/db");
    vi.mocked(db.query.stripeAccounts.findFirst).mockResolvedValue({
      id: "sa-1",
      userId: "user-1",
      stripeAccountId: null,
      accessToken: "encrypted-key",
      lastSyncAt: null,
      webhookSecret: null,
      createdAt: new Date(),
    } as never);

    const { syncStripeData } = await import("@/core/stripe/sync");
    await syncStripeData("user-1");

    expect(decrypt).toHaveBeenCalledWith("encrypted-key");
  });

  it("calculates MRR from monthly subscriptions", async () => {
    const { db } = await import("@/db");
    vi.mocked(db.query.stripeAccounts.findFirst).mockResolvedValue({
      id: "sa-2",
      userId: "user-2",
      stripeAccountId: null,
      accessToken: "key",
      lastSyncAt: null,
      webhookSecret: null,
      createdAt: new Date(),
    } as never);

    const { syncStripeData } = await import("@/core/stripe/sync");
    const result = await syncStripeData("user-2");

    expect(result.mrrCents).toBe(9900);
    expect(db.insert).toHaveBeenCalled();
  });
});
