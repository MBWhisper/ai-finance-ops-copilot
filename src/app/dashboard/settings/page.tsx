'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Check, User, Building2, Bell, Shield, Puzzle, Save, Loader2, RefreshCw, Copy, Trash2, Banknote } from 'lucide-react'
import { PlaidLinkButton } from '@/components/dashboard/plaid-link-button'
import { cn } from '@/lib/utils'
import { updateProfile, updateWorkspaceSettings, updateNotificationSettings } from './actions'

type TabId = 'profile' | 'workspace' | 'notifications' | 'security' | 'integrations'

const TABS: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'workspace', label: 'Workspace', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
]

interface IntegrationCard {
  key: string
  name: string
  description: string
  connected: boolean
  lastSync?: string
}

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>('profile')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ id: string; email?: string | null; name?: string | null } | null>(null)
  const [profileName, setProfileName] = useState('')
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Workspace (persisted via DB)
  const [company, setCompany] = useState('')
  const [billingEmail, setBillingEmail] = useState('')
  const [financeContact, setFinanceContact] = useState('')
  const [defaultCurrency, setDefaultCurrency] = useState('USD')
  const [invoicePrefix, setInvoicePrefix] = useState('INV-')

  // Notifications (persisted via DB)
  const [notifOverdue, setNotifOverdue] = useState(true)
  const [notifPayment, setNotifPayment] = useState(true)
  const [notifWeekly, setNotifWeekly] = useState(false)
  const [notifChurn, setNotifChurn] = useState(true)
  const [notifAnnounce, setNotifAnnounce] = useState(false)

  // Integrations
  const [integrations, setIntegrations] = useState<IntegrationCard[]>([])

  // Stripe account
  const [stripeConnected, setStripeConnected] = useState(false)
  const [stripeLastSync, setStripeLastSync] = useState<string | null>(null)

  // Lemon Squeezy
  const [lsConnected, setLsConnected] = useState(false)
  const [lsStoreName, setLsStoreName] = useState('')
  const [lsLastSync, setLsLastSync] = useState<string | null>(null)

  // PayPal
  const [ppConnected, setPpConnected] = useState(false)
  const [ppMerchantEmail, setPpMerchantEmail] = useState('')
  const [ppLastSync, setPpLastSync] = useState<string | null>(null)

  // Plaid
  const [plaidConnected, setPlaidConnected] = useState(false)
  const [plaidInstitutionName, setPlaidInstitutionName] = useState('')
  const [plaidLastSync, setPlaidLastSync] = useState<string | null>(null)

  const [wsSaved, setWsSaved] = useState(false)
  const [notifSaved, setNotifSaved] = useState(false)

  // Load data
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const supabase = createClient()
        const { data: { user: u } } = await supabase.auth.getUser()
        if (!u) { window.location.href = '/login'; return }
        setUser(u)
        setProfileName(u.user_metadata?.name ?? u.email?.split('@')[0] ?? '')

        // Profile and settings from profiles table
        const { data: profile } = await supabase.from('profiles').select('name, settings').eq('id', u.id).single()
        if (profile?.name) setProfileName(profile.name)

        // Restore workspace settings from DB
        const settingsData = (profile?.settings as Record<string, unknown>) ?? {}
        const ws = (settingsData?.workspace as Record<string, unknown>) ?? {}
        if (ws.companyName) setCompany(ws.companyName as string)
        if (ws.billingEmail) setBillingEmail(ws.billingEmail as string)
        if (ws.financeContact) setFinanceContact(ws.financeContact as string)
        if (ws.defaultCurrency) setDefaultCurrency(ws.defaultCurrency as string)
        if (ws.invoicePrefix) setInvoicePrefix(ws.invoicePrefix as string)

        // Restore notification preferences from DB
        const nf = (settingsData?.notifications as Record<string, unknown>) ?? {}
        if (typeof nf.overdueAlerts === 'boolean') setNotifOverdue(nf.overdueAlerts)
        if (typeof nf.paymentReceived === 'boolean') setNotifPayment(nf.paymentReceived)
        if (typeof nf.weeklySummary === 'boolean') setNotifWeekly(nf.weeklySummary)
        if (typeof nf.churnWarnings === 'boolean') setNotifChurn(nf.churnWarnings)
        if (typeof nf.productAnnouncements === 'boolean') setNotifAnnounce(nf.productAnnouncements)

        // Stripe account
        const { data: sa } = await supabase.from('stripe_accounts').select('last_sync_at').eq('user_id', u.id).single()
        if (sa) {
          setStripeConnected(true)
          setStripeLastSync(sa.last_sync_at ?? null)
        }

        // Lemon Squeezy account
        try {
          const lsRes = await fetch('/api/lemonsqueezy/dashboard')
          const lsJson = await lsRes.json()
          if (lsJson.connected) {
            setLsConnected(true)
            setLsStoreName(lsJson.storeName ?? 'Lemon Squeezy')
            setLsLastSync(lsJson.data?.lastSyncAt ?? null)
          }
        } catch {} // LS not configured

        // PayPal account
        try {
          const ppRes = await fetch('/api/paypal/dashboard')
          const ppJson = await ppRes.json()
          if (ppJson.isConnected) {
            setPpConnected(true)
            setPpMerchantEmail(ppJson.merchantEmail ?? 'PayPal')
            setPpLastSync(ppJson.lastSyncedAt ?? null)
          }
        } catch {} // PayPal not configured

        // Plaid account
        try {
          const plRes = await fetch('/api/plaid/balance')
          const plJson = await plRes.json()
          if (plRes.ok && plJson.accounts) {
            setPlaidConnected(true)
            setPlaidInstitutionName(plJson.institutionName ?? plJson.accounts[0]?.name ?? 'Bank')
            setPlaidLastSync(new Date().toISOString())
          }
        } catch {} // Plaid not configured

        // Integrations
        setIntegrations([
          { key: 'stripe', name: 'Stripe', description: 'Sync invoices, revenue, and subscription data', connected: !!sa, lastSync: sa?.last_sync_at ?? undefined },
          { key: 'quickbooks', name: 'QuickBooks', description: 'Sync your general ledger and chart of accounts', connected: false },
          { key: 'xero', name: 'Xero', description: 'Connect your Xero accounting instance', connected: false },
          { key: 'slack', name: 'Slack', description: 'Get invoice alerts and finance notifications', connected: false },
          { key: 'email', name: 'Email / SMTP', description: 'Configure outbound email for invoice delivery', connected: false },
        ])
      } catch { }
      setLoading(false)
    }
    load()
  }, [])

  const saveWorkspace = async () => {
    const result = await updateWorkspaceSettings({ companyName: company, billingEmail, financeContact, defaultCurrency, invoicePrefix })
    if (result.success) {
      setWsSaved(true)
      setTimeout(() => setWsSaved(false), 2000)
    }
  }

  const saveNotifications = async () => {
    const result = await updateNotificationSettings({ overdueAlerts: notifOverdue, paymentReceived: notifPayment, weeklySummary: notifWeekly, churnWarnings: notifChurn, productAnnouncements: notifAnnounce })
    if (result.success) {
      setNotifSaved(true)
      setTimeout(() => setNotifSaved(false), 2000)
    }
  }

  const handleProfileSave = useCallback(async () => {
    setProfileSaving(true)
    setProfileMessage(null)
    const fd = new FormData()
    fd.set('name', profileName)
    const result = await updateProfile(fd)
    setProfileMessage(result.success ? { type: 'success', text: 'Profile updated' } : { type: 'error', text: result.error ?? 'Failed' })
    setProfileSaving(false)
    setTimeout(() => setProfileMessage(null), 3000)
  }, [profileName])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account, workspace, and preferences.</p>
      </div>

      {/* Tabs — horizontal scroll on mobile, wrap on desktop */}
      <div className="overflow-x-auto overflow-y-hidden flex-nowrap sm:flex-wrap flex gap-1 border-b border-gray-200 pb-px scrollbar-none">
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                active ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal account details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="text" value={user?.email ?? ''} readOnly className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed" />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed here. Contact support.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" value={profileName} onChange={e => setProfileName(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              {profileMessage && (
                <div className={cn("rounded-lg px-3 py-2 text-sm", profileMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600')}>
                  {profileMessage.text}
                </div>
              )}
              <Button onClick={handleProfileSave} disabled={profileSaving}>
                {profileSaving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                Save Changes
              </Button>
            </CardContent>
          </Card>
        )}

        {/* WORKSPACE TAB */}
        {tab === 'workspace' && (
          <Card>
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>Company and billing defaults.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Your Company Inc." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Email</label>
                  <input type="email" value={billingEmail} onChange={e => setBillingEmail(e.target.value)} placeholder="billing@company.com" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Finance Contact</label>
                  <input type="text" value={financeContact} onChange={e => setFinanceContact(e.target.value)} placeholder="finance@company.com" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
                  <select value={defaultCurrency} onChange={e => setDefaultCurrency(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="SAR">SAR (﷼)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Prefix</label>
                  <input type="text" value={invoicePrefix} onChange={e => setInvoicePrefix(e.target.value)} placeholder="INV-" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="flex items-end">
                  <div className="rounded-lg border-2 border-dashed border-gray-200 px-4 py-3 w-full text-center">
                    <p className="text-xs text-gray-400">Company Logo</p>
                    <p className="text-[10px] text-gray-300 mt-0.5">Upload coming soon</p>
                  </div>
                </div>
              </div>
              {wsSaved && <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Workspace settings saved.</div>}
              <Button onClick={saveWorkspace}><Save className="h-4 w-4 mr-1" /> Save Settings</Button>
            </CardContent>
          </Card>
        )}

        {/* NOTIFICATIONS TAB */}
        {tab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose which alerts to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'overdue', label: 'Invoice Overdue Alerts', desc: 'Get notified when an invoice becomes overdue', value: notifOverdue, set: setNotifOverdue },
                { key: 'payment', label: 'Payment Received', desc: 'Notification when a payment is received', value: notifPayment, set: setNotifPayment },
                { key: 'weekly', label: 'Weekly Finance Summary', desc: 'Weekly digest of MRR, ARR, churn, and AR status', value: notifWeekly, set: setNotifWeekly },
                { key: 'churn', label: 'Churn & Retention Warnings', desc: 'Alert when churn rate exceeds threshold or retention drops', value: notifChurn, set: setNotifChurn },
                { key: 'announce', label: 'Product & Billing Announcements', desc: 'Feature updates, billing changes, and product news', value: notifAnnounce, set: setNotifAnnounce },
              ].map(n => (
                <label key={n.key} className="flex items-start gap-3 cursor-pointer py-2">
                  <input type="checkbox" checked={n.value} onChange={e => n.set(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{n.label}</p>
                    <p className="text-xs text-gray-500">{n.desc}</p>
                  </div>
                </label>
              ))}
              {notifSaved && <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">Preferences saved.</div>}
              <Button onClick={saveNotifications}><Save className="h-4 w-4 mr-1" /> Save Preferences</Button>
            </CardContent>
          </Card>
        )}

        {/* SECURITY TAB */}
        {tab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Password, sessions, and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Password</p>
                    <p className="text-xs text-gray-500">Reset your account password</p>
                  </div>
                  <span className="text-sm text-gray-400">Use Supabase Auth dashboard to reset</span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Active Sessions</p>
                    <p className="text-xs text-gray-500">Manage your active sessions across devices</p>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Coming soon</span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
                <p className="font-medium">Security best practices</p>
                <p className="text-xs mt-1">Use a strong, unique password. Enable two-factor authentication in your Supabase dashboard for additional security. All data is encrypted in transit (TLS 1.3) and at rest (AES-256).</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* INTEGRATIONS TAB */}
        {tab === 'integrations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Connected Services</h2>
                <p className="text-sm text-gray-500">Manage third-party integrations.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {integrations.map(ic => (
                <Card key={ic.key}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{ic.name}</CardTitle>
                        <CardDescription>{ic.description}</CardDescription>
                      </div>
                      <Badge variant={ic.connected ? 'success' : 'default'}>
                        {ic.connected ? 'Connected' : 'Not connected'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {ic.connected && ic.lastSync && (
                        <p className="text-xs text-gray-400">Last synced: {new Date(ic.lastSync).toLocaleDateString()}</p>
                      )}
                      <div className="flex gap-2">
                        {ic.key === 'stripe' ? (
                          stripeConnected ? (
                            <a href="/dashboard/settings/billing" className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                              <ExternalLink className="h-3 w-3" /> Manage
                            </a>
                          ) : (
                            <span className="text-xs text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">Connect in Stripe section below</span>
                          )
                        ) : (
                          <>
                            <button className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                              {ic.connected ? 'Reconnect' : 'Connect'}
                            </button>
                            {ic.connected && (
                              <button className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
                                Disconnect
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stripe inline connect card */}
            <Card>
              <CardHeader>
                <CardTitle>Stripe API Key</CardTitle>
                <CardDescription>Enter your Stripe secret key to sync data automatically.</CardDescription>
              </CardHeader>
              <CardContent>
                {stripeConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
                      <Check className="h-4 w-4" />
                      Stripe connected{stripeLastSync && <> · Last sync: {new Date(stripeLastSync).toLocaleDateString()}</>}
                    </div>
                    <details className="group">
                      <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">Update key</summary>
                      <div className="mt-3">
                        <StripeKeyFormInline />
                      </div>
                    </details>
                  </div>
                ) : (
                  <StripeKeyFormInline />
                )}
              </CardContent>
            </Card>

            {/* Lemon Squeezy inline connect card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-lg">🍋</span>
                  <div>
                    <CardTitle>Lemon Squeezy</CardTitle>
                    <CardDescription>
                      Connect your Lemon Squeezy store to sync orders, subscriptions, and MRR.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <LemonSqueezyCardInline
                  connected={lsConnected}
                  storeName={lsStoreName}
                  lastSync={lsLastSync}
                  onConnected={(name) => {
                    setLsConnected(true)
                    setLsStoreName(name)
                    setLsLastSync(new Date().toISOString())
                  }}
                  onDisconnected={() => {
                    setLsConnected(false)
                    setLsStoreName('')
                    setLsLastSync(null)
                  }}
                  onSync={() => setLsLastSync(new Date().toISOString())}
                />
              </CardContent>
            </Card>

            {/* PayPal inline connect card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#003087"><path d="M20.067 8.478c.493.526.746 1.255.746 2.188 0 2.625-1.588 4.068-3.979 4.068h-1.416l-.925 3.894H12.89l.924-3.894h.738c1.875 0 2.813-.937 3.214-2.516.357-1.416.179-3.74-1.696-3.74h-2.5l-1.116 4.688H9.86l1.116-4.688H7.64l-1.116 4.688H3.964l1.116-4.688H.559l.372-1.563h4.52l.893-3.75H2.011l.372-1.563h6.25c.894 0 1.563.223 2.055.669.492.446.738 1.116.738 2.011 0 .894-.246 1.696-.738 2.409-.492.713-1.117 1.07-1.875 1.07h-.67l.892-3.75h-.625l-1.116 4.688h1.563z" /></svg>
                  <div>
                    <CardTitle>PayPal Business</CardTitle>
                    <CardDescription>
                      Connect your PayPal Business account to sync transactions, invoices, and subscriptions.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PayPalCardInline
                  connected={ppConnected}
                  merchantEmail={ppMerchantEmail}
                  lastSync={ppLastSync}
                  onConnected={(email) => {
                    setPpConnected(true)
                    setPpMerchantEmail(email)
                    setPpLastSync(new Date().toISOString())
                  }}
                  onDisconnected={() => {
                    setPpConnected(false)
                    setPpMerchantEmail('')
                    setPpLastSync(null)
                  }}
                  onSync={() => setPpLastSync(new Date().toISOString())}
                />
              </CardContent>
            </Card>

            {/* Plaid inline connect card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" stroke="#10B981" strokeWidth="2" /><path d="M8 12l2.5 2.5L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <div>
                    <CardTitle>Plaid Bank Connection</CardTitle>
                    <CardDescription>
                      Connect your bank accounts to sync transactions and balances.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PlaidCardInline
                  connected={plaidConnected}
                  institutionName={plaidInstitutionName}
                  lastSync={plaidLastSync}
                  onConnected={(name) => {
                    setPlaidConnected(true)
                    setPlaidInstitutionName(name)
                    setPlaidLastSync(new Date().toISOString())
                  }}
                  onDisconnected={() => {
                    setPlaidConnected(false)
                    setPlaidInstitutionName('')
                    setPlaidLastSync(null)
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function LemonSqueezyCardInline({
  connected,
  storeName,
  lastSync,
  onConnected,
  onDisconnected,
  onSync,
}: {
  connected: boolean
  storeName: string
  lastSync: string | null
  onConnected: (name: string) => void
  onDisconnected: () => void
  onSync: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [syncing, setSyncing] = useState(false)

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    if (!apiKey.trim()) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/lemonsqueezy/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error ?? 'Failed to connect')
      }
      setStatus('success')
      setMessage(`Connected to ${json.storeName ?? 'Lemon Squeezy'}`)
      onConnected(json.storeName ?? 'Lemon Squeezy')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  async function handleSync() {
    setSyncing(true)
    try {
      const res = await fetch('/api/lemonsqueezy/sync', { method: 'POST' })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Sync failed')
      }
      onSync()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Sync failed')
    }
    setSyncing(false)
  }

  async function handleDisconnect() {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('lemon_squeezy_accounts').delete().eq('user_id', user.id)
        await supabase.from('lemon_squeezy_orders').delete().eq('user_id', user.id)
        await supabase.from('lemon_squeezy_subscriptions').delete().eq('user_id', user.id)
        await supabase.from('lemon_squeezy_customers').delete().eq('user_id', user.id)
      }
      onDisconnected()
    } catch {}
  }

  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aifinanceops.app'}/api/webhooks/lemonsqueezy`

  if (connected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          <Check className="h-4 w-4" />
          Connected {storeName ? `(${storeName})` : ''}
          {lastSync && <> · Last synced: {new Date(lastSync).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</>}
        </div>

        <div className="rounded-lg border border-gray-200 p-4 space-y-2">
          <p className="text-xs font-medium text-gray-500">Webhook URL</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-gray-50 px-2 py-1.5 text-xs font-mono text-gray-700 truncate">
              {webhookUrl}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(webhookUrl)}
              className="shrink-0 rounded-lg border border-gray-300 p-1.5 hover:bg-gray-50 transition-colors"
              title="Copy webhook URL"
            >
              <Copy className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
          <button
            onClick={handleDisconnect}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Disconnect
          </button>
        </div>

        {message && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{message}</div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleConnect} className="space-y-4">
      {status === 'success' && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</div>
      )}
      {status === 'error' && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{message}</div>
      )}
      <div>
        <label htmlFor="lsApiKey" className="mb-1 block text-sm font-medium text-gray-700">
          Lemon Squeezy API Key
        </label>
        <input
          id="lsApiKey"
          type="password"
          placeholder="your_api_key_here"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Find this in Lemon Squeezy → Settings → API
        </p>
      </div>
      <div className="rounded-lg border border-gray-200 p-4 space-y-2">
        <p className="text-xs font-medium text-gray-500">Webhook URL (configure in Lemon Squeezy)</p>
        <code className="block rounded bg-gray-50 px-2 py-1.5 text-xs font-mono text-gray-700 break-all">
          {webhookUrl}
        </code>
      </div>
      <Button type="submit" disabled={status === 'loading' || !apiKey.trim()}>
        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
        {status === 'loading' ? 'Connecting...' : 'Connect'}
      </Button>
    </form>
  )
}

function PayPalCardInline({
  connected,
  merchantEmail,
  lastSync,
  onConnected,
  onDisconnected,
  onSync,
}: {
  connected: boolean
  merchantEmail: string
  lastSync: string | null
  onConnected: (email: string) => void
  onDisconnected: () => void
  onSync: () => void
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [mode, setMode] = useState<'sandbox' | 'live'>('sandbox')
  const [syncing, setSyncing] = useState(false)

  async function handleConnect(e: React.FormEvent) {
    e.preventDefault()
    if (!clientId.trim() || !clientSecret.trim()) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/paypal/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: clientId.trim(), clientSecret: clientSecret.trim(), mode }),
      })
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error ?? 'Failed to connect')
      }
      setStatus('success')
      setMessage(`Connected as ${json.merchantEmail}`)
      onConnected(json.merchantEmail ?? 'PayPal')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  async function handleSync() {
    setSyncing(true)
    try {
      const res = await fetch('/api/paypal/sync', { method: 'POST' })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Sync failed')
      }
      onSync()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Sync failed')
    }
    setSyncing(false)
  }

  async function handleDisconnect() {
    try {
      const res = await fetch('/api/paypal/disconnect', { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      onDisconnected()
    } catch {}
  }

  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://aifinanceops.app'}/api/webhooks/paypal`

  if (connected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          <Check className="h-4 w-4" />
          Connected {merchantEmail ? `(${merchantEmail})` : ''}
          {lastSync && <> · Last synced: {new Date(lastSync).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</>}
        </div>

        <div className="rounded-lg border border-gray-200 p-4 space-y-2">
          <p className="text-xs font-medium text-gray-500">Webhook URL (configure in PayPal Developer Dashboard)</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded bg-gray-50 px-2 py-1.5 text-xs font-mono text-gray-700 truncate">
              {webhookUrl}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(webhookUrl)}
              className="shrink-0 rounded-lg border border-gray-300 p-1.5 hover:bg-gray-50 transition-colors"
              title="Copy webhook URL"
            >
              <Copy className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Now'}
          </button>
          <button
            onClick={handleDisconnect}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Disconnect
          </button>
        </div>

        {message && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{message}</div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleConnect} className="space-y-4">
      {status === 'success' && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</div>
      )}
      {status === 'error' && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{message}</div>
      )}
      <div>
        <label htmlFor="ppClientId" className="mb-1 block text-sm font-medium text-gray-700">
          Client ID
        </label>
        <input
          id="ppClientId"
          type="text"
          placeholder="your_paypal_client_id"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Find this in PayPal Developer Dashboard → REST API Apps
        </p>
      </div>
      <div>
        <label htmlFor="ppClientSecret" className="mb-1 block text-sm font-medium text-gray-700">
          Client Secret
        </label>
        <input
          id="ppClientSecret"
          type="password"
          placeholder="your_paypal_client_secret"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          required
          className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Mode</label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ppMode"
              value="sandbox"
              checked={mode === 'sandbox'}
              onChange={() => setMode('sandbox')}
              className="text-blue-600"
            />
            <span className="text-sm text-gray-700">Sandbox</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="ppMode"
              value="live"
              checked={mode === 'live'}
              onChange={() => setMode('live')}
              className="text-blue-600"
            />
            <span className="text-sm text-gray-700">Live</span>
          </label>
        </div>
      </div>
      <div className="rounded-lg border border-gray-200 p-4 space-y-2">
        <p className="text-xs font-medium text-gray-500">Webhook URL (configure in PayPal Developer Dashboard)</p>
        <code className="block rounded bg-gray-50 px-2 py-1.5 text-xs font-mono text-gray-700 break-all">
          {webhookUrl}
        </code>
      </div>
      <Button type="submit" disabled={status === 'loading' || !clientId.trim() || !clientSecret.trim()}>
        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
        {status === 'loading' ? 'Connecting...' : 'Test Connection & Connect'}
      </Button>
    </form>
  )
}

function PlaidCardInline({
  connected,
  institutionName,
  lastSync,
  onConnected,
  onDisconnected,
}: {
  connected: boolean
  institutionName: string
  lastSync: string | null
  onConnected: (name: string) => void
  onDisconnected: () => void
}) {
  const [syncing, setSyncing] = useState(false)
  const [message, setMessage] = useState('')

  async function handlePlaidSuccess(publicToken: string, name?: string, _institutionId?: string) {
    setSyncing(true)
    setMessage('')
    try {
      const res = await fetch('/api/plaid/exchange-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicToken, institutionName: name ?? 'Bank' }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Failed to connect')
      onConnected(json.institutionName ?? name ?? 'Bank')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to connect')
    }
    setSyncing(false)
  }

  async function handleDisconnect() {
    setSyncing(true)
    try {
      const res = await fetch('/api/plaid/disconnect', { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      onDisconnected()
    } catch {}
    setSyncing(false)
  }

  if (connected) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          <Check className="h-4 w-4" />
          Connected {institutionName ? `(${institutionName})` : ''}
          {lastSync && <> · Last synced: {new Date(lastSync).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDisconnect}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {syncing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            {syncing ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
        {message && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{message}</div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {message && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{message}</div>
      )}
      <p className="text-sm text-gray-600">
        Click the button below to securely connect your bank account via Plaid.
        You will be redirected to your bank to sign in and authorize access.
      </p>
      <PlaidLinkButton
        onSuccess={handlePlaidSuccess}
        onError={(err) => setMessage(err.message)}
        label="Connect Bank Account"
        variant="default"
      />
    </div>
  )
}

function StripeKeyFormInline() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('/dashboard/settings/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stripeKey: fd.get('stripeKey') }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed')
      }
      setStatus('success')
      setMessage('Stripe key saved and synced!')
      setTimeout(() => window.location.reload(), 1500)
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {status === 'success' && <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</div>}
      {status === 'error' && <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{message}</div>}
      <input
        name="stripeKey"
        type="password"
        placeholder="sk_live_..."
        required
        className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <p className="text-xs text-gray-500">Find this in Stripe Dashboard → Developers → API keys</p>
      <Button type="submit" disabled={status === 'loading'} size="sm">
        {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
        {status === 'loading' ? 'Saving...' : 'Save & Sync'}
      </Button>
    </form>
  )
}
