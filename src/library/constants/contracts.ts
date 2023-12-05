import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import selfClaimABI from "@/library/constants/abi/selfClaim.abi.json";

const contracts = {
  selfClaim: {
    ABI: selfClaimABI,
    address: {
      default: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [Binance.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [BinanceTestnet.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    }
  },
}

export default contracts
