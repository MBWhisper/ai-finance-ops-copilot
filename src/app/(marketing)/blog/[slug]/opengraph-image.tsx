import { ImageResponse } from 'next/og'
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type PostMeta = {
  title: string
  description: string
  tags: string[]
}

function parseFrontmatter(content: string): PostMeta {
  const match = content.match(/^---[\r\n]([\s\S]*?)[\r\n]---/)
  if (!match) return { title: 'AI Finance Ops', description: '', tags: [] }
  const block = match[1]
  const get = (key: string) => {
    const m = block.match(new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?`, 'm'))
    return m ? m[1].trim() : ''
  }
  const tagsMatch = block.match(/^tags:\s*\[([^\]]+)\]/m)
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map((t) => t.replace(/["'\s]/g, '').toLowerCase()).filter(Boolean)
    : []
  return { title: get('title'), description: get('description'), tags }
}



export default async function Image({ params }: { params: { slug: string } }) {
  const postsDir = join(process.cwd(), 'src/app/(marketing)/blog/_posts')
  let meta: PostMeta = { title: 'AI Finance Ops Blog', description: 'SaaS financial intelligence for early-stage founders.', tags: [] }
  try {
    const content = readFileSync(join(postsDir, `${params.slug}.mdx`), 'utf-8')
    meta = parseFrontmatter(content)
  } catch {}

  const { title, description, tags } = meta

  const tagColors: Record<string, [string, string]> = {
    mrr:        ['#01696f', '#0c4e54'],
    arr:        ['#006494', '#0b3751'],
    saas:       ['#437a22', '#1e3f0a'],
    stripe:     ['#6772e5', '#3d4eac'],
    churn:      ['#a12c7b', '#561740'],
    pricing:    ['#da7101', '#ac3e00'],
    investors:  ['#964219', '#4b2614'],
    growth:     ['#01696f', '#0c4e54'],
    benchmarks: ['#006494', '#0b3751'],
    default:    ['#01696f', '#0c4e54'],
  }

  const firstTag = tags[0]?.toLowerCase() ?? 'default'
  const [gradStart, gradEnd] = tagColors[firstTag] ?? tagColors.default
  const shortDesc = description.length > 120 ? description.slice(0, 120) + '...' : description

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, #0d1117 0%, #161b22 60%, ${gradEnd}55 100%)`,
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: `radial-gradient(circle, ${gradStart}44 0%, transparent 70%)`,
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: gradStart, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '20px', color: '#fff',
          }}>Z</div>
          <span style={{ color: '#e6edf3', fontSize: '18px', fontWeight: 600 }}>AI Finance Ops</span>
        </div>

        {tags.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {tags.slice(0, 3).map((tag) => (
              <div key={tag} style={{
                background: `${gradStart}33`,
                border: `1px solid ${gradStart}66`,
                borderRadius: '999px',
                padding: '4px 14px',
                color: '#8ecfd4',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {tag.toUpperCase()}
              </div>
            ))}
          </div>
        )}

        <div style={{
          color: '#e6edf3',
          fontSize: title.length > 60 ? '38px' : '46px',
          fontWeight: 700,
          lineHeight: 1.2,
          flex: 1,
          maxWidth: '900px',
        }}>
          {title}
        </div>

        <div style={{
          color: '#8b949e',
          fontSize: '20px',
          lineHeight: 1.5,
          maxWidth: '800px',
          marginTop: '20px',
          marginBottom: '40px',
        }}>
          {shortDesc}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #30363d',
          paddingTop: '20px',
        }}>
          <span style={{ color: '#8b949e', fontSize: '16px' }}>aifinanceops.app/blog</span>
          <div style={{
            background: gradStart, color: '#fff',
            borderRadius: '999px', padding: '8px 20px',
            fontSize: '15px', fontWeight: 600,
          }}>Read Article</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
