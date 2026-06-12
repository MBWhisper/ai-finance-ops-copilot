import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 60%, #01696f22 100%)',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Accent circle */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #01696f33 0%, transparent 70%)',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '60px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#01696f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
            }}
          >
            &#9889;
          </div>
          <span style={{ color: '#e6edf3', fontSize: '20px', fontWeight: 600 }}>AI Finance Ops</span>
        </div>

        {/* Main heading */}
        <div
          style={{
            color: '#e6edf3',
            fontSize: '52px',
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: '900px',
            flex: 1,
          }}
        >
          SaaS Metrics Blog
        </div>

        <div
          style={{
            color: '#8b949e',
            fontSize: '22px',
            lineHeight: 1.5,
            maxWidth: '700px',
            marginTop: '20px',
            marginBottom: '40px',
          }}
        >
          MRR, ARR, churn, LTV and growth benchmarks for early-stage SaaS founders.
        </div>

        {/* Tags strip */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          {['MRR', 'ARR', 'Churn', 'LTV', 'Runway'].map((tag) => (
            <div
              key={tag}
              style={{
                background: '#01696f22',
                border: '1px solid #01696f55',
                borderRadius: '999px',
                padding: '6px 18px',
                color: '#4f98a3',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #30363d',
            paddingTop: '20px',
          }}
        >
          <span style={{ color: '#8b949e', fontSize: '16px' }}>aifinanceops.app/blog</span>
          <span style={{ color: '#4f98a3', fontSize: '16px' }}>SaaS financial intelligence</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
