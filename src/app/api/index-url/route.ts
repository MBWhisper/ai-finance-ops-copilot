import { NextResponse } from 'next/server'

// Google Indexing API — requests immediate indexing for a specific URL.
// Only works for pages with JobPosting or BroadcastEvent schema,
// but Google sometimes processes other URLs too.
// POST /api/index-url  body: { url: string, secret: string }
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || body.secret !== process.env.PING_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { url } = body
  if (!url || !url.startsWith('https://aifinanceops.app')) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  // Requires GOOGLE_INDEXING_SA_KEY env var (base64 encoded service account JSON)
  const saKeyB64 = process.env.GOOGLE_INDEXING_SA_KEY
  if (!saKeyB64) {
    return NextResponse.json({
      message: 'GOOGLE_INDEXING_SA_KEY not configured. Add a Google service account key to use this endpoint.',
      docs: 'https://developers.google.com/search/apis/indexing-api/v3/quickstart',
    }, { status: 501 })
  }

  try {
    const saKey = JSON.parse(Buffer.from(saKeyB64, 'base64').toString())

    // Get access token via JWT
    const now = Math.floor(Date.now() / 1000)
    const header = { alg: 'RS256', typ: 'JWT' }
    const payload = {
      iss: saKey.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }

    // Sign JWT
    const enc = (obj: object) => Buffer.from(JSON.stringify(obj)).toString('base64url')
    const unsigned = `${enc(header)}.${enc(payload)}`

    const { createSign } = await import('crypto')
    const sign = createSign('SHA256')
    sign.update(unsigned)
    const signature = sign.sign(saKey.private_key, 'base64url')
    const jwt = `${unsigned}.${signature}`

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })
    const { access_token } = await tokenRes.json()

    // Submit to Indexing API
    const indexRes = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ url, type: 'URL_UPDATED' }),
    })
    const indexData = await indexRes.json()

    return NextResponse.json({ url, result: indexData })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
