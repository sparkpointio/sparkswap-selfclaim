import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import selfClaimABI from "@/src/library/constants/abi/selfClaim.abi.json";

const contracts = {
  selfClaim: {
    ABI: selfClaimABI,
    address: {
      default: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
      [Binance.chainId]: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
      [BinanceTestnet.chainId]: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    }
  },
}

export default contracts
