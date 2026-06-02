import { db } from "@/db";
import { paypalAccounts, paypalTransactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { decrypt, encrypt } from "@/lib/crypto";

const SANDBOX_BASE = "https://api-m.sandbox.paypal.com";
const LIVE_BASE = "https://api-m.paypal.com";
const SANDBOX_TOKEN_URL = "https://api-m.sandbox.paypal.com/v1/oauth2/token";
const LIVE_TOKEN_URL = "https://api-m.paypal.com/v1/oauth2/token";

function baseUrl(mode: string | null | undefined): string {
  return mode === "live" ? LIVE_BASE : SANDBOX_BASE;
}

function tokenUrl(mode: string | null | undefined): string {
  return mode === "live" ? LIVE_TOKEN_URL : SANDBOX_TOKEN_URL;
}

export interface PayPalTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface PayPalTransaction {
  transaction_info: {
    transaction_id: string;
    transaction_type: string;
    transaction_status: string;
    transaction_amount: { currency_code: string; value: string };
    fee_amount?: { currency_code: string; value: string };
    transaction_initiation_date: string;
  };
  payer_info?: {
    email_address?: string;
    payer_name?: { given_name?: string; surname?: string };
  };
  cart_info?: {
    item_details?: Array<{ item_name?: string }>;
  };
}

export interface PayPalTransactionsResponse {
  transaction_details: PayPalTransaction[];
  total_pages: number;
  page: number;
}

export interface PayPalInvoice {
  id: string;
  status: string;
  detail: {
    invoice_number?: string;
    invoice_date?: string;
    currency_code: string;
    payment_term?: { due_date?: string };
  };
  primary_recipients?: Array<{
    billing_info: {
      name?: { full_name?: string };
      email_address?: string;
    };
  }>;
  amount: { currency_code: string; value: string };
  due_amount?: { currency_code: string; value: string };
}

export interface PayPalInvoicesResponse {
  items?: PayPalInvoice[];
  total_pages?: number;
}

export interface PayPalSubscription {
  id: string;
  status: string;
  plan_id: string;
  start_time: string;
  subscriber: {
    name: { given_name: string; surname: string };
    email_address: string;
  };
  billing_info: {
    last_payment?: { amount: { currency_code: string; value: string }; time: string };
    next_billing_time?: string;
    failed_payments_count: number;
  };
}

export interface PayPalUserInfo {
  payer_id: string;
  email: string;
  name?: { given_name?: string; surname?: string };
}

async function requestAccessToken(clientId: string, clientSecret: string, mode: string): Promise<PayPalTokenResponse> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(tokenUrl(mode), {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    throw new Error(`PayPal auth error (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

function isTokenExpired(account: typeof paypalAccounts.$inferSelect): boolean {
  if (!account.tokenExpiresAt) return true;
  return new Date(account.tokenExpiresAt).getTime() - Date.now() < 60000;
}

export async function getAccessToken(accountId: string): Promise<string> {
  const row = await db.query.paypalAccounts.findFirst({
    where: eq(paypalAccounts.id, accountId),
  });
  if (!row) throw new Error("PayPal account not found");

  if (row.accessToken && !isTokenExpired(row)) {
    return row.accessToken;
  }

  const decryptedId = decrypt(row.clientId);
  const decryptedSecret = decrypt(row.clientSecret);
  const tokenRes = await requestAccessToken(decryptedId, decryptedSecret, row.mode ?? "sandbox");

  const expiresAt = new Date(Date.now() + tokenRes.expires_in * 1000);
  await db
    .update(paypalAccounts)
    .set({ accessToken: tokenRes.access_token, tokenExpiresAt: expiresAt })
    .where(eq(paypalAccounts.id, accountId));

  return tokenRes.access_token;
}

async function fetchPayPalApi<T>(
  accountId: string,
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const token = await getAccessToken(accountId);
  const row = await db.query.paypalAccounts.findFirst({
    where: eq(paypalAccounts.id, accountId),
  });
  if (!row) throw new Error("PayPal account not found");

  const query = params ? `?${new URLSearchParams(params)}` : "";
  const url = `${baseUrl(row.mode)}${path}${query}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get("Retry-After") ?? "5");
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
    return fetchPayPalApi<T>(accountId, path, params);
  }

  if (!res.ok) {
    throw new Error(`PayPal API error (${res.status}): ${await res.text()}`);
  }

  return res.json();
}

export async function validateCredentials(
  clientId: string,
  clientSecret: string,
  mode: string
): Promise<PayPalUserInfo> {
  const tokenRes = await requestAccessToken(clientId, clientSecret, mode);
  const res = await fetch(`${baseUrl(mode)}/v1/identity/oauth2/userinfo?schema=paypalv1.1`, {
    headers: { Authorization: `Bearer ${tokenRes.access_token}` },
  });
  if (!res.ok) throw new Error("Invalid PayPal credentials");
  const json = await res.json();
  return {
    payer_id: json.payer_id ?? "",
    email: json.emails?.[0]?.value ?? json.email ?? "",
    name: json.name,
  };
}

export async function fetchTransactions(
  accountId: string,
  startDate: string,
  endDate: string,
  page: number = 1
): Promise<PayPalTransactionsResponse> {
  return fetchPayPalApi<PayPalTransactionsResponse>(accountId, "/v1/reporting/transactions", {
    start_date: startDate,
    end_date: endDate,
    page: String(page),
    page_size: "100",
  });
}

export async function fetchInvoices(
  accountId: string,
  page: number = 1,
  pageSize: number = 20
): Promise<PayPalInvoicesResponse> {
  return fetchPayPalApi<PayPalInvoicesResponse>(accountId, "/v2/invoicing/invoices", {
    page: String(page),
    page_size: String(pageSize),
  });
}

export async function fetchSubscription(
  accountId: string,
  subscriptionId: string
): Promise<PayPalSubscription> {
  return fetchPayPalApi<PayPalSubscription>(accountId, `/v1/billing/subscriptions/${subscriptionId}`);
}

export async function getMonthlyRevenue(accountId: string): Promise<number> {
  const row = await db.query.paypalAccounts.findFirst({
    where: eq(paypalAccounts.id, accountId),
  });
  if (!row) return 0;

  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const startStr = startDate.toISOString();
  const endStr = now.toISOString();

  let total = 0;
  let page = 1;
  let totalPages = 1;
  do {
    const res = await fetchTransactions(accountId, startStr, endStr, page);
    for (const txn of res.transaction_details ?? []) {
      const txnStatus = txn.transaction_info.transaction_status;
      if (txnStatus === "S") {
        total += Math.round(parseFloat(txn.transaction_info.transaction_amount.value) * 100);
      }
    }
    totalPages = res.total_pages ?? 1;
    page++;
  } while (page <= totalPages);

  return total;
}

export async function getTotalRevenue(accountId: string): Promise<number> {
  const rows = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, accountId),
  });
  return rows
    .filter((t) => t.status === "S")
    .reduce((sum, t) => sum + (t.netAmount ?? t.amount ?? 0), 0);
}

export async function getRefundsTotal(accountId: string): Promise<number> {
  const rows = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, accountId),
  });
  return rows
    .filter((t) => t.status === "F" || t.status === "D")
    .reduce((sum, t) => sum + Math.abs(t.amount ?? 0), 0);
}
