import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import oldSelfClaimABI from "@/library/constants/abi/oldSelfClaim.abi.json";

const contracts = {
  selfClaimOld: {
    ABI: oldSelfClaimABI,
    address: {
      default: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [Binance.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [BinanceTestnet.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    }
  },
}

export default contracts
