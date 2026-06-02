import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — AI Finance Ops',
  description: 'How AI Finance Ops collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Last updated: June 02, 2026
      </p>

      <section className="space-y-8 text-base leading-relaxed">

        <div>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>AI Finance Ops (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates aifinanceops.app. This Privacy Policy explains how we collect, use, store, and protect your personal and financial data. By using our service, you agree to the practices described here.</p>
          <p className="mt-2">Contact: <a href="mailto:privacy@aifinanceops.app" className="underline">privacy@aifinanceops.app</a></p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account info:</strong> Name, email, password (hashed — never stored in plaintext)</li>
            <li><strong>Bank data via Plaid:</strong> Account balances, transaction history, institution name</li>
            <li><strong>PayPal data:</strong> Revenue, payouts, transaction summaries</li>
            <li><strong>Usage data:</strong> Pages visited, features used, session duration</li>
            <li><strong>Error logs:</strong> Anonymized crash reports via Sentry</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and operate the service</li>
            <li>Generate financial reports and analytics</li>
            <li>Send transactional emails (receipts, alerts)</li>
            <li>Improve product features</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="mt-2 font-medium">We never sell your personal or financial data to third parties.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
          <p>We share data only with essential service providers:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Plaid</strong> — bank account connectivity (<a href="https://plaid.com/legal" className="underline" target="_blank">plaid.com/legal</a>)</li>
            <li><strong>PayPal</strong> — transaction data retrieval</li>
            <li><strong>LemonSqueezy</strong> — payment processing</li>
            <li><strong>Supabase</strong> — encrypted database storage</li>
            <li><strong>Vercel</strong> — hosting</li>
            <li><strong>Sentry</strong> — anonymized error monitoring</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All data transmitted over <strong>TLS 1.3</strong></li>
            <li>Data at rest encrypted with <strong>AES-256</strong> via Supabase</li>
            <li>Plaid tokens stored as encrypted environment variables</li>
            <li>MFA enforced for all internal system access</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Data Retention</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Account data: until deletion + 30 days</li>
            <li>Financial reports: 12 months</li>
            <li>Plaid transaction data: 90-day rolling window</li>
            <li>Billing records: 7 years (legal requirement)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
          <p>You have the right to access, correct, delete, or export your data. To exercise any right, email: <a href="mailto:privacy@aifinanceops.app" className="underline">privacy@aifinanceops.app</a>. We respond within 30 days.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Third-Party Financial Data (Plaid)</h2>
          <p>When you connect your bank via Plaid, we access only the data needed to generate your reports. We do not sell or share your financial data. You can disconnect at any time from Settings.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Cookies</h2>
          <p>We use essential cookies for authentication only. No advertising or tracking cookies are used.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">10. Contact</h2>
          <p>
            Privacy: <a href="mailto:privacy@aifinanceops.app" className="underline">privacy@aifinanceops.app</a><br/>
            Security: <a href="mailto:security@aifinanceops.app" className="underline">security@aifinanceops.app</a>
          </p>
        </div>

      </section>
    </main>
  )
}
