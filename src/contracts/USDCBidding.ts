import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'

// USDC Contract Address on Ethereum Mainnet
export const USDC_ADDRESS = '0xA0b86a33E6441b8C4C8C0C4C8C0C4C8C0C4C8C0C4'

// USDC ABI (simplified for transfer and approval)
export const USDC_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_spender", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_to", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "transfer",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "type": "function"
  }
]

// Mock Auction Contract for demo purposes
export const AUCTION_CONTRACT_ADDRESS = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'

export const AUCTION_ABI = [
  {
    "constant": false,
    "inputs": [
      {"name": "bidAmount", "type": "uint256"},
      {"name": "creatorId", "type": "uint256"}
    ],
    "name": "placeBid",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCurrentBid",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  }
]

export class USDCBidding {
  private provider: BrowserProvider
  private signer: any
  private usdcContract: Contract
  private auctionContract: Contract

  constructor(provider: BrowserProvider, signer: any) {
    this.provider = provider
    this.signer = signer
    this.usdcContract = new Contract(USDC_ADDRESS, USDC_ABI, signer)
    this.auctionContract = new Contract(AUCTION_CONTRACT_ADDRESS, AUCTION_ABI, signer)
  }

  // Get USDC balance
  async getUSDCBalance(address: string): Promise<string> {
    try {
      const balance = await this.usdcContract.balanceOf(address)
      const decimals = await this.usdcContract.decimals()
      return formatUnits(balance, decimals)
    } catch (error) {
      console.error('Error getting USDC balance:', error)
      return '0'
    }
  }

  // Check USDC allowance
  async getUSDCAllowance(owner: string, spender: string): Promise<string> {
    try {
      const allowance = await this.usdcContract.allowance(owner, spender)
      const decimals = await this.usdcContract.decimals()
      return formatUnits(allowance, decimals)
    } catch (error) {
      console.error('Error getting USDC allowance:', error)
      return '0'
    }
  }

  // Approve USDC spending
  async approveUSDC(spender: string, amount: string): Promise<any> {
    try {
      const decimals = await this.usdcContract.decimals()
      const amountWei = parseUnits(amount, decimals)
      
      const tx = await this.usdcContract.approve(spender, amountWei)
      return tx
    } catch (error) {
      console.error('Error approving USDC:', error)
      throw error
    }
  }

  // Place a bid with USDC
  async placeBid(amount: string, creatorId: number = 1): Promise<any> {
    try {
      const decimals = await this.usdcContract.decimals()
      const amountWei = parseUnits(amount, decimals)
      
      // For demo purposes, we'll just transfer USDC to a demo address
      // In a real implementation, this would call the auction contract
      const demoAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
      
      const tx = await this.usdcContract.transfer(demoAddress, amountWei)
      return tx
    } catch (error) {
      console.error('Error placing bid:', error)
      throw error
    }
  }

  // Get current highest bid
  async getCurrentBid(): Promise<string> {
    try {
      const bid = await this.auctionContract.getCurrentBid()
      const decimals = await this.usdcContract.decimals()
      return formatUnits(bid, decimals)
    } catch (error) {
      console.error('Error getting current bid:', error)
      return '0'
    }
  }
}
