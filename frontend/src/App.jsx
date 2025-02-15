import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { config } from './context/Web3Provider.jsx'
import { WagmiProvider } from 'wagmi'
import { QueryClient , QueryClientProvider } from '@tanstack/react-query'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient} > 
        <RainbowKitProvider>
            <ConnectButton />
        </RainbowKitProvider>

      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
