'use client'

export function ProductHuntBadge() {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
        Featured on
      </span>
      <a
        href="https://www.producthunt.com/posts/ai-finance-ops"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-90 transition-opacity"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=ai-finance-ops&theme=dark"
          alt="AI Finance Ops - Featured on Product Hunt"
          width={200}
          height={43}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        <span
          style={{ display: 'none' }}
          className="inline-flex items-center gap-2 rounded-md bg-[#ff6154] px-3 py-2 text-sm font-semibold text-white"
        >
          <svg width="16" height="16" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
            <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm-32 296H160V192h64c35.3 0 64 28.7 64 64s-28.7 64-64 64zm0-96h-32v64h32c17.6 0 32-14.4 32-32s-14.4-32-32-32z" />
          </svg>
          Featured on Product Hunt
        </span>
      </a>
    </div>
  )
}
