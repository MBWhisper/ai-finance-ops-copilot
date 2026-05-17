import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const OnboardingSteps = dynamic(
  () => import('@/components/onboarding/OnboardingSteps'),
  {
    loading: () => <OnboardingSkeleton />,
    ssr: false,
  }
)

function OnboardingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-lg animate-pulse space-y-4">
        <div className="h-2 rounded-full bg-gray-800" />
        <div className="h-8 bg-gray-800 rounded w-1/2" />
        <div className="h-4 bg-gray-800 rounded w-3/4" />
        <div className="h-12 bg-gray-800 rounded w-full mt-8" />
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingSkeleton />}>
      <OnboardingSteps />
    </Suspense>
  )
}
