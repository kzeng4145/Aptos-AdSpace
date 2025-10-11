import { useAccount, useBalance, useConnect, useDisconnect } from 'wagmi'
import { useSendTransaction } from 'wagmi'
import { formatEther, parseEther } from 'viem'

export const useRainbowWallet = () => {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, error: connectError, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  
  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address: address,
  })
  
  // Send ETH transaction
  const { sendTransaction, isPending: isTransferPending } = useSendTransaction()
  
  const placeETHBid = async (amount: string) => {
    if (!address) {
      throw new Error('Wallet not connected')
    }
    
    const amountWei = parseEther(amount)
    const demoAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6' // Adspace Demo Address
    
    try {
      const hash = await sendTransaction({
        to: demoAddress,
        value: amountWei,
      })
      
      return { hash }
    } catch (error) {
      console.error('ETH transfer failed:', error)
      throw error
    }
  }
  
  return {
    // Connection state
    isConnected,
    address,
    chain,
    connect,
    disconnect,
    connectors,
    connectError,
    isPending,
    
    // Balances
    ethBalance: ethBalance ? formatEther(ethBalance.value) : '0',
    
    // ETH operations
    placeETHBid,
    isTransferPending,
  }
}
