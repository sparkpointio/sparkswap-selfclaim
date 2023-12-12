import {
  parseBalanceMap,
  NewFormat as BalanceFormatNew,
  OldFormat as BalanceFormatOld,
  MerkleDistributorInfo
} from "@medardm/merkle-distributor";
import {Amount} from "@thirdweb-dev/sdk";
import {normalizeAmt, toBigNumber} from "@/library/utils/bignumber.utils";

export function formatInputRecipients(inputString: string, decimals = 18, useOldFormat: boolean = true): {
  recipientList: BalanceFormatNew[] | BalanceFormatOld,
  totalAmount: Amount
  totalAmountValue: Amount
} {
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
        earnings: `0x${normalizeAmt(amount.toString(), decimals, 16)}`, reasons: ''
      };
    });
  } else {
    lines.forEach(line => {
      const [address, amountStr] = line.split(',');

      const amount = toBigNumber(amountStr.trim());
      totalAmount = totalAmount.plus(amount)

      // Assign address as key and amount as value in the recipientMap
      recipientMap[address.trim()] = `0x${normalizeAmt(amount.toString(), decimals, 16)}`;
    });

    recipientList = recipientMap
  }

  return {
    recipientList: recipientList,
    totalAmount: totalAmount.toString(),
    totalAmountValue: normalizeAmt(totalAmount.toString(), decimals)
  };
}

export function getMerkleInfo(balanceList: BalanceFormatNew[] | BalanceFormatOld): MerkleDistributorInfo {
  return parseBalanceMap(balanceList)
}
