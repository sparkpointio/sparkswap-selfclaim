import {Binance} from "@thirdweb-dev/chains";
import {BoolFromString} from "@/library/utils/index.utils";

const app: { environment: 'production' | 'development' | 'test' | string | undefined; guards: { enabled: boolean } } = {
  environment: process.env.APP_ENV ?? process.env.NODE_ENV,
  guards: {
    enabled: BoolFromString(process.env.ENABLE_GUARDS ?? 'true')
  }
}

/**
 * global API configs
 */
const api = {
  routes: {
    config: {
      api: {
        bodyParser: false,
      },
    }
  }
}

const constants = {
  NETWORK: Binance,
  thirdweb: {
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? ''
  }
}

const merkle = {
  createFile: false
}

const config = {
  app,
  api,
  constants,
  merkle
}

export default config
