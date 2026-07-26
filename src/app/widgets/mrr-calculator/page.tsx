export default function MRRWidget() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-lg font-bold mb-1">MRR Calculator</h2>
          <p className="text-gray-400 text-sm mb-4">Calculate your Monthly Recurring Revenue</p>

          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Number of Customers</label>
              <input
                type="number"
                id="widget-customers"
                placeholder="100"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Average Revenue Per User ($)</label>
              <input
                type="number"
                id="widget-arpu"
                placeholder="50"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <button
              id="widget-calc-btn"
              className="w-full rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
            >
              Calculate MRR
            </button>
          </div>

          <div id="widget-result" className="mt-4 hidden">
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
              <div className="text-xs text-emerald-400 uppercase tracking-wide mb-1">Monthly Recurring Revenue</div>
              <div id="widget-mrr" className="text-3xl font-bold text-emerald-400">$0</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-500">Quarterly</div>
                  <div id="widget-arr" className="text-white font-semibold">$0</div>
                </div>
                <div>
                  <div className="text-gray-500">Annual</div>
                  <div id="widget-arr2" className="text-white font-semibold">$0</div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-gray-500">
            Powered by{" "}
            <a
              href="https://aifinanceops.app/mrr-calculator?utm_source=widget"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              AI Finance Ops
            </a>
          </p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('widget-calc-btn').addEventListener('click', function() {
          var c = parseFloat(document.getElementById('widget-customers').value) || 0;
          var a = parseFloat(document.getElementById('widget-arpu').value) || 0;
          var mrr = c * a;
          document.getElementById('widget-mrr').textContent = '$' + mrr.toLocaleString();
          document.getElementById('widget-arr').textContent = '$' + (mrr * 3).toLocaleString();
          document.getElementById('widget-arr2').textContent = '$' + (mrr * 12).toLocaleString();
          document.getElementById('widget-result').classList.remove('hidden');
        });
      `}} />
    </div>
  )
}
