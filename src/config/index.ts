import {Binance} from "@thirdweb-dev/chains";
import {BoolFromString} from "@/library/utils/index.utils";

const app = {
  environment: process.env.APP_ENV ?? process.env.NODE_ENV,
  guards: {
    enabled: BoolFromString(process.env.ENABLE_GUARDS?? 'true')
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

const config = {
  app,
  api,
  constants
}

export default config
