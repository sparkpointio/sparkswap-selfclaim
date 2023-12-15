import {Binance, BinanceTestnet} from "@thirdweb-dev/chains";
import tokens, {TokenConstant} from "@/library/constants/tokens";
import {ChainId} from "@thirdweb-dev/sdk";
import {oldSelfClaimAbi, selfClaimBeaconAbi, selfClaimFactoryAbi} from "@/library/constants/abis";
import type {AbiParametersToPrimitiveTypes, ExtractAbiFunction, ExtractAbiFunctionNames} from "abitype";
import {Address} from "@thirdweb-dev/react";
import {BigNumber} from "ethers";

export type SelfClaimFactoryFunctions = ExtractAbiFunctionNames<typeof selfClaimFactoryAbi, 'view'>

export type CreateSelfClaimInputTypes = {
  feeTokenAddress: Address;
  rewardTokenAddress: Address;
  merkleRoot: string;
  expiry: string;
  totalAmount: string | number;
}

type ContractConstant = {
  ABI: any;
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
    ABI: oldSelfClaimAbi,
    address: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    addresses: {
      [Binance.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
      [BinanceTestnet.chainId]: '0xD667c3C39dB57abbbd74FaCD718dad1c93A2D6e3',
    }
  },
  selfClaimFactory: {
    ABI: selfClaimFactoryAbi,
    base: '0x371DB7f8904af80daDAc7Ae1b4898a7A61A63889',
    // proxy contract
    address: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
    addresses: {
      [Binance.chainId]: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
      [BinanceTestnet.chainId]: '0x1f5aDfe23e59B5c301DFD4C5990547f6B323CEDc',
    },
  },
  selfClaimBeacon: {
    address: '',
    addresses: {},
    ABI: selfClaimBeaconAbi,
  },
}

export default contracts
