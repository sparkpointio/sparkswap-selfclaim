import merkleDistributor, {
  BalanceFormatNew,
  BalanceFormatOld,
  MerkleDistributorInfoType
} from "@medardm/merkle-distributor";
import {Amount} from "@thirdweb-dev/sdk";
import {normalizeAmt, toBigNumber} from "@/library/utils/bignumber.utils";
import {TokenContract} from "@/library/hooks/useToken";

export type AddressAmount = {
  address: string;
  amount: string;
}

export function formatInputRecipients(inputString: string, tokenContract: TokenContract, useOldFormat: boolean = true): [BalanceFormatNew[] | BalanceFormatOld, Amount] {
  const lines = inputString.split('\n');
  let totalAmount = toBigNumber(0);
  let recipientList: BalanceFormatNew[] | BalanceFormatOld
  let recipientMap: BalanceFormatOld = {};
  if (!useOldFormat) {
    recipientList = lines.map(line => {
      const [address, amountStr] = line.split(',');

      const amount = toBigNumber(amountStr.trim());
      totalAmount = totalAmount.plus(amount)

      return {
        address: address.trim(),
        earnings: `0x${normalizeAmt(amount.toString(), tokenContract.decimals, 16)}`, reasons: ''
      };
    });
  } else {
    lines.forEach(line => {
      const [address, amountStr] = line.split(',');

      const amount = toBigNumber(amountStr.trim());
      totalAmount = totalAmount.plus(amount)

      // Assign address as key and amount as value in the recipientMap
      recipientMap[address.trim()] = `0x${normalizeAmt(amount.toString(), tokenContract.decimals, 16)}`;
    });

    recipientList = recipientMap
  }

  return [recipientList, totalAmount.toString()];
}

export function getMerkleInfo(balanceList: BalanceFormatNew[] | BalanceFormatOld): MerkleDistributorInfoType {
  return merkleDistributor.parseBalanceMap(balanceList)
}
