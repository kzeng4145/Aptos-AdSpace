'use client'

import { useState } from 'react'
import { Search, Heart, BarChart3, TrendingUp, Users, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { AdvertiserDashboard } from '../../components/AdvertiserDashboard'
import { UserBalance } from '../../components/UserBalance'
import { EchoExample } from '../../components/EchoExample'
import Link from 'next/link'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const timeRanges = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' },
    { value: '1y', label: '1 year' }
  ]

  const analyticsData = {
    totalRevenue: 125000,
    totalViews: 12500000,
    totalSubscribers: 37800000,
    totalVideos: 5700,
    avgViewsPerVideo: 2193,
    engagementRate: 4.2,
    revenueGrowth: 12.5,
    viewsGrowth: 8.3,
    subscribersGrowth: 2.1
  }

  const recentAuctions = [
    {
      id: 1,
      title: "30 seconds on YouTube",
      status: "Active",
      currentBid: 3000,
      timeRemaining: "4d 7h",
      bidders: 12,
      revenue: 3000
    },
    {
      id: 2,
      title: "15 seconds on TikTok",
      status: "Ended",
      currentBid: 1800,
      timeRemaining: "Ended",
      bidders: 8,
      revenue: 1800
    },
    {
      id: 3,
      title: "45 seconds on Instagram",
      status: "Active",
      currentBid: 2500,
      timeRemaining: "2d 3h",
      bidders: 15,
      revenue: 2500
    }
  ]

  const topBidders = [
    { name: "BrandCorp Inc.", totalBids: 12, totalSpent: 45000, avgBid: 3750 },
    { name: "TechStart LLC", totalBids: 8, totalSpent: 32000, avgBid: 4000 },
    { name: "MediaGroup", totalBids: 15, totalSpent: 28000, avgBid: 1867 },
    { name: "AdAgency Pro", totalBids: 6, totalSpent: 22000, avgBid: 3667 }
  ]

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

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <UserBalance />
              <ConnectButton />
              <Heart className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Markiplier</h1>
                <p className="text-gray-400">Track your performance and earnings</p>
              </div>
              <div className="flex items-center space-x-2">
                <Link 
                  href="/"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white border border-transparent rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Marketplace</span>
                </Link>
                <div className="flex items-center space-x-2 px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-lg text-sm font-medium">
                  <BarChart3 className="w-4 h-4" />
                  <span>Analytics</span>
                </div>
                <Link 
                  href="/bids"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-400 hover:text-white border border-transparent rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Your Bids</span>
                </Link>
              </div>
            </div>
            
            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-[#13131A] border border-[#23232E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500/50"
              >
                {timeRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6 hover:bg-[#1A1A1F] hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                <DollarSign className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
              </div>
              <div className="flex items-center text-green-400 text-sm group-hover:text-green-300 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +{analyticsData.revenueGrowth}%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 group-hover:text-green-100 transition-colors duration-300">
              ${analyticsData.totalRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Total Revenue</div>
          </div>

          {/* Total Views */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6 hover:bg-[#1A1A1F] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                <TrendingUp className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              </div>
              <div className="flex items-center text-blue-400 text-sm group-hover:text-blue-300 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +{analyticsData.viewsGrowth}%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors duration-300">
              {(analyticsData.totalViews / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Total Views</div>
          </div>

          {/* Subscribers */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6 hover:bg-[#1A1A1F] hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                <Users className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              </div>
              <div className="flex items-center text-purple-400 text-sm group-hover:text-purple-300 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +{analyticsData.subscribersGrowth}%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-100 transition-colors duration-300">
              {(analyticsData.totalSubscribers / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Subscribers</div>
          </div>

          {/* Engagement Rate */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6 hover:bg-[#1A1A1F] hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                <BarChart3 className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              </div>
              <div className="flex items-center text-orange-400 text-sm group-hover:text-orange-300 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 mr-1" />
                +0.3%
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1 group-hover:text-orange-100 transition-colors duration-300">
              {analyticsData.engagementRate}%
            </div>
            <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Engagement Rate</div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Auctions */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6 hover:bg-[#1A1A1F] hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white group-hover:text-purple-100 transition-colors duration-300">Recent Auctions</h3>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {recentAuctions.map((auction) => (
                <div key={auction.id} className="flex items-center justify-between p-4 bg-[#1A1A1F] rounded-lg hover:bg-[#23232E] hover:border-purple-500/20 hover:shadow-md hover:shadow-purple-500/5 transition-all duration-300 cursor-pointer group/auction">
                  <div>
                    <div className="text-white font-medium group-hover/auction:text-purple-100 transition-colors duration-300">{auction.title}</div>
                    <div className="text-sm text-gray-400 group-hover/auction:text-gray-300 transition-colors duration-300">
                      {auction.bidders} bidders • {auction.timeRemaining}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold group-hover/auction:text-purple-100 transition-colors duration-300">
                      ${auction.currentBid.toLocaleString()}
                    </div>
                    <div className={`text-xs transition-colors duration-300 ${
                      auction.status === 'Active' ? 'text-green-400 group-hover/auction:text-green-300' : 'text-gray-400 group-hover/auction:text-gray-300'
                    }`}>
                      {auction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Bidders */}
          <div className="bg-[#13131A] border border-[#23232E] rounded-2xl p-6 hover:bg-[#1A1A1F] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer group">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white group-hover:text-blue-100 transition-colors duration-300">Top Bidders</h3>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300">
                View all
              </button>
            </div>
            
            <div className="space-y-4">
              {topBidders.map((bidder, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1A1A1F] rounded-lg hover:bg-[#23232E] hover:border-blue-500/20 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer group/bidder">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover/bidder:from-blue-500 group-hover/bidder:to-cyan-500 transition-all duration-300">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover/bidder:text-blue-100 transition-colors duration-300">{bidder.name}</div>
                      <div className="text-sm text-gray-400 group-hover/bidder:text-gray-300 transition-colors duration-300">
                        {bidder.totalBids} bids • Avg: ${bidder.avgBid.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold group-hover/bidder:text-blue-100 transition-colors duration-300">
                      ${bidder.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400 group-hover/bidder:text-gray-300 transition-colors duration-300">Total spent</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Echo Integration Example */}
        <div className="mb-8">
          <EchoExample />
        </div>

        {/* AI Tools Section */}
        <div className="mb-8">
          <AdvertiserDashboard />
        </div>

        {/* Channel Analytics */}
        <div className="w-full">
          <img 
            src="https://i.imgur.com/O8kxD4h.png" 
            alt="Channel Analytics"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </main>
    </div>
  )
}
