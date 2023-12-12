import {faker} from "@faker-js/faker";
import airdropModel from "@/library/models/airdrop.model";
import {Airdrop, Prisma, User} from "@prisma/client";
import userFactory from "@/database/factory/user.factory";
import {ethers} from "ethers";
import {formatInputRecipients, getMerkleInfo} from "@/library/utils/merkle.utils";
import {Amount} from "@thirdweb-dev/sdk";
import {MerkleDistributorInfo} from "@medardm/merkle-distributor";
import fs from "fs";
import config from "@/config/index";
import {
  NewFormat as BalanceFormatNew,
  OldFormat as BalanceFormatOld
} from "@medardm/merkle-distributor/dist/parse-balance-map";
import {TokenContract} from "@/library/hooks/useToken";
import tokens from "@/library/constants/tokens";
import {Address} from "@thirdweb-dev/react";

export type AirdropWithMerkle = {
  airdrop: Airdrop;
  rewardToken: TokenContract;
  merkleRecipientList: BalanceFormatNew[] | BalanceFormatOld,
  rawRecipientList: BalanceFormatOld,
  merkleInfo: MerkleDistributorInfo
}
const airdropFactory = {
  definition: <Prisma.AirdropCreateArgs>{
    data: {
      name: faker.string.hexadecimal({length: 40})
    }
  },
  reloadDefinition: (merkleInfo: {
    merkleRoot: string,
    tokenTotal: Amount
    tokenTotalHex: Amount,
    rewardTokenAddress: Address | undefined
  }, creator: User) => {
    const data = <Airdrop>{
      name: faker.word.noun() + ' Airdrop',
      startsAt: faker.date.soon({days: 10}),
      expiresAt: faker.date.soon({days: 60}),
      merkleRoot: merkleInfo.merkleRoot,
      tokenTotal: merkleInfo.tokenTotal,
      tokenTotalHex: merkleInfo.tokenTotalHex,
      rewardTokenAddress: merkleInfo.rewardTokenAddress
    }
    airdropFactory.setDefinition({
      creator: {
        connect: {
          id: creator.id
        }
      },
      ...data
    })

    return airdropFactory
  },
  setDefinition: (definition: Prisma.AirdropCreateInput) => {
    airdropFactory.definition = {
      data: {...definition}
    }

    return airdropFactory
  },
  create: async (quantity = 1, numRecipients: number = 10, creator?: User): Promise<AirdropWithMerkle[]> => {
    let records: AirdropWithMerkle[] = [];
    const rewardToken = <TokenContract><unknown>{
      decimals: tokens.srk.decimals,
      address: tokens.srk.address.default,
    }
    for (let i = 0; i < quantity; i++) {
      // generate sample recipients (from textarea field in form)
      const mockRecipientsInput = generateTestRecipients(numRecipients)

      // generate the recipient list with and without the merkle data
      let {
        rawRecipientList,
        merkleRecipientList,
        totalAmount
      } = formatInputRecipients(mockRecipientsInput, rewardToken.decimals);
      const merkleInfo = getMerkleInfo(merkleRecipientList);

      // save generated merkle info
      if (config.merkle.createFile) {
        fs.writeFileSync(`./generated-merkle/${faker.string.uuid()}.json`, JSON.stringify(merkleInfo));
      }

      if (!creator) {
        creator = (await userFactory.create(1))[0]
      }
      userFactory.reloadDefinition()

      airdropFactory.reloadDefinition({
        merkleRoot: merkleInfo.merkleRoot,
        tokenTotal: totalAmount,
        tokenTotalHex: merkleInfo.tokenTotal,
        rewardTokenAddress: rewardToken.address
      }, creator)

      records.push({
        airdrop: await airdropModel.create(airdropFactory.definition),
        rewardToken: rewardToken,
        merkleRecipientList: merkleRecipientList,
        rawRecipientList: rawRecipientList,
        merkleInfo: merkleInfo
      })
    }
    return records
  }
}

/**
 * Helpers
 */
export const generateTestRecipients = (quantity = 1) => {
  const parts = Array.from({length: quantity}, (_, i) =>
    `${ethers.Wallet.createRandom().address}, ` +
    `${faker.string.numeric({length: {min: 1, max: 2}, allowLeadingZeros: false})}` +
    `${(i + 1) === quantity ? '' : '\n'}`
  );

  return parts.join('');
}

export default airdropFactory
