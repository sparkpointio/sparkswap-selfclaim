import { ThirdwebProvider } from "@thirdweb-dev/react";
import '@/src/resources/css/globals.css'
import type { AppProps } from 'next/app'

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
