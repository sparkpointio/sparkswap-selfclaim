import {SmartContract, useContract, UseContractResult} from "@thirdweb-dev/react";
import contracts, {CreateSelfClaimInputTypes} from "@/library/constants/contracts";
import {BinanceTestnet} from "@thirdweb-dev/chains";
import {BaseContract} from "ethers";
import {useCallback, useState} from "react";
import selfClaimHelper from "@/library/helpers/selfclaim.helper";
import tokens from "@/library/constants/tokens";


const selfClaimFactory = {
  constants: contracts.selfClaimFactory,
  abi: contracts.selfClaimFactory.ABI,
  feeToken: {
    'primary': tokens.srk,
    'secondary': tokens.sfuel
  },
  useContract: (chain = BinanceTestnet.chainId): UseContractResult => {
    const address = selfClaimFactory.constants.addresses[chain]
    return useContract(address, selfClaimFactory.abi)
  },
  useCreateSelfClaim: () => {
    const [receipt, setReceipt] = useState()

    const createSelfClaim = useCallback(
      async (contract: SmartContract<BaseContract>, params: CreateSelfClaimInputTypes) => {
        const recpt = await selfClaimHelper.createSelfClaim(contract, params)
        recpt.createdSelfClaimAddress = extractCreatedSelfClaimFromReceipt(recpt.receipt)
        setReceipt(recpt)
      },  [])

    return {
      receipt,
      createSelfClaim,
    }
  },
}

const extractCreatedSelfClaimFromReceipt = (receipt: any): string | null => {
  const eventObj = receipt.events.find((event: { event: string; }) => event.event === 'CreateSelfClaim');

  return eventObj ? eventObj.args.contractAddress : null;
}

export default selfClaimFactory
