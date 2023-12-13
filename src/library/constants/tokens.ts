import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import erc20ABI from "@/library/constants/abi/erc20.abi.json";

const tokens = {
  erc20ABI: erc20ABI,
  srk: {
    symbol: 'SRK',
    address: {
      default: '0xe09B8661D80CF24dB230A167969d18B94a5a3266',
      [Binance.chainId]: '0xe09B8661D80CF24dB230A167969d18B94a5a3266',
      [BinanceTestnet.chainId]: '0xe09B8661D80CF24dB230A167969d18B94a5a3266',
    },
    decimals: 18,
    projectLink: 'https://sparkpoint.io/',
  },
  sfuel: {
    symbol: 'SFUEL',
    address: {
      default: 'sfuel',
      [Binance.chainId]: 'sfuel',
      [BinanceTestnet.chainId]: 'sfuel',
    },
    decimals: 18,
    projectLink: 'https://sparkpoint.io/',
  },
}

export default tokens;
