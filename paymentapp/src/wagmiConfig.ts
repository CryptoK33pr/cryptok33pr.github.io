// src/wagmiConfig.ts
import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    walletConnect({
      projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string,
      metadata: {
        name: "Cafe Crypto Payments",
        description: "Cafe Crypto Payments dApp",
        url: "http://localhost:5173", // Update to your production URL when deploying
        icons: [],
      },
      showQrModal: true,
    }),
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_ALCHEMY_RPC_URL as string),
  },
  ssr: false,
});
