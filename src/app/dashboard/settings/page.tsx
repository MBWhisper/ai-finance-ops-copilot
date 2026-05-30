'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Check, User, Building2, Bell, Shield, Puzzle, Save, Loader2 } from 'lucide-react'
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

  // Workspace and notification preferences are now persisted server-side
  // via users.settings JSONB column — loaded above from DB on mount

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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account, workspace, and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 pb-px">
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
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
                      {!ic.connected && ic.key !== 'stripe' && (
                        <p className="text-[10px] text-gray-300">Integration setup coming soon</p>
                      )}
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
          </div>
        )}
      </div>
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
