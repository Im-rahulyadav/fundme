import { QueryClient , QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { http , createConfig } from "wagmi";

import { mainnet , sepolia } from "wagmi/chains";

export const config = createConfig({
    chains: [mainnet, sepolia],
    transports : {
        [mainnet.id]: http("https://mainnet.infura.io/v3/"),
        [sepolia.id]: http("https://sepolia.infura.io/v3/")
    }
})
