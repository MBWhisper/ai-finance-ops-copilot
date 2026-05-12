'use server'

export async function getCustomerPortalUrl(subscriptionId: string): Promise<string | null> {
  try {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY
    if (!apiKey) {
      console.error('[BILLING_ACTION] Missing LEMONSQUEEZY_API_KEY')
      return null
    }

    const res = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!res.ok) {
      console.error('[BILLING_ACTION] LS API error', res.status)
      return null
    }

    const data = await res.json()
    return data.data?.attributes?.urls?.customer_portal ?? null
  } catch (e) {
    console.error('[BILLING_ACTION] Failed to fetch portal URL', e)
    return null
  }
}
