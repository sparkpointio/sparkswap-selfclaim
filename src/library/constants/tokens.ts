import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import {ChainId} from "@thirdweb-dev/sdk";


export type TokenConstant = {
  symbol: string;
  address: string;
  addresses: {
    [key in ChainId]?: string;
  };
  decimals: number;
  projectLink: string;
};

export type TokenConstants = {
  [tokenName: string]: TokenConstant;
};

const tokens: TokenConstants = {
  srk: {
    symbol: 'SRK',
    address: '0xe09B8661D80CF24dB230A167969d18B94a5a3266',
    addresses: {
      [Binance.chainId]: '0xe09B8661D80CF24dB230A167969d18B94a5a3266',
      [BinanceTestnet.chainId]: '0xe09B8661D80CF24dB230A167969d18B94a5a3266',
    },
    decimals: 18,
    projectLink: 'https://sparkpoint.io/',
  },
  sfuel: {
    symbol: 'SFUEL',
    address: 'sfuel',
    addresses: {
      [Binance.chainId]: 'sfuel',
      [BinanceTestnet.chainId]: 'sfuel',
    },
    decimals: 18,
    projectLink: 'https://sparkpoint.io/',
  },
}

export default tokens;
