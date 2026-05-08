import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and integrations.</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Account</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</label>
            <p className="text-sm text-gray-900 mt-1">{user.email}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">User ID</label>
            <p className="text-xs text-gray-400 mt-1 font-mono">{user.id}</p>
          </div>
        </div>
      </div>

      {/* Stripe Integration */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-1">Stripe Integration</h2>
        <p className="text-sm text-gray-500 mb-4">Connect your Stripe account to automatically sync invoices and revenue metrics.</p>
        <button
          disabled
          className="inline-flex items-center gap-2 bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.831 3.47 1.426 3.47 2.338 0 .914-.796 1.431-2.127 1.431-1.874 0-4.951-.688-6.94-1.956l-.79 5.725c1.87.913 5.028 1.625 8.072 1.625 2.64 0 4.817-.637 6.36-1.885 1.596-1.3 2.427-3.235 2.427-5.617 0-4.12-2.524-5.815-6.729-7.138z" />
          </svg>
          Connect Stripe (Coming Soon)
        </button>
      </div>
    </div>
  )
}
