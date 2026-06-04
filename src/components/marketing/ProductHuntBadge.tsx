"use client"

export function ProductHuntBadge() {
  return (
    <a
      href="https://www.producthunt.com/posts/ai-finance-ops"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=ai-finance-ops&theme=dark"
        alt="AI Finance Ops - Featured on Product Hunt"
        width={250}
        height={54}
        loading="lazy"
        decoding="async"
        style={{ width: '250px', height: '54px' }}
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.nextElementSibling
          if (fallback) (fallback as HTMLElement).style.display = 'flex'
        }}
      />
      <span
        style={{ display: 'none' }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium"
      >
        🔶 Featured on Product Hunt
      </span>
    </a>
  )
}
