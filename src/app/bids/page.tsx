'use client'

import { useState, useEffect } from 'react'
import { Search, Heart, Users, BarChart3, CheckCircle, XCircle, Clock } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

export default function BidsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const [userBids, setUserBids] = useState([])
  
  const staticBidsData = [
    {
      id: 1,
      creator: "Markiplier",
      content: "30 seconds on YouTube",
      price: "0.05 ETH",
      status: "Bid accepted",
      isAccepted: true,
      isUser: false,
      date: "Dec 8, 2024"
    },
    {
      id: 2,
      creator: "Markiplier", 
      content: "30 seconds on YouTube",
      price: "0.03 ETH",
      status: "Unsuccessful",
      isAccepted: false,
      isUser: false,
      date: "Dec 7, 2024"
    },
    {
      id: 3,
      creator: "Markiplier",
      content: "30 seconds on YouTube", 
      price: "0.02 ETH",
      status: "Unsuccessful",
      isAccepted: false,
      isUser: false,
      date: "Dec 6, 2024"
    },
    {
      id: 4,
      creator: "Markiplier",
      content: "30 seconds on YouTube",
      price: "0.04 ETH", 
      status: "Unsuccessful",
      isAccepted: false,
      isUser: false,
      date: "Dec 5, 2024"
    },
    {
      id: 5,
      creator: "Markiplier",
      content: "30 seconds on YouTube",
      price: "0.01 ETH",
      status: "Unsuccessful", 
      isAccepted: false,
      isUser: false,
      date: "Dec 4, 2024"
    },
    {
      id: 6,
      creator: "Markiplier",
      content: "30 seconds on YouTube",
      price: "0.06 ETH",
      status: "Bid accepted",
      isAccepted: true,
      isUser: false,
      date: "Dec 3, 2024"
    },
    {
      id: 7,
      creator: "Markiplier",
      content: "30 seconds on YouTube",
      price: "0.02 ETH",
      status: "Unsuccessful",
      isAccepted: false,
      isUser: false,
      date: "Dec 2, 2024"
    },
    {
      id: 8,
      creator: "Markiplier", 
      content: "30 seconds on YouTube",
      price: "0.03 ETH",
      status: "Unsuccessful",
      isAccepted: false,
      isUser: false,
      date: "Dec 1, 2024"
    }
  ]

  // Load user bids from localStorage (simulating real-time tracking)
  useEffect(() => {
    const savedBids = localStorage.getItem('adspace-user-bids')
    if (savedBids) {
      setUserBids(JSON.parse(savedBids))
    }
  }, [])

  // Combine user bids with static bids
  const allBids = [...userBids, ...staticBidsData]

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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a content creator"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#13131A] border border-[#23232E] rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white border border-transparent rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Marketplace</span>
              </Link>
              <Link 
                href="/analytics"
                className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white border border-transparent rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
              <ConnectButton />
              <Heart className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your bids</h1>
          <p className="text-gray-400">Track all your ad slot bids and their status</p>
        </div>

        {/* Bids Table */}
        <div className="bg-[#13131A] border border-[#23232E] rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-[#23232E]">
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">CREATOR</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">CONTENT</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">PRICE</div>
            <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">STATUS</div>
          </div>

          {/* Bids List */}
          <div className="divide-y divide-[#23232E]">
            {allBids.map((bid, index) => (
              <div 
                key={bid.id || `user-${index}`} 
                className={`grid grid-cols-4 gap-4 p-6 hover:bg-[#1A1A1F] transition-colors duration-200 ${
                  bid.isAccepted ? 'bg-purple-500/5 border-l-4 border-l-purple-500' : ''
                } ${bid.isUser ? 'bg-green-500/5 border-l-4 border-l-green-500' : ''}`}
              >
                {/* Creator */}
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    bid.isUser ? 'bg-green-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {bid.isUser ? '👤' : 'M'}
                  </div>
                  <div>
                    <div className="text-white font-medium flex items-center space-x-2">
                      <span>{bid.creator}</span>
                      {bid.isUser && (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">You</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{bid.date}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-white font-medium">{bid.content}</div>

                {/* Price */}
                <div className="text-white font-semibold">{bid.price}</div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  {bid.isAccepted ? (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-lg text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>{bid.status}</span>
                    </div>
                  ) : bid.status === 'Live' ? (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      <span>Live</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-500/10 text-gray-400 rounded-lg text-sm font-medium">
                      <XCircle className="w-4 h-4" />
                      <span>{bid.status}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {allBids.filter(bid => bid.isAccepted).length}
            </div>
            <div className="text-sm text-gray-400">Accepted Bids</div>
          </div>

          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {allBids.filter(bid => bid.status === 'Unsuccessful').length}
            </div>
            <div className="text-sm text-gray-400">Unsuccessful Bids</div>
          </div>

          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {allBids.filter(bid => bid.status === 'Live').length}
            </div>
            <div className="text-sm text-gray-400">Live Bids</div>
          </div>

          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Heart className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {allBids
                .filter(bid => bid.isAccepted)
                .reduce((total, bid) => {
                  const amount = parseFloat(bid.price.replace(' ETH', ''))
                  return total + amount
                }, 0)
                .toFixed(2)} ETH
            </div>
            <div className="text-sm text-gray-400">Total Spent</div>
          </div>
        </div>
      </main>
    </div>
  )
}
