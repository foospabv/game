'use client'

import { useState, useEffect } from 'react'
import { BrowserProvider } from 'ethers'
import { createInstance, FhevmInstance } from '@zama-fhe/relayer-sdk'

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string>('')
  const [fhevm, setFhevm] = useState<FhevmInstance | null>(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const provider = new BrowserProvider(window.ethereum)
      const accounts = await provider.listAccounts()
      if (accounts.length > 0) {
        setConnected(true)
        setAddress(accounts[0].address)
        initFHE()
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()
        const addr = await signer.getAddress()
        setAddress(addr)
        setConnected(true)
        await initFHE()
      } catch (error) {
        console.error('Error connecting wallet:', error)
      }
    }
  }

  const initFHE = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()
        const instance = await createInstance({
          chainId: Number(network.chainId),
          publicKey: await getPublicKey(provider),
        })
        setFhevm(instance)
      }
    } catch (error) {
      console.error('Error initializing FHE:', error)
    }
  }

  const getPublicKey = async (provider: BrowserProvider): Promise<string> => {
    return ''
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">GameVault - Gaming</h1>
        
        {!connected ? (
          <div className="text-center">
            <button
              onClick={connectWallet}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4">Connected: {address}</p>
            {/* Add your project-specific components here */}
          </div>
        )}
      </div>
    </main>
  )
}

