import {Binance} from "@thirdweb-dev/chains";
import {BoolFromString} from "@/library/utils/index.utils";
import moment from "moment";

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
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? '',
    authDomain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN ?? ''
  }
}

const merkle = {
  createFile: false
}

const selfclaim = {
  start: moment(),
  expiry: moment().add(2, 'months')
}

const config = {
  app,
  api,
  constants,
  merkle,
  selfclaim
}

export default config
