const LS_API_BASE = "https://api.lemonsqueezy.com/v1";

export interface LemonOrder {
  id: string;
  attributes: {
    order_number: number;
    total: number;
    currency: string;
    status: string;
    created_at: string;
    customer_name: string;
    customer_email: string;
    first_order_item: {
      product_name: string;
      variant_name: string;
    };
  };
}

export interface LemonSubscription {
  id: string;
  attributes: {
    status: string;
    customer_id: string;
    product_name: string;
    variant_name: string;
    billing_anchor: number;
    created_at: string;
    renews_at: string;
    ends_at: string | null;
    cancelled: boolean;
    mrr: number;
    currency: string;
  };
}

export interface LemonCustomer {
  id: string;
  attributes: {
    name: string;
    email: string;
    status: string;
    created_at: string;
  };
}

interface LsListResponse<T> {
  data: T[];
  meta?: {
    page?: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
}

async function fetchLsApi<T>(
  apiKey: string,
  path: string,
  params?: Record<string, string>
): Promise<T[]> {
  const allItems: T[] = [];
  let page = 1;
  let lastPage = 1;

  do {
    const query = new URLSearchParams({ ...params, "page[size]": "100", "page[number]": String(page) });
    const url = `${LS_API_BASE}${path}?${query}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (res.status === 429) {
      const retryAfter = Number(res.headers.get("Retry-After") ?? "5");
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      continue;
    }

    if (!res.ok) {
      throw new Error(`Lemon Squeezy API error (${res.status}): ${await res.text()}`);
    }

    const json: LsListResponse<T> = await res.json();
    allItems.push(...json.data);
    lastPage = json.meta?.page?.last_page ?? 1;
    page++;
  } while (page <= lastPage);

  return allItems;
}

export async function getLemonSqueezyOrders(apiKey: string): Promise<LemonOrder[]> {
  return fetchLsApi<LemonOrder>(apiKey, "/orders");
}

export async function getLemonSqueezySubscriptions(apiKey: string): Promise<LemonSubscription[]> {
  return fetchLsApi<LemonSubscription>(apiKey, "/subscriptions");
}

export async function getLemonSqueezyCustomers(apiKey: string): Promise<LemonCustomer[]> {
  return fetchLsApi<LemonCustomer>(apiKey, "/customers");
}

export async function getLemonSqueezyMRR(apiKey: string): Promise<number> {
  const subs = await getLemonSqueezySubscriptions(apiKey);
  return subs
    .filter((s) => s.attributes.status === "active" || s.attributes.status === "trial")
    .reduce((sum, s) => sum + s.attributes.mrr, 0);
}

export async function getLemonSqueezyRevenue(apiKey: string): Promise<number> {
  const orders = await getLemonSqueezyOrders(apiKey);
  return orders
    .filter((o) => o.attributes.status === "paid")
    .reduce((sum, o) => sum + o.attributes.total, 0);
}

export async function getLemonSqueezyChurn(apiKey: string): Promise<number> {
  const subs = await getLemonSqueezySubscriptions(apiKey);
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const activeAtStart = subs.filter(
    (s) =>
      (s.attributes.status === "active" || s.attributes.status === "trial") &&
      new Date(s.attributes.created_at) < startOfMonth
  );
  const cancelledThisMonth = subs.filter(
    (s) =>
      s.attributes.cancelled &&
      s.attributes.ends_at &&
      new Date(s.attributes.ends_at) >= startOfMonth &&
      new Date(s.attributes.ends_at) <= now
  );
  if (activeAtStart.length === 0) return 0;
  return (cancelledThisMonth.length / activeAtStart.length) * 100;
}

export async function validateLemonSqueezyKey(apiKey: string): Promise<{ valid: boolean; storeName?: string; storeId?: string }> {
  const res = await fetch(`${LS_API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) return { valid: false };
  const json = await res.json();
  const name: string | undefined = json.data?.attributes?.name;
  return { valid: true, storeName: name, storeId: json.data?.id };
}
