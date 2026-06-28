/**
 * copilot-context.ts
 *
 * CLIENT-SAFE file — no Node.js / DB imports here.
 * Only exports the demo fallback used by the client hook
 * when it needs to pass lightweight page context.
 *
 * The LIVE DB context is built server-side in:
 *   src/lib/copilot-context.server.ts   ← server-only
 *   src/app/api/copilot/route.ts        ← calls the server file
 */

export interface CopilotPageData {
  invoices?: unknown[]
  cohorts?: unknown[]
  [key: string]: unknown
}

/**
 * Lightweight client context — only page name + optional page data.
 * The API route enriches this with live DB metrics server-side.
 * Kept for backward compatibility with useCopilot hook.
 */
export function buildCopilotContext(page: string, pageData?: CopilotPageData) {
  return {
    currentPage: page,
    ...(pageData ? { pageData } : {}),
  }
}
