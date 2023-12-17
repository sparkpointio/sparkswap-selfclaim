import {SmartContract} from "@thirdweb-dev/react";
import {BaseContract} from "ethers";
import {CreateSelfClaimInputTypes, SelfClaimFactoryFunctions} from "@/library/constants/contracts";

const selfClaimHelper = {
  createSelfClaim: async (contract: SmartContract<BaseContract>, params: CreateSelfClaimInputTypes) => {
    return await contract.call(
      <SelfClaimFactoryFunctions>'createSelfClaim',
      [
        params.feeTokenAddress,
        params.rewardTokenAddress,
        params.merkleRoot,
        params.expiry,
        params.totalAmount,
      ]
    )
  }
}

export default selfClaimHelper
