# Google Search Console Indexing Action Plan

## Current Status (Aug 8, 2026)
- **Indexed:** 25-26 pages
- **Discovered, not indexed:** 54 pages
- **Total in sitemap:** 77 URLs
- **Impressions:** ~30-50/day (low because only 25 pages indexed)

## Root Cause
Google discovered 54 pages but chose not to index them. Most common reasons:
1. **Thin content** — Pages with insufficient unique content
2. **Duplicate/similar content** — Pages competing with each other
3. **Low topical authority** — Site is too new (June 2026)

## Priority 1: Submit Key Pages for Indexing (Do this NOW)

Go to Google Search Console → URL Inspection → Enter URL → Request Indexing

Submit these 15 pages FIRST (highest SEO value):

1. https://aifinanceops.app/what-is-mrr
2. https://aifinanceops.app/saas-benchmarks-2026
3. https://aifinanceops.app/saas-financial-dashboard
4. https://aifinanceops.app/chartmogul-alternative
5. https://aifinanceops.app/profitwell-alternative
6. https://aifinanceops.app/stripe-dashboard-alternative
7. https://aifinanceops.app/mrr-calculator
8. https://aifinanceops.app/churn-rate-calculator
9. https://aifinanceops.app/ltv-calculator
10. https://aifinanceops.app/runway-calculator
11. https://aifinanceops.app/vs-baremetrics
12. https://aifinanceops.app/vs-chartmogul
13. https://aifinanceops.app/baremetrics-alternative
14. https://aifinanceops.app/stripe-mrr-dashboard
15. https://aifinanceops.app/saas-cash-flow-forecast

## Priority 2: Pages Likely NOT Indexed (Improve Content)

These pages are probably thin or similar to others:

### Calculator pages (may be too similar)
- /mrr-calculator vs /mrr-tracker — similar topic
- /churn-rate-calculator vs /churn-calculator — similar topic
- /ltv-calculator — standalone
- /runway-calculator — standalone
- /cash-flow-tracker — standalone

### Landing pages (may be thin)
- /ai-finance-bootstrapped-startups — may be thin
- /automate-reporting — may be thin
- /vs-recurly — may be thin

### Blog posts (45 posts — some may be thin)
Check which blog posts have <500 words and improve them.

## Priority 3: Fix Redirect Issues

The 2 redirect pages in GSC are likely:
- /signup → /register (307)
- /sign-in → /login (307)

These are already blocked in robots.txt. No action needed.

## Priority 4: Monitor Progress

After submitting pages for indexing:
1. Wait 3-7 days for Google to process
2. Check GSC Coverage report weekly
3. Target: 50+ indexed pages within 30 days
4. Target: 100+ impressions/day within 60 days

## How to Use GSC URL Inspection

1. Open Google Search Console
2. Click "URL Inspection" in the left sidebar
3. Enter the URL
4. Click "Request Indexing"
5. Wait for confirmation
6. Repeat for each URL (max 10-12 per day)
