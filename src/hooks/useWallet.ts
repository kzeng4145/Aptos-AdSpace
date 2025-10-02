import { useState, useEffect } from 'react'
import { BrowserProvider, parseEther, formatEther, formatUnits, parseUnits } from 'ethers'
import { USDCBidding } from '../contracts/USDCBidding'

interface WalletState {
  isConnected: boolean
  address: string
  balance: string
  usdcBalance: string
  provider: BrowserProvider | null
  signer: any | null
  usdcBidding: USDCBidding | null
  error: string | null
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: '',
    balance: '',
    usdcBalance: '',
    provider: null,
    signer: null,
    usdcBidding: null,
    error: null
  })

  const connectWallet = async () => {
    try {
      setWalletState(prev => ({ ...prev, error: null }))
      
      console.log('🔍 Detecting MetaMask provider...')
      
      // Check if window.ethereum exists
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not detected. Please install MetaMask browser extension.')
      }
      
      // Use window.ethereum directly
      const provider = window.ethereum
      
      console.log('📦 Provider detected:', provider)
      console.log('🔗 Provider isMetaMask:', provider.isMetaMask)
      
      // Check if it's actually MetaMask
      if (!provider.isMetaMask) {
        throw new Error('MetaMask not detected. Please make sure MetaMask is installed and enabled.')
      }

      // Request account access
      console.log('🔐 Requesting account access...')
      console.log('🚀 This should trigger MetaMask popup...')
      
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      })

      console.log('👤 Accounts:', accounts)

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please connect an account in MetaMask.')
      }

      // Create ethers provider and signer
      console.log('🔗 Creating ethers provider...')
      const ethersProvider = new BrowserProvider(provider)
      const signer = await ethersProvider.getSigner()
      const address = await signer.getAddress()
      
      console.log('✅ Connected to address:', address)
      
      // Get balance
      const balance = await ethersProvider.getBalance(address)
      const balanceInEth = formatEther(balance)

      // Initialize USDC bidding
      const usdcBidding = new USDCBidding(ethersProvider, signer)
      const usdcBalance = await usdcBidding.getUSDCBalance(address)

      setWalletState({
        isConnected: true,
        address,
        balance: parseFloat(balanceInEth).toFixed(4),
        usdcBalance: parseFloat(usdcBalance).toFixed(2),
        provider: ethersProvider,
        signer,
        usdcBidding,
        error: null
      })

      return { address, balance: balanceInEth }
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        error: error.message || 'Failed to connect wallet'
      }))
      throw error
    }
  }

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: '',
      balance: '',
      usdcBalance: '',
      provider: null,
      signer: null,
      usdcBidding: null,
      error: null
    })
  }

  const switchNetwork = async (chainId: string) => {
    if (!walletState.provider) return

    try {
      await (walletState.provider.provider as any).request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      })
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain doesn't exist, add it
        await addNetwork()
      } else {
        throw error
      }
    }
  }

  const addNetwork = async () => {
    if (!walletState.provider) return

    try {
      await (walletState.provider.provider as any).request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x1', // Ethereum mainnet
          chainName: 'Ethereum Mainnet',
          rpcUrls: ['https://mainnet.infura.io/v3/YOUR_PROJECT_ID'],
          blockExplorerUrls: ['https://etherscan.io'],
          nativeCurrency: {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18
          }
        }]
      })
    } catch (error) {
      console.error('Failed to add network:', error)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          // Reconnect with new account
          connectWallet()
        }
      }

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload()
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
        }
      }
    }
  }, [])

  const placeUSDCBid = async (amount: string) => {
    if (!walletState.usdcBidding) {
      throw new Error('USDC bidding not initialized')
    }

    try {
      // Check if user has enough USDC
      const currentBalance = await walletState.usdcBidding.getUSDCBalance(walletState.address)
      if (parseFloat(currentBalance) < parseFloat(amount)) {
        throw new Error('Insufficient USDC balance')
      }

      // Place the bid
      const tx = await walletState.usdcBidding.placeBid(amount)
      
      // Wait for transaction confirmation
      const receipt = await tx.wait()
      
      // Update USDC balance
      const newBalance = await walletState.usdcBidding.getUSDCBalance(walletState.address)
      setWalletState(prev => ({
        ...prev,
        usdcBalance: parseFloat(newBalance).toFixed(2)
      }))

      return { tx, receipt }
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        error: error.message || 'Failed to place USDC bid'
      }))
      throw error
    }
  }

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    placeUSDCBid
  }
}
