import {faker} from "@faker-js/faker";
import airdropUserModel from "@/library/models/airdropUser.model";
import {Prisma, AirdropUser, Airdrop, User} from "@prisma/client";
import userFactory from "@/database/factory/user.factory";
import airdropFactory, {AirdropWithMerkle} from "@/database/factory/airdrop.factory";
import userModel, {assignUserListRole} from "@/library/models/user.model";
import {Address} from "@thirdweb-dev/react";
import roleUserModel from "@/library/models/roleUser.model";
import {RoleEnum} from "@/library/enums/roles.enum";

const airdropUserFactory = {
  definition: <Prisma.AirdropUserCreateArgs>{
    data: {
      user: {}
    }
  },
  reloadDefinition: (index: number, airdrop: Airdrop, participant: User) => {
    airdropUserFactory.setDefinition({
      amount: faker.number.int({max: 3}).toString(),
      amountHex: faker.number.int({max: 1000}).toString(16),
      merkleIndex: index,
      proof: JSON.stringify([
        faker.string.hexadecimal('18'),
        faker.string.hexadecimal('18'),
      ]),
      airdrop: {
        connect: airdrop
      },
      user: {
        connect: {
          id: participant.id
        }
      }
    })

    return airdropUserFactory
  },
  setDefinition: (definition: Prisma.AirdropUserCreateInput) => {
    airdropUserFactory.definition = {
      data: {...definition}
    }

    return airdropUserFactory
  },
  create: async (airdropWithMerkle?: AirdropWithMerkle): Promise<AirdropUser[]> => {
    let records: AirdropUser[] = [];
    if (!airdropWithMerkle) {
      airdropWithMerkle = (await airdropFactory.create(1, 10))[0]
    }

    const userList = await userModel.createUsersFromMerkle(
      airdropWithMerkle.merkleInfo,
      airdropWithMerkle.airdrop.creatorId
    )

    await assignUserListRole(userList)

    // create airdrop user entry
    await airdropUserModel.createManyWithMerkle(airdropWithMerkle, userList)

    records = await airdropUserModel.findMany({
      where: {
        airdropId: airdropWithMerkle.airdrop.id
      }
    })
    return records
  }
}

export default airdropUserFactory
