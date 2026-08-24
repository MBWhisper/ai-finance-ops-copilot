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
      {/* Background circle */}
      <circle cx="16" cy="16" r="16" fill="#10b981" />
      
      {/* Stylized "O" with chart line */}
      <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="2.5" fill="none" />
      
      {/* Chart line going up through the O */}
      <path
        d="M10 18 L14 14 L18 16 L22 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Dot at the end of chart line */}
      <circle cx="22" cy="10" r="1.5" fill="white" />
    </svg>
  )
}
