import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia ,localhost } from "wagmi/chains";
import {http , createConfig} from '@wagmi/core'


export  const config = createConfig({
  appName: 'My RainbowKit App',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.chainId] : http(import.meta.env.VITE_INFURA_MAINNET_URL),
    [sepolia.chainId] : http(import.meta.env.VITE_INFURA_SEPOLIA_URL),
  
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});