import {Address, useContract} from "@thirdweb-dev/react";
import {useCallback, useState} from "react";
import contracts from "@/library/constants/contracts";
import {BigNumberish} from "ethers";
import {MerkleDistributorInfo} from "@medardm/merkle-distributor";

export function useOldSelfClaimContract(customAddress?: Address) {
  const {contract, error: contractErr} = useContract(
    customAddress ?? contracts.selfClaimOld.address,
    contracts.selfClaimOld.ABI
  );
  const [error, setError] = useState<any>(null)
  const [receipt, setReceipt] = useState<any>()
  const create = useCallback(async (
    merkleInfo: MerkleDistributorInfo,
    totalAmount: {
      address: Address
      value: BigNumberish;
    },
  ) => {
    if (!contract) return

    try {
      const result = await contract.call('register', [
        merkleInfo.merkleRoot,
        totalAmount.address,
        totalAmount.value,
      ])
      setReceipt(result.receipt)
      return result
    } catch (e: any) {
      throw new Error('Unable to create airdrop: ' + e.message)
    }
  }, [contract])

  return {
    contract,
    create,
    receipt,
    error
  };
}
