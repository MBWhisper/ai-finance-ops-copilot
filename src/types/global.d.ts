export {}

declare global {
  var __rateLimitMap: Map<string, { count: number; resetAt: number }> | undefined
}
