/**
 * submit-all-urls.mjs
 * Submits every public URL to /api/index-url after a deploy.
 *
 * Usage:
 *   PING_SECRET=your_secret node scripts/submit-all-urls.mjs
 *
 * Or add to package.json scripts:
 *   "submit-urls": "node scripts/submit-all-urls.mjs"
 */

const BASE = 'https://aifinanceops.app'
const SECRET = process.env.PING_SECRET

if (!SECRET) {
  console.error('PING_SECRET env var is required')
  process.exit(1)
}

const URLS = [
  `${BASE}/`,
  `${BASE}/blog`,
  `${BASE}/pricing`,
  `${BASE}/mrr-calculator`,
  `${BASE}/churn-rate-calculator`,
  `${BASE}/ltv-calculator`,
  `${BASE}/arr-calculator`,
  `${BASE}/runway-calculator`,
  // Blog posts
  `${BASE}/blog/arr-vs-mrr-difference`,
  `${BASE}/blog/baremetrics-alternative-2026`,
  `${BASE}/blog/chartmogul-alternative-2026`,
  `${BASE}/blog/how-many-months-of-runway-do-i-have`,
  `${BASE}/blog/how-to-calculate-saas-mrr`,
  `${BASE}/blog/how-to-reduce-saas-churn`,
  `${BASE}/blog/ltv-cac-ratio-saas`,
  `${BASE}/blog/mrr-dashboard-guide`,
  `${BASE}/blog/net-revenue-retention-saas`,
  `${BASE}/blog/paypal-mrr-tracking`,
  `${BASE}/blog/saas-burn-rate-guide`,
  `${BASE}/blog/saas-cash-flow-management`,
  `${BASE}/blog/saas-churn-rate-guide`,
  `${BASE}/blog/saas-financial-metrics`,
  `${BASE}/blog/startup-runway-calculator`,
  `${BASE}/blog/stripe-mrr-tracking`,
]

async function submit(url) {
  const res = await fetch(`${BASE}/api/index-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, secret: SECRET }),
  })
  const data = await res.json()
  const status = res.ok ? '✅' : '⚠️'
  console.log(`${status} ${url}`, JSON.stringify(data?.result ?? data?.message ?? ''))
}

console.log(`Submitting ${URLS.length} URLs to Google Indexing API...\n`)
for (const url of URLS) {
  await submit(url)
  await new Promise(r => setTimeout(r, 200)) // gentle rate limit
}
console.log('\nDone.')
