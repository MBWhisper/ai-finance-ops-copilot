import { useState, useCallback } from 'react'
import { buildCopilotContext } from '@/lib/copilot-context'

export interface CopilotMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function useCopilot(page: string = 'dashboard', pageData?: any) {
  const [messages, setMessages] = useState<CopilotMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return

    setError(null)

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage.trim(),
      timestamp: new Date(),
    }

    const assistantMsg: CopilotMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMsg, assistantMsg])
    setIsLoading(true)

    try {
      const context = buildCopilotContext(page, pageData)

      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context }),
      })

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('تجاوزت الحد المسموح. حاول بعد ساعة. / Rate limit exceeded. Try again in 1 hour.')
        }
        throw new Error('حدث خطأ. / An error occurred.')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ') && !line.includes('[DONE]')) {
            try {
              const { text } = JSON.parse(line.slice(6))
              if (text) {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMsg.id
                      ? { ...msg, content: msg.content + text }
                      : msg
                  )
                )
              }
            } catch {}
          }
        }
      }
    } catch (err: any) {
      setError(err.message)
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantMsg.id
            ? { ...msg, content: err.message || 'حدث خطأ غير متوقع. / Unexpected error.' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }, [page, pageData, isLoading])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}
