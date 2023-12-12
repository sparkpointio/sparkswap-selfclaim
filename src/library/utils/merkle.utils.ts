import {
  parseBalanceMap,
  NewFormat as BalanceFormatNew,
  OldFormat as BalanceFormatOld,
  MerkleDistributorInfo
} from "@medardm/merkle-distributor";
import {Amount} from "@thirdweb-dev/sdk";
import {normalizeAmt, toBigNumber} from "@/library/utils/bignumber.utils";

export function formatInputRecipients(inputString: string, decimals = 18, useOldFormat: boolean = true): {
  merkleRecipientList: BalanceFormatNew[] | BalanceFormatOld,
  rawRecipientList: BalanceFormatOld,
  totalAmount: Amount
  totalAmountValue: Amount
} {
  const lines = inputString.split('\n');
  let totalAmount = toBigNumber(0);
  let merkleRecipientList: BalanceFormatNew[] | BalanceFormatOld
  let merkleRecipientMap: BalanceFormatOld = {};
  let rawRecipientMap: BalanceFormatOld = {};
  if (!useOldFormat) {
    merkleRecipientList = lines.map(line => {
      const [address, amountStr] = line.split(',');
      const amount = toBigNumber(amountStr.trim());
      totalAmount = totalAmount.plus(amount)
      rawRecipientMap[address.trim()] = amount.toString();

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

      rawRecipientMap[address.trim()] = amount.toString();
      // Assign address as key and amount as value in the merkleRecipientMap
      merkleRecipientMap[address.trim()] = `0x${normalizeAmt(amount.toString(), decimals, 16)}`;
    });

    merkleRecipientList = merkleRecipientMap
  }

  return {
    rawRecipientList: rawRecipientMap,
    merkleRecipientList: merkleRecipientList,
    totalAmount: totalAmount.toString(),
    totalAmountValue: normalizeAmt(totalAmount.toString(), decimals)
  };
}

export function getMerkleInfo(balanceList: BalanceFormatNew[] | BalanceFormatOld): MerkleDistributorInfo {
  return parseBalanceMap(balanceList)
}

export function hexToDisplayAmount(amountHex: string, decimals = 18) {
  return toBigNumber(amountHex).toString(10)
}

export function isBalanceFormatNew(
  balanceList: BalanceFormatNew[] | BalanceFormatOld
): balanceList is BalanceFormatNew[] {
  return 'address' in balanceList
}
