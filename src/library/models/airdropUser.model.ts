import prisma from "@/library/prisma";
import {AirdropUser, Prisma, User} from "@prisma/client";
import {AirdropWithMerkle} from "@/database/factory/airdrop.factory";

const airdropUserModel = {
  ...prisma.airdropUser,
  all: async (options?: Prisma.AirdropUserFindManyArgs): Promise<AirdropUser[] | null> => {
    return prisma.airdropUser.findMany(options)
  },
  createManyWithMerkle: async (airdropWithMerkle: AirdropWithMerkle, userList: User[]) => {
    return airdropUserModel.createMany({
      data: prepareRecordsToCreate(airdropWithMerkle, userList),
    });
  },
}

const prepareRecordsToCreate = (
  airdropWithMerkle: AirdropWithMerkle,
  userList: User[]
): Prisma.AirdropUserCreateManyInput[] => {

  const recordsToCreate: Prisma.AirdropUserCreateManyInput[] = []

  for (const address in airdropWithMerkle.merkleInfo.claims) {
    if (airdropWithMerkle.merkleInfo.claims.hasOwnProperty(address)) {
      const addressMerkleData = airdropWithMerkle.merkleInfo.claims[address];
      const userData = userList.find(data => data.walletAddress === address)

      if (!userData) {
        throw new Error('Merkle and User data mismatch')
      }

      const addressData = <Prisma.AirdropUserCreateManyInput> {
        amount: airdropWithMerkle.rawRecipientList[address],
        amountHex: addressMerkleData.amount,
        merkleIndex: addressMerkleData.index,
        proof: addressMerkleData.proof,
        userId: userData.id,
        airdropId: airdropWithMerkle.airdrop.id
      };

      recordsToCreate.push(addressData)
    }
  }

  return recordsToCreate;
}

export default airdropUserModel
