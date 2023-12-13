import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import OLD_SELFCLAIM_ABI from "@/library/constants/abi/oldSelfClaim.abi.json";
import SELFCLAIM_FACTORY_ABI from "@/library/constants/abi/selfclaimFactory.abi.json";
import SELFCLAIM_BEACON_ABI from "@/library/constants/abi/selfclaimBeacon.abi.json";
import tokens, {TokenConstant} from "@/library/constants/tokens";
import {ChainId} from "@thirdweb-dev/sdk";

type ContractConstant = {
  ABI: any[];
  base?: string;
  address: string;
  addresses: {
    [key in ChainId]?: string;
  };
};

type ContractConstants = {
  [contractName: string]: ContractConstant;
};

const contracts: ContractConstants = {
  selfClaimOld: {
    ABI: OLD_SELFCLAIM_ABI,
    address: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    addresses: {
      [Binance.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [BinanceTestnet.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    }
  },
  selfClaimFactory: {
    ABI: SELFCLAIM_FACTORY_ABI,
    base: '0x371DB7f8904af80daDAc7Ae1b4898a7A61A63889',
    // proxy contract
    address: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
    addresses: {
      [Binance.chainId]: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
      [BinanceTestnet.chainId]: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
    },
    feeTokens: {
      'primary': tokens.srk,
      'secondary': tokens.sfuel
    }
  } as ContractConstant & {feeTokens: { primary: TokenConstant, secondary: TokenConstant }},
  selfClaimBeacon: {
    address: '',
    addresses: {},
    ABI: SELFCLAIM_BEACON_ABI,
  },
}

export default contracts
