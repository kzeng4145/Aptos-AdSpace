'use client'

import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { ChevronLeft, ChevronRight, Wallet, Users, BarChart3, Heart, Search, Zap } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const { isConnected } = useAccount()

  const steps = [
    {
      id: 'wallet',
      title: 'Connect your wallet',
      description: 'Connect your wallet to get paid directly and securely. Linking your crypto wallet ensures fast, transparent payouts from your successful ad auctions. Your funds go straight to you — no middlemen, no delays.',
      icon: <Wallet className="w-8 h-8" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-[#13131A] border border-[#23232E] rounded-xl hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/qSl86kU.png" 
                  alt="MetaMask"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium">MetaMask</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#13131A] border border-[#23232E] rounded-xl hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/VVkKSSb.png" 
                  alt="WalletConnect"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium">WalletConnect</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#13131A] border border-[#23232E] rounded-xl hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/1Ws7qvO.png" 
                  alt="Brave"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium">Brave</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#13131A] border border-[#23232E] rounded-xl hover:border-purple-500/50 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/9uNDGR2.png" 
                  alt="Coinbase"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium">Coinbase</span>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <ConnectButton />
          </div>
        </div>
      )
    },
    {
      id: 'linking',
      title: 'Linking your accounts',
      description: 'Link your social accounts to showcase your reach. By securely connecting your YouTube, TikTok, or Instagram, we can verify your channel analytics (subscribers, views, engagement) and display them on your profile for advertisers. This helps brands see the full value of your audience while keeping your login details private.',
      icon: <Users className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center space-x-4 p-4 bg-red-600 hover:bg-red-700 border border-red-500/30 rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/qfR9bS0.png" 
                  alt="YouTube"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">YouTube</h3>
                <p className="text-red-200 text-sm">Connect your channel</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-4 p-4 bg-black hover:bg-gray-900 border border-gray-600 rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/TD54BNF.png" 
                  alt="X"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">X</h3>
                <p className="text-gray-300 text-sm">Connect your profile</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-4 p-4 bg-black hover:bg-gray-900 border border-gray-600 rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/EB7qVeS.png" 
                  alt="TikTok"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">TikTok</h3>
                <p className="text-gray-300 text-sm">Connect your account</p>
              </div>
            </button>
            
            <button className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border border-purple-500/30 rounded-xl transition-colors">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="https://i.imgur.com/63gICh7.png" 
                  alt="Instagram"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold">Instagram</h3>
                <p className="text-purple-200 text-sm">Connect your profile</p>
              </div>
            </button>
          </div>
          
          {/* Analytics Preview */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Track Your Analytics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">2.4M</div>
                <div className="text-gray-400 text-sm">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">378K</div>
                <div className="text-gray-400 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">15.2%</div>
                <div className="text-gray-400 text-sm">Engagement</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              Your verified analytics will be displayed to advertisers to showcase your reach and engagement
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'bid',
      title: 'Place your bids',
      description: 'Bid on premium ad slots with top creators. Set your budget, choose your target audience, and let the auction system find the best matches for your campaigns.',
      icon: <Zap className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="bg-[#13131A] border border-[#23232E] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Markiplier</h3>
                  <p className="text-gray-400 text-sm">378M subscribers</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 font-semibold">0.05 ETH</p>
                <p className="text-gray-400 text-sm">Current bid</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">30 seconds on YouTube</span>
                <span className="text-white text-sm">Sponsored • Pre-roll</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-gray-400 text-sm">4d 7h remaining</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      title: 'Track performance',
      description: 'Monitor your campaign performance with detailed analytics. See real-time metrics, track ROI, and optimize your bidding strategy for maximum impact.',
      icon: <BarChart3 className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-[#13131A] border border-[#23232E] rounded-xl text-center">
              <div className="text-2xl font-bold text-white mb-1">2.4M</div>
              <div className="text-gray-400 text-sm">Total Views</div>
            </div>
            <div className="p-4 bg-[#13131A] border border-[#23232E] rounded-xl text-center">
              <div className="text-2xl font-bold text-white mb-1">15.2%</div>
              <div className="text-gray-400 text-sm">Engagement Rate</div>
            </div>
            <div className="p-4 bg-[#13131A] border border-[#23232E] rounded-xl text-center">
              <div className="text-2xl font-bold text-white mb-1">$12.4K</div>
              <div className="text-gray-400 text-sm">Revenue</div>
            </div>
          </div>
          <div className="bg-[#13131A] border border-[#23232E] rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Your Bids</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Markiplier - 30s YouTube</span>
                <span className="text-green-400 text-sm">0.05 ETH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Emma Chamberlain - TikTok</span>
                <span className="text-green-400 text-sm">0.03 ETH</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Auto-advance from wallet step when connected
  useEffect(() => {
    if (currentStep === 0 && isConnected) {
      const timer = setTimeout(() => {
        setCurrentStep(1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isConnected, currentStep])

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B0F] to-[#13131A] text-white">
      {/* Header */}
      <nav className="border-b border-[#23232E] py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img 
                  src="https://i.imgur.com/zuUGkaG.png" 
                  alt="Adspace Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-white">Adspace</span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-8">
              <button className="text-gray-400 hover:text-white transition-colors">TikTok</button>
              <button className="text-gray-400 hover:text-white transition-colors">YouTube</button>
              <button className="text-gray-400 hover:text-white transition-colors">Reels</button>
              <button className="text-gray-400 hover:text-white transition-colors">X</button>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a content creator"
                  className="w-full pl-4 pr-4 py-3 bg-white/5 border border-[#23232E] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Heart className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="w-full bg-[#23232E] h-1">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicator */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center">
              <span className="text-purple-400 font-bold">{String(currentStep + 1).padStart(2, '0')}</span>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{currentStepData.title}</h1>
              <p className="text-gray-400 text-lg leading-relaxed">{currentStepData.description}</p>
            </div>
            <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center">
              {currentStepData.icon}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-12">
            {currentStepData.content}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-[#13131A] border border-[#23232E] text-white hover:border-purple-500/50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-purple-500 w-8'
                      : index < currentStep
                      ? 'bg-purple-500/50'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-medium transition-all"
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
