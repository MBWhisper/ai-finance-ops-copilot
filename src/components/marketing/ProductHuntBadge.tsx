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
          style={{ width: 200, height: 43 }}
          onError={(e) => {
            // Fallback: show a styled badge if PH image fails
            const target = e.currentTarget as HTMLImageElement
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        <span
          style={{ display: 'none' }}
          className="inline-flex items-center gap-2 px-3 py-2 bg-[#ff6154] text-white text-sm font-semibold rounded-lg"
        >
          <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M22.667 20H16v-5.333h6.667A2.667 2.667 0 0 1 22.667 20z" fill="white"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm-4 10.667h6.667a6.667 6.667 0 0 1 0 13.333H16V30h-2.667V10.667H16z" fill="white"/>
          </svg>
          Featured on Product Hunt
        </span>
      </a>
    </div>
  )
}
