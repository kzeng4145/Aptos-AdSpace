import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Adspace - Decentralized Ad Marketplace',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [sepolia, mainnet, polygon, arbitrum, optimism, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
})
