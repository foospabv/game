'use client'

import { Button } from '@/components/ui/button'
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { metaMask } from 'wagmi/connectors'
import { useEffect, useState } from 'react'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleConnect = () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to connect your wallet.')
      window.open('https://metamask.io/download/', '_blank')
      return
    }
    const metamaskConnector = connectors.find(c => c.id === metaMask.id)
    if (metamaskConnector) {
      connect({ connector: metamaskConnector })
    } else {
      alert('MetaMask connector not found. Please ensure MetaMask is properly configured.')
    }
  }

  if (!isClient) {
    return <button className="px-4 py-2 bg-gray-600 rounded" disabled>Loading...</button>
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          {address?.slice(0, 6)}...{address?.slice(-4)} ({chainId === 11155111 ? 'Sepolia' : `Chain ID: ${chainId}`})
        </span>
        <button 
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button 
      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      onClick={handleConnect}
    >
      Connect Wallet
    </button>
  )
}
