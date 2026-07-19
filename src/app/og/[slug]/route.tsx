import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const titles: Record<string, { title: string; subtitle: string }> = {
  'mrr-calculator': { title: 'MRR Calculator', subtitle: 'Calculate Monthly Recurring Revenue instantly' },
  'churn-rate-calculator': { title: 'Churn Rate Calculator', subtitle: 'Customer churn, revenue churn, NRR' },
  'ltv-calculator': { title: 'LTV Calculator', subtitle: 'Customer Lifetime Value & LTV:CAC ratio' },
  'arr-calculator': { title: 'ARR Calculator', subtitle: 'Annual Recurring Revenue for SaaS' },
  'runway-calculator': { title: 'Runway Calculator', subtitle: 'How many months of runway do you have?' },
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = titles[slug] ?? { title: 'AI Finance Ops', subtitle: 'Financial copilot for SaaS founders' }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #030712 0%, #0a1628 50%, #030712 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '40px',
        }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            color: '#34d399',
            fontSize: '14px',
            fontWeight: 600,
          }}>
            Free Tool — aifinanceops.app
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: '72px',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '20px',
        }}>
          {meta.title}
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '28px',
          color: '#9ca3af',
          marginBottom: '60px',
        }}>
          {meta.subtitle}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: '#10b981',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 800,
            color: 'white',
          }}>
            A
          </div>
          <span style={{ color: '#6b7280', fontSize: '18px' }}>AI Finance Ops — Financial copilot for SaaS founders</span>
        </div>

        {/* Green accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #10b981, #059669)',
        }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
