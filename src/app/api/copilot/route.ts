import { OpenAI } from 'openai'
import { NextRequest } from 'next/server'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { message, context } = await req.json()

  const systemPrompt = `You are an expert AI financial copilot built into "AI Finance Ops" — 
a SaaS financial intelligence platform for founders.

Current user financial data:
${JSON.stringify(context, null, 2)}

Rules:
- ALWAYS respond in the SAME language as the user's message
  (Arabic message → Arabic response, English message → English response)
- Be concise, specific, and data-driven
- Reference the user's actual numbers when answering
- Give actionable advice, not generic tips
- Format numbers with $ and commas (e.g., $72,600)
- Use bullet points for lists
- Max 150 words unless a detailed analysis is requested
- For predictions, use the trend data to calculate realistic estimates
- Tone: smart, direct, like a CFO advisor

You can help with:
- MRR/ARR analysis and growth projections
- Churn analysis and reduction strategies
- Invoice and cash flow insights
- PMF score interpretation
- LTV and unit economics
- Financial forecasting and runway calculations`

  let stream
  try {
    stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      stream: true,
      max_tokens: 400,
      temperature: 0.7,
    })
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status
    if (status === 429) {
      return new Response(
        JSON.stringify({ error: 'AI service is temporarily unavailable due to high demand. Please try again shortly.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content || ''
        if (text) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}

`))
        }
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'))
      controller.close()
    }
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
