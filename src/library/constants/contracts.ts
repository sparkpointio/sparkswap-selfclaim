import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import OLD_SELFCLAIM_ABI from "@/library/constants/abi/oldSelfClaim.abi.json";
import SELFCLAIM_FACTORY_ABI from "@/library/constants/abi/selfclaimFactory.abi.json";
import SELFCLAIM_BEACON_ABI from "@/library/constants/abi/selfclaimBeacon.abi.json";
import tokens from "@/library/constants/tokens";

const contracts = {
  selfClaimOld: {
    ABI: OLD_SELFCLAIM_ABI,
    address: {
      default: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [Binance.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [BinanceTestnet.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    }
  },
  selfClaimFactory: {
    ABI: SELFCLAIM_FACTORY_ABI,
    address: {
      original: '0x371DB7f8904af80daDAc7Ae1b4898a7A61A63889',
      // proxy contract
      default: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
      [Binance.chainId]: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
      [BinanceTestnet.chainId]: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
    },
    feeTokens: {
      'primary': tokens.srk,
      'secondary': tokens.sfuel
    }
  },
  selfClaimBeacon: {
    ABI: SELFCLAIM_BEACON_ABI,
  },
}

export default contracts
