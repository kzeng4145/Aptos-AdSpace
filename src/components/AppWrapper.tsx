'use client'

import { useState, useEffect } from 'react'
import Onboarding from './Onboarding'
import Home from '../app/page'

export default function AppWrapper() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding before
    const completed = localStorage.getItem('adspace-onboarding-completed')
    if (completed === 'true') {
      setShowOnboarding(false)
      setHasCompletedOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    // Mark onboarding as completed
    localStorage.setItem('adspace-onboarding-completed', 'true')
    setShowOnboarding(false)
    setHasCompletedOnboarding(true)
  }

  const resetOnboarding = () => {
    localStorage.removeItem('adspace-onboarding-completed')
    setShowOnboarding(true)
    setHasCompletedOnboarding(false)
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return (
    <div>
      <Home />
      {/* Debug button to reset onboarding - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={resetOnboarding}
          className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm z-50"
        >
          Reset Onboarding
        </button>
      )}
    </div>
  )
}
