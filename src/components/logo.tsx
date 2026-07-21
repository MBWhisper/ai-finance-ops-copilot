export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AI Finance Ops logo"
    >
      <rect width="32" height="32" rx="8" fill="#10b981" />
      <path
        d="M18 4L10 18h5l-1 10 8-14h-5l1-10z"
        fill="white"
      />
    </svg>
  )
}
