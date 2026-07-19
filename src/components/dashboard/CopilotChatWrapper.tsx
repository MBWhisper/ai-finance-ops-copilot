'use client'

import dynamic from 'next/dynamic'

const CopilotChat = dynamic(() => import('@/components/copilot/CopilotChat').then(m => m.CopilotChat), { ssr: false })

export { CopilotChat }
