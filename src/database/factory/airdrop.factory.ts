import {faker} from "@faker-js/faker";
import airdropModel from "@/library/models/airdrop.model";
import {Airdrop, Prisma, User} from "@prisma/client";
import userFactory from "@/database/factory/user.factory";
import {formatInputRecipients, getMerkleInfo} from "@/library/utils/merkle.utils";
import {Amount} from "@thirdweb-dev/sdk";
import {MerkleDistributorInfo} from "@medardm/merkle-distributor";
import fs from "fs";
import config from "@/config/index";
import {OldFormat as BalanceFormatOld} from "@medardm/merkle-distributor/dist/parse-balance-map";
import {TokenContract} from "@/library/hooks/useToken";
import tokens from "@/library/constants/tokens";
import {Address} from "@thirdweb-dev/react";
import {generateTestRecipients} from "@/library/helpers/test.helper";

export type AirdropWithMerkle = {
  airdrop: Airdrop;
  rewardTokenAddress: Address;
  rawRecipientList: BalanceFormatOld,
  merkleInfo: MerkleDistributorInfo
}
const airdropFactory = {
  definition: <Prisma.AirdropCreateArgs>{},
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
      address: tokens.srk.address,
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
        const uuid = faker.string.uuid();
        fs.writeFileSync(`./generated-merkle/${uuid}-data.txt`, mockRecipientsInput);
        fs.writeFileSync(`./generated-merkle/${uuid}-merkle.json`, JSON.stringify(merkleInfo));
      }

      if (!creator) {
        creator = (await userFactory.create(1))[0]
      }
      userFactory.reloadDefinition()

      // reload definition with custom merkle data
      airdropFactory.reloadDefinition({
        merkleRoot: merkleInfo.merkleRoot,
        tokenTotal: totalAmount,
        tokenTotalHex: merkleInfo.tokenTotal,
        rewardTokenAddress: rewardToken.address
      }, creator)

      // create set of airdrop with the merkle data which will be used when registering participants
      records.push({
        airdrop: await airdropModel.create(airdropFactory.definition),
        rewardTokenAddress: rewardToken.address ?? tokens.srk.address,
        rawRecipientList: rawRecipientList,
        merkleInfo: merkleInfo
      })
    }
    return records
  }
}

export default airdropFactory
