'use client'

function retentionColor(v: number | null): string {
  if (v === null || v === undefined) return 'bg-gray-50 text-gray-300'
  if (v >= 70) return 'bg-green-100 text-green-800'
  if (v >= 40) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

interface CohortRow {
  cohort: string
  size: number
  values: (number | null)[]
}

const COHORT_DATA: CohortRow[] = [
  { cohort: 'Jan 2026', size: 24, values: [100, 72, 61, 58, 45, 38] },
  { cohort: 'Feb 2026', size: 31, values: [100, 68, 55, 48, null, null] },
  { cohort: 'Mar 2026', size: 18, values: [100, 75, null, null, null, null] },
]

const MONTH_LABELS = ['M+0', 'M+1', 'M+2', 'M+3', 'M+4', 'M+5']

export function CohortRetentionGrid() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Cohort</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">Size</th>
            {MONTH_LABELS.map(m => (
              <th key={m} className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase whitespace-nowrap">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {COHORT_DATA.map(row => (
            <tr key={row.cohort}>
              <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap sticky left-0 bg-white">{row.cohort}</td>
              <td className="px-3 py-2 text-gray-600">{row.size}</td>
              {row.values.map((v, i) => (
                <td key={i} className={`px-3 py-2 text-center text-xs font-medium ${retentionColor(v)}`}>
                  {v !== null ? `${v}%` : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
