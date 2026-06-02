'use client'
import { useState, useRef, useEffect } from 'react'
import { useCopilot } from '@/hooks/use-copilot'
import { Send, Sparkles, X, RotateCcw, Maximize2, Minimize2, GripHorizontal } from 'lucide-react'

const SUGGESTED_PROMPTS = {
  ar: [
    'حلل معدل الاضطراب لدي وقدم توصيات',
    'متى سأصل إلى مليون دولار ARR؟',
    'ما توقعك لـ MRR خلال 3 أشهر؟',
    'أي الفواتير تحتاج متابعة عاجلة؟',
    'كيف أحسّن معدل الاحتفاظ بالعملاء؟',
  ],
  en: [
    'Analyze my churn rate and give recommendations',
    'When will I hit $1M ARR at current growth?',
    'Forecast my MRR for the next 3 months',
    'Which invoices need urgent follow-up?',
    'How can I improve my retention rate?',
  ],
}

interface Props {
  page?: string
  pageData?: any
}

export function CopilotChat({ page = 'dashboard', pageData }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [input, setInput] = useState('')
  const [promptLang, setPromptLang] = useState<'ar' | 'en'>('ar')
  const [btnPos, setBtnPos] = useState<{ top: number; left: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const dragRef = useRef<{ offsetX: number; offsetY: number } | null>(null)
  const dragMovedRef = useRef(false)

  function onPointerDown(e: React.PointerEvent) {
    const btn = btnRef.current
    if (!btn) return
    btn.setPointerCapture(e.pointerId)
    const rect = btn.getBoundingClientRect()
    dragMovedRef.current = false
    setIsDragging(false)
    dragRef.current = {
      offsetX: e.clientX - (btnPos?.left ?? rect.left),
      offsetY: e.clientY - (btnPos?.top ?? rect.top),
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    const drag = dragRef.current
    if (!drag) return
    dragMovedRef.current = true
    setIsDragging(true)
    const btnW = btnRef.current?.offsetWidth ?? 48
    const btnH = btnRef.current?.offsetHeight ?? 48
    const safeBottom = window.innerWidth < 640 ? 80 : 24
    const newLeft = Math.max(8, Math.min(e.clientX - drag.offsetX, window.innerWidth - btnW - 8))
    const newTop = Math.max(8, Math.min(e.clientY - drag.offsetY, window.innerHeight - btnH - safeBottom))
    setBtnPos({ top: newTop, left: newLeft })
  }

  function onPointerUp() {
    setIsDragging(false)
    if (!dragMovedRef.current) {
      setIsOpen(o => !o)
    }
    dragRef.current = null
  }

  const { messages, isLoading, sendMessage, clearMessages } = useCopilot(page, pageData)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100)
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const msg = input.trim()
    setInput('')
    await sendMessage(msg)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
    if (e.key === 'Escape') setIsOpen(false)
  }

  const panelClass = isFullscreen
    ? 'fixed inset-4 z-50 flex flex-col'
    : 'fixed bottom-20 right-6 z-50 w-[400px] max-h-[600px] flex flex-col'

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed z-50 ${isDragging ? 'will-change-transform' : ''} ${!btnPos ? 'bottom-20 right-4 sm:bottom-6 sm:right-6' : ''}`}
        style={btnPos ? { top: btnPos.top, left: btnPos.left } : undefined}
      >
        <button
          ref={btnRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          type="button"
          className={`
            w-11 h-11
            sm:w-auto sm:min-w-[130px] sm:h-10
            rounded-full flex items-center justify-center gap-1.5
            bg-emerald-500 hover:bg-emerald-600 text-white
            shadow-md shadow-emerald-500/20 transition-shadow duration-200
            select-none touch-none cursor-grab active:cursor-grabbing
            shrink-0 overflow-hidden
            ${isDragging ? '' : 'hover:scale-105 active:scale-95'}
          `}
          aria-label="Toggle AI Copilot"
        >
          <span className="cursor-grab active:cursor-grabbing hidden sm:block shrink-0">
            <GripHorizontal size={14} className="opacity-60" />
          </span>
          <Sparkles size={18} className="shrink-0" />
          <span className="text-sm font-medium hidden sm:inline whitespace-nowrap shrink-0">AI Copilot</span>
          {messages.length > 0 && (
            <span className="w-4 h-4 sm:w-5 sm:h-5 bg-white text-emerald-600 rounded-full text-[9px] sm:text-xs
                            flex items-center justify-center font-bold shrink-0">
              {messages.filter(m => m.role === 'assistant' && m.content).length}
            </span>
          )}
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className={`${panelClass} bg-[#0f1624] border border-white/10 rounded-2xl shadow-2xl overflow-hidden`}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#111827] shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Sparkles size={14} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Copilot</p>
                <p className="text-xs text-slate-400">
                  {isLoading ? '⚡ جاري التفكير... / Thinking...' : '● متصل / Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={clearMessages}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                title="مسح المحادثة / Clear chat"
              >
                <RotateCcw size={14} className="text-slate-400" />
              </button>
              <button
                onClick={() => setIsFullscreen(f => !f)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                title="ملء الشاشة / Fullscreen"
              >
                {isFullscreen
                  ? <Minimize2 size={14} className="text-slate-400" />
                  : <Maximize2 size={14} className="text-slate-400" />
                }
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 text-center pt-2">
                  اسألني عن بياناتك المالية
                  <br />Ask me about your finances
                </p>

                {/* Language toggle */}
                <div className="flex gap-2 justify-center">
                  {(['ar', 'en'] as const).map(lang => (
                    <button
                      key={lang}
                      onClick={() => setPromptLang(lang)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        promptLang === lang
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                    >
                      {lang === 'ar' ? 'عربي' : 'English'}
                    </button>
                  ))}
                </div>

                {/* Suggested prompts */}
                <div className="space-y-2">
                  {SUGGESTED_PROMPTS[promptLang].map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => { setInput(prompt); inputRef.current?.focus() }}
                      dir={promptLang === 'ar' ? 'rtl' : 'ltr'}
                      className="w-full text-xs px-3 py-2.5 bg-white/5 hover:bg-emerald-500/10
                                 border border-white/10 hover:border-emerald-500/30 rounded-xl
                                 text-slate-300 transition-all duration-150 text-right"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    dir="auto"
                    className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
                      ${msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-br-sm'
                        : 'bg-white/10 text-slate-200 rounded-bl-sm'
                      }`}
                  >
                    {msg.content || (
                      msg.role === 'assistant' && isLoading && (
                        <span className="flex gap-1 items-center py-0.5">
                          {[0, 150, 300].map(delay => (
                            <span
                              key={delay}
                              className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-[#111827] shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="اسأل عن MRR، الاضطراب، التوقعات... / Ask about MRR, churn, forecasts..."
                dir="auto"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2
                          text-sm text-white placeholder:text-slate-500 resize-none
                          focus:outline-none focus:border-emerald-500/50 transition-colors
                          min-h-[40px] max-h-[120px] disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40
                          disabled:cursor-not-allowed rounded-xl transition-all duration-150
                          hover:scale-105 active:scale-95 shrink-0"
                aria-label="Send"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 text-center">
              Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      )}
    </>
  )
}
