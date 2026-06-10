export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to your AI Finance dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'MRR', value: '$0', change: '+0%' },
          { label: 'ARR', value: '$0', change: '+0%' },
          { label: 'Active Users', value: '0', change: '+0%' },
          { label: 'Churn Rate', value: '0%', change: '0%' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-1">{kpi.change} from last month</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Getting Started</h2>
        <div className="space-y-3">
          {[
            { step: 1, title: 'Connect your payment provider', desc: 'Link Stripe or LemonSqueezy to start tracking revenue.' },
            { step: 2, title: 'View your Cash Flow forecast', desc: 'AI-powered 12-month runway predictions.' },
            { step: 3, title: 'Ask the AI Copilot', desc: 'Chat with your finance data in natural language.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">{step}</span>
              <div>
                <p className="text-sm font-medium text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
