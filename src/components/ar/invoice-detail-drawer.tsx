'use client'

import type { Invoice } from '@/lib/invoice-types'
import { InvoiceStatusBadge } from './invoice-status-badge'
import { formatCents, computeOverdueStatus, getReminderLabel, canSendReminder } from '@/lib/invoice-utils'

interface Props {
  invoice: Invoice | null
  open: boolean
  onClose: () => void
  onMarkPaid: (id: string) => void
  onSendReminder: (id: string) => void
  onEdit: (id: string) => void
}

export function InvoiceDetailDrawer({ invoice, open, onClose, onMarkPaid, onSendReminder, onEdit }: Props) {
  if (!open) return null

  // Handle background click/trap focus with a simple overlay
  const effectiveStatus = invoice ? computeOverdueStatus(invoice) : 'draft'
  const canRemind = invoice ? canSendReminder(invoice) : false

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-base font-semibold text-gray-900">{invoice?.customerName ?? 'Invoice'}</h2>
            <p className="text-xs text-gray-500">{invoice?.customerEmail}</p>
          </div>
          <button onClick={onClose} className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400" aria-label="Close">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {invoice && (
          <div className="p-6 space-y-6">
            {/* Status & ID */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Invoice #</p>
                <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
              </div>
              <InvoiceStatusBadge status={effectiveStatus} />
            </div>

            {/* Amount */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCents(invoice.amountCents)}</p>
              {effectiveStatus === 'overdue' && (
                <p className="text-xs text-red-600 mt-1">Overdue — action required</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Issue Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(invoice.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            {invoice.paidAt && (
              <div>
                <p className="text-xs text-gray-500">Paid At</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date(invoice.paidAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}

            {/* Line Items */}
            {invoice.lineItems.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Line Items</p>
                <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {invoice.lineItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2">
                      <div>
                        <p className="text-sm text-gray-900">{item.description}</p>
                        <p className="text-xs text-gray-400">qty {item.quantity} × {formatCents(item.unitPriceCents)}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{formatCents(item.totalCents)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reminder History */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Reminders</p>
                <span className="text-xs text-gray-400">{invoice.remindersSent}/3 sent</span>
              </div>
              {invoice.reminders.length === 0 ? (
                <p className="text-xs text-gray-400">No reminders sent yet.</p>
              ) : (
                <div className="space-y-2">
                  {invoice.reminders.map(r => (
                    <div key={r.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${r.type === 'escalation' ? 'bg-red-500' : r.type === 'second_overdue' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                        <div>
                          <p className="text-xs font-medium text-gray-700">{getReminderLabel(r.type)}</p>
                          <p className="text-[10px] text-gray-400">via {r.method}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">
                        {new Date(r.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {canRemind && (
                <button
                  onClick={() => onSendReminder(invoice.id)}
                  className="mt-3 w-full h-9 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Send Reminder
                </button>
              )}
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Notes</p>
                <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{invoice.notes}</p>
              </div>
            )}

            {/* Payment Link */}
            {invoice.paymentLink && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Link</p>
                <a href={invoice.paymentLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
                  {invoice.paymentLink}
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-gray-100 pt-4 flex gap-3">
              {effectiveStatus !== 'paid' && effectiveStatus !== 'draft' && (
                <button
                  onClick={() => onMarkPaid(invoice.id)}
                  className="flex-1 h-10 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Mark as Paid
                </button>
              )}
              {canRemind && (
                <button
                  onClick={() => onSendReminder(invoice.id)}
                  className="flex-1 h-10 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Send Reminder
                </button>
              )}
              <button
                onClick={() => onEdit(invoice.id)}
                className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 transition-colors"
                aria-label="Edit"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
