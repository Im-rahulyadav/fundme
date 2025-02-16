import { useState } from 'react'
import './App.css'

import { config } from './context/Web3Provider.jsx'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RainbowKitProvider , darkTheme  } from '@rainbow-me/rainbowkit'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import WriteContract from './components/WriteContract.jsx'


const queryClient = new QueryClient()

function App() {
  const [count, setCount] = useState(0)

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient} >
        <RainbowKitProvider modalSize="compact"  theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}>
          <ConnectButton accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }} />

            <WriteContract />

        </RainbowKitProvider>

      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
