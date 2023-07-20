import { ThirdwebProvider } from "@thirdweb-dev/react";
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId="5c68ace36f1482f690b2f8f6c1b27b43">
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
