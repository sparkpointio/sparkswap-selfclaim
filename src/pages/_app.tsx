import {ThirdwebProvider} from "@thirdweb-dev/react";
import '@/resources/css/globals.css'
import type {AppProps} from 'next/app'
import config from "@/config/index";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "binance-testnet";

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThirdwebProvider
      clientId={config.constants.thirdweb.clientId}
      activeChain={config.constants.NETWORK}
      authConfig={{
        domain: config.constants.thirdweb.authDomain || "",
        authUrl: "/api/auth",
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
