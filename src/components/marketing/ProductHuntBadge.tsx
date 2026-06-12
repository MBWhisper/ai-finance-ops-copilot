import Image from 'next/image'

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
        <Image
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=ai-finance-ops&theme=dark"
          alt="AI Finance Ops - Featured on Product Hunt"
          width={200}
          height={43}
          loading="lazy"
          unoptimized
        />
      </a>
    </div>
  )
}
