import {Address, useContract} from "@thirdweb-dev/react";
import {useCallback, useState} from "react";
import contracts from "@/library/constants/contracts";
import {BigNumberish} from "ethers";
import {MerkleDistributorInfoType} from "@medardm/merkle-distributor";

export function useSelfClaimContract(customAddress?: Address) {
  const {contract, error: contractErr} = useContract(
    customAddress ?? contracts.selfClaim.address.default,
    contracts.selfClaim.ABI
  );
  const [error, setError] = useState<any>(null)
  const [receipt, setReceipt] = useState<any>()
  const create = useCallback(async (
    merkleInfo: MerkleDistributorInfoType,
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

/**
 * OLD listener events to be removed once it is implement in a more efficient way in the hook
 */
// Event listeners for Create events
// const [lastReadEvent, setLastReadEvent] = useState(0);
// const airdropEvents = useContractEvents(airdropContract.contract, "Create", {
//   queryFilter: {
//     filters: {
//       projectOwner: wallet, // e.g. Only events where tokenId = 123
//     },
//     order: "desc", // Order of events ("asc" or "desc")
//   },
//   subscribe: true, // Subscribe to new events
// });
//
// useEffect(() => {
//   try {
//     if (airdropEvents.data && airdropEvents.data.length > lastReadEvent) {
//       setLastReadEvent(airdropEvents.data.length);
//       alert(
//         `Self-claim airdrop created, ID #${airdropEvents.data[0].data.id.toString()}`
//       );
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }, [lastReadEvent, setLastReadEvent, airdropEvents]);
