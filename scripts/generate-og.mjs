import sharp from "sharp"

const width = 1200
const height = 630

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)" rx="0"/>

  <!-- Grid -->
  <g opacity="0.03" stroke="white" stroke-width="0.5">
    ${Array.from({length:12},(_,i)=>`<line x1="0" y1="${i*60}" x2="${width}" y2="${i*60}"/>`).join("")}
    ${Array.from({length:24},(_,i)=>`<line x1="${i*60}" y1="0" x2="${i*60}" y2="${height}"/>`).join("")}
  </g>

  <!-- Glow -->
  <circle cx="1050" cy="200" r="280" fill="url(#glow)"/>

  <!-- Chart line -->
  <g opacity="0.2" transform="translate(620, 100)">
    <polyline points="0,280 40,250 80,260 120,220 160,230 200,190 240,200 280,170 320,180 360,150 400,160 440,130 480,140 520,110 560,120"
      fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="0,280 40,265 80,270 120,245 160,250 200,225 240,230 280,210 320,215 360,195 400,200 440,180 480,185 520,165 560,170"
      fill="none" stroke="#10b981" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.5"/>
  </g>

  <!-- Logo -->
  <rect x="70" y="75" width="56" height="56" rx="14" fill="#10b981"/>
  <path d="M94 82l-12 18h9l-2 14 12-20h-9l2-12z" fill="white"/>

  <!-- App name -->
  <text x="145" y="115" font-family="system-ui, sans-serif" font-size="32" font-weight="700" fill="white">AI Finance Ops</text>

  <!-- Headline -->
  <text x="70" y="270" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="white">Intelligent</text>
  <text x="70" y="340" font-family="system-ui, sans-serif" font-size="52" font-weight="800" fill="#10b981">Financial Copilot</text>

  <!-- Tagline -->
  <text x="70" y="410" font-family="system-ui, sans-serif" font-size="20" fill="#94a3b8">Automate reporting. Track KPIs. Forecast cash flow.</text>

  <!-- CTA -->
  <rect x="70" y="455" width="200" height="48" rx="24" fill="#10b981"/>
  <text x="105" y="485" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="white">Start Free Trial</text>

  <!-- URL -->
  <text x="1120" y="600" font-family="system-ui, sans-serif" font-size="15" fill="#475569" text-anchor="end">aifinanceops.app</text>

  <!-- KPI cards -->
  <g transform="translate(640, 390)">
    <rect x="0" y="0" width="120" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1" opacity="0.7"/>
    <text x="12" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">MRR</text>
    <text x="12" y="50" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#10b981">$45.8K</text>

    <rect x="135" y="0" width="120" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1" opacity="0.7"/>
    <text x="147" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">Churn</text>
    <text x="147" y="50" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#f59e0b">3.2%</text>

    <rect x="270" y="0" width="120" height="65" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1" opacity="0.7"/>
    <text x="282" y="24" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">Runway</text>
    <text x="282" y="50" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#3b82f6">14mo</text>
  </g>
</svg>
`

await sharp(Buffer.from(svg))
  .resize(width, height)
  .png()
  .toFile("public/og-image.png")

console.log("✅ Generated public/og-image.png (1200x630)")
