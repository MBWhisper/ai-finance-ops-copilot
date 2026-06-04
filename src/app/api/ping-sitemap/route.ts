import { NextResponse } from 'next/server'

// Called once after deploy to ping search engines with the updated sitemap.
// Trigger manually: GET /api/ping-sitemap?secret=YOUR_SECRET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (secret !== process.env.PING_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const SITEMAP = 'https://aifinanceops.app/sitemap.xml'

  const pings = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP)}`,
  ]

  const results = await Promise.allSettled(
    pings.map(url =>
      fetch(url, { method: 'GET', signal: AbortSignal.timeout(8000) })
        .then(r => ({ url, status: r.status, ok: r.ok }))
        .catch(e => ({ url, error: String(e) }))
    )
  )

  const summary = results.map(r => r.status === 'fulfilled' ? r.value : r.reason)

  return NextResponse.json({
    sitemap: SITEMAP,
    pinged_at: new Date().toISOString(),
    results: summary,
  })
}
