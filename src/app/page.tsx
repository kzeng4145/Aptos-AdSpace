'use client'

import { useState, useEffect } from 'react'
import { Search, Heart, BarChart3, Users } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRainbowWallet } from '../hooks/useRainbowWallet'
import Onboarding from '../components/Onboarding'
import { UserBalance } from '../components/UserBalance'
import EchoChat from '../components/EchoChat'
import { isSignedIn } from "@/echo"
import Link from 'next/link'

function Home() {
  const [activeTab, setActiveTab] = useState('Tik Tok')
  const [bidAmount, setBidAmount] = useState('0.01')
  const [isBidding, setIsBidding] = useState(false)
  const [bidSuccess, setBidSuccess] = useState(false)
  const [userBids, setUserBids] = useState([])
  const [showMarkiplierSection, setShowMarkiplierSection] = useState(false)
  
  // Echo authentication check - temporarily disabled for onboarding
  // if (!isSignedIn()) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-[#0B0B0F] to-[#13131A] text-white flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-4xl font-bold mb-4">Welcome to AdSpace</h1>
  //         <p className="text-gray-400 mb-8">Sign in to access AI-powered advertising tools</p>
  //         <a 
  //           href="/api/echo/signin"
  //           className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
  //         >
  //           Sign In with Echo
  //         </a>
  //       </div>
  //     </div>
  //   )
  // }
  
  // RainbowKit wallet connection
  const { 
    isConnected, 
    address, 
    ethBalance,
    placeETHBid,
    isTransferPending
  } = useRainbowWallet()

  const categories = ['Tik Tok', 'Youtube', 'Reels', 'X']
  const influencers = ['MRBEAST', 'EMMA CHAMBERLAIN', 'CHARLI D\'AMELIO', 'MARK ROBER']
  const socialIcons = [
    { name: 'YouTube', color: 'bg-red-600' },
    { name: 'X', color: 'bg-black' },
    { name: 'TikTok', color: 'bg-black' },
    { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' }
  ]
  const kpiData = [
    { number: '63M', label: 'views in the last 30 days' },
    { number: '13th', label: 'Games rank' },
    { number: '63M', label: 'views in the last 30 days' }
  ]
  const bidders = [
    { name: '0x742d...35Cc', time: '10:33:13', amount: '0.05 ETH', avatar: '1' },
    { name: '0x8f2a...9b3d', time: '10:28:45', amount: '0.03 ETH', avatar: '2' },
    { name: '0x5c7e...1f9a', time: '10:15:22', amount: '0.02 ETH', avatar: '3' }
  ]


  const handleBid = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first!')
      return
    }

    if (!bidAmount || parseFloat(bidAmount) <= 0) {
      alert('Please enter a valid bid amount!')
      return
    }

    setIsBidding(true)
    
    try {
      // Place real ETH bid using RainbowKit
      const result = await placeETHBid(bidAmount)
      
      console.log('ETH Bid Transaction:', result.hash)
      
      // Add user's bid to live bids
      const newBid = {
        id: `user-${Date.now()}`,
        creator: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'You',
        content: "30 seconds on YouTube",
        price: `${bidAmount} ETH`,
        status: "Live",
        isAccepted: false,
        isUser: true,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      }
      
      setUserBids(prev => [newBid, ...prev])
      
      // Save to localStorage for persistence
      const updatedBids = [newBid, ...userBids]
      localStorage.setItem('adspace-user-bids', JSON.stringify(updatedBids))
      
      setIsBidding(false)
      setBidSuccess(true)
      alert(`🎯 Ad Slot Bid Placed Successfully!\n\n💰 Bid Amount: ${bidAmount} ETH\n📺 Ad Slot: 30 seconds on YouTube (Markiplier)\n🔗 Transaction: ${result.hash}\n\nYour bid is now live and competing for the ad slot!`)
      setBidAmount('')
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setBidSuccess(false)
      }, 5000)
    } catch (error: any) {
      setIsBidding(false)
      alert(`ETH Bid failed: ${error.message}`)
    }
  }

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

            {/* Category Tabs */}
            <div className="hidden md:flex items-center space-x-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === category
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-white border border-transparent'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="flex-1 max-w-lg mx-8 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a content creator"
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-[#23232E] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/bids"
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white border border-transparent rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>Your Bids</span>
              </Link>
              <Link 
                href="/analytics"
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white border border-transparent rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>AI Tools</span>
              </Link>
              <UserBalance />
              <ConnectButton />
              <Heart className="w-6 h-6 text-gray-400" />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 lg:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a content creator"
                className="w-full pl-4 pr-12 py-3 bg-white/5 border border-[#23232E] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Influencer Strip */}
        <div className="my-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {influencers.map((influencer, index) => (
              <div
                key={index}
                className="bg-[#13131A] border border-[#23232E] rounded-2xl aspect-square flex items-center justify-center card-lift cursor-pointer group relative overflow-hidden"
              >
                {influencer === 'MRBEAST' ? (
                  <>
                    <img 
                      src="https://i.imgur.com/0yOjJxi.png" 
                      alt="MrBeast"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </>
                ) : influencer === 'EMMA CHAMBERLAIN' ? (
                  <>
                    <img 
                      src="https://i.imgur.com/kbscjQx.png" 
                      alt="Emma Chamberlain"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </>
                ) : influencer === 'MARK ROBER' ? (
                  <>
                    <img 
                      src="https://i.imgur.com/8Hv3Les.png" 
                      alt="Mark Rober"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </>
                ) : influencer === 'CHARLI D\'AMELIO' ? (
                  <>
                    <img 
                      src="https://i.imgur.com/IId7U55.png" 
                      alt="Charli D'Amelio"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </>
                ) : (
                  <h3 className="font-bold text-lg text-white uppercase tracking-wide">
                    {influencer}
                  </h3>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Adspace Agent Section */}
        <div className="my-8">
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
            <EchoChat onQueryMade={() => setShowMarkiplierSection(true)} />
          </div>
        </div>

        {/* Featured Section - Markiplier Profile (Hidden until query) */}
        {showMarkiplierSection && (
        <div className="my-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Image - 45% width */}
            <div className="lg:col-span-5">
              <div className="bg-[#13131A] border border-[#23232E] rounded-2xl h-[700px] relative overflow-hidden">
                <img 
                  src="https://i.imgur.com/syvnU0h.png" 
                  alt="Markiplier Featured"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
            </div>

            {/* Creator Panel - 55% width */}
            <div className="lg:col-span-7 space-y-6">
              {/* Creator Header */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-2xl font-bold text-white">Markiplier</h3>
                  <div className="verified-badge ml-2"></div>
                </div>
                <div className="text-gray-400 text-sm">
                  @markiplier • 37.8M subscribers • 5.7K videos
                </div>
              </div>

              {/* KPI Chips */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {kpiData.map((kpi, index) => (
                  <div key={index} className="bg-[#13131A] border border-[#23232E] rounded-xl p-4 cursor-pointer transition-all duration-300 hover:bg-[#1A1A1F] hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105">
                    <div className="text-2xl font-bold text-white mb-1">{kpi.number}</div>
                    <div className="text-sm text-gray-400 leading-tight">{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Current Auction Card */}
              <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <h4 className="text-lg font-semibold text-white">CURRENT AUCTION</h4>
                </div>
                <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded uppercase font-semibold">New</span>
                      <span className="text-lg font-semibold text-white">30 seconds on YouTube</span>
                    </div>
                    <div className="text-right text-xs text-gray-300 space-y-1">
                      <div>Sponsored mention</div>
                      <div>Pre-roll</div>
                      <div>YouTube & YouTube Shorts</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Countdown & Bids Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Countdown Section */}
            <div>
              <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">COUNTDOWN</h3>
                  <div className="bg-white/5 border border-[#23232E] rounded-lg px-3 py-1 text-xs text-gray-400">
                    December 12, 2025 • 11:59:59 PM
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-white">4d 7h remaining</span>
                    <span className="text-sm text-gray-400">75%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bids Panel */}
            <div>
              <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Live Bids</h3>
                  <div className="flex space-x-4">
                    <button className="text-sm text-gray-400 hover:text-white">See all</button>
                    <div className="flex space-x-2 text-sm">
                      <button className="text-gray-400 hover:text-white">Other actions</button>
                      <span className="text-gray-600">•</span>
                      <button className="text-gray-400 hover:text-white">Contact</button>
                    </div>
                  </div>
                </div>

                {/* Bid List */}
                <div className="space-y-4 mb-6">
                  {/* User Bids (Recent) */}
                  {userBids.map((bid, index) => (
                    <div key={`user-${index}`} className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          👤
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-400 flex items-center space-x-2">
                            <span>{bid.name}</span>
                            <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">You</span>
                          </div>
                          <div className="text-xs text-gray-400">{bid.time}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-green-400">{bid.amount}</div>
                    </div>
                  ))}
                  
                  {/* Static Bids */}
                  {bidders.map((bidder, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          👤
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{bidder.name}</div>
                          <div className="text-xs text-gray-400">{bidder.time}</div>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-white">{bidder.amount}</div>
                    </div>
                  ))}
                </div>

                {/* Bid Input */}
                <div className="border-t border-[#23232E] pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-white">BID WITH ETH</span>
                    <span className="text-xs text-blue-400">Balance: {ethBalance} ETH</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="0.01"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="w-full pl-4 pr-4 py-3 bg-white/5 border border-[#23232E] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                        placeholder="0.01"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                        ETH
                      </div>
                    </div>
                    <button 
                      onClick={handleBid}
                      disabled={isBidding || !bidAmount || parseFloat(bidAmount) <= 0}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        isBidding 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : bidSuccess
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      } text-white`}
                    >
                      {isBidding ? 'Bidding...' : bidSuccess ? 'Success!' : 'Submit Bid'}
                    </button>
                  </div>
                  
                  {!isConnected && (
                    <div className="mt-3 text-sm text-yellow-400">
                      ⚠️ Connect your wallet to place an ETH bid
                    </div>
                  )}
                  
                  {isConnected && (
                    <div className="mt-3 text-sm text-blue-400">
                      💡 Demo: This will send 0.01 ETH to the demo address. Make sure you're on Sepolia testnet!
                    </div>
                  )}
                  
                  {isConnected && parseFloat(ethBalance) < parseFloat(bidAmount || '0') && (
                    <div className="mt-3 text-sm text-red-400">
                      ❌ Insufficient ETH balance
                    </div>
                  )}
                  
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </main>

    </div>
  )
}

export default function Page() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    // For development: always show onboarding first
    localStorage.removeItem('adspace-onboarding-completed')
    setShowOnboarding(true)
    setHasCompletedOnboarding(false)
  }, [])

  const handleOnboardingComplete = () => {
    // Mark onboarding as completed
    localStorage.setItem('adspace-onboarding-completed', 'true')
    setShowOnboarding(false)
    setHasCompletedOnboarding(true)
  }

  if (showOnboarding) {
    console.log('Showing onboarding screens')
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return <Home />
}