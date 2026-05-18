'use client'

import { CopilotChat } from '@/components/copilot/CopilotChat'

export default function AIChatPage() {
  return (
    <div className="h-[calc(100vh-8rem)] relative">
      <CopilotChat page="dashboard" />
      {/* The floating CopilotChat button renders at bottom-right.
          Click it to open the full chat panel in-page. */}
      <div className="flex items-center justify-center h-full text-center">
        <div className="max-w-md">
          <p className="text-2xl mb-2">🤖</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Copilot</h2>
          <p className="text-sm text-gray-500 mb-4">
            Click the <strong>AI Copilot</strong> button in the bottom-right corner to start chatting.
          </p>
          <p className="text-xs text-gray-400">
            Powered by GPT-4o-mini · Supports Arabic &amp; English
          </p>
        </div>
      </div>
    </div>
  )
}
