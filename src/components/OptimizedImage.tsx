import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  fill?: boolean
  sizes?: string
}

export function OptimizedImage({
  src, alt, width, height, priority = false, className, fill, sizes,
}: OptimizedImageProps) {
  const resolvedSizes = sizes ?? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        sizes={resolvedSizes}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 630}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      sizes={resolvedSizes}
    />
  )
}
