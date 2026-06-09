import { redirect } from 'next/navigation'

// Redirect /dashboard/overview → /dashboard (default route)
export default function OverviewPage() {
  redirect('/dashboard')
}
