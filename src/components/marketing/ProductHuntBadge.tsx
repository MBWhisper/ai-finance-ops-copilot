import Image from 'next/image'

export function ProductHuntBadge() {
  return (
    <a
      href="https://www.producthunt.com/posts/ai-finance-ops"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=ai-finance-ops&theme=dark"
        alt="AI Finance Ops - Featured on Product Hunt"
        width={250}
        height={54}
        loading="lazy"
      />
    </a>
  )
}
