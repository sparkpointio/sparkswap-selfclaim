import {faker} from "@faker-js/faker";
import airdropUserModel from "@/library/models/airdropUser.model";
import {Prisma, AirdropUser, Airdrop, User} from "@prisma/client";
import userFactory from "@/database/factory/user.factory";
import airdropFactory from "@/database/factory/airdrop.factory";

const airdropUserFactory = {
  definition: <Prisma.AirdropUserCreateArgs>{
    data: {
      user: {}
    }
  },
  reloadDefinition: (index: number, airdrop: Airdrop, participant: User) => {
    // TODO: use actual merkle data
    airdropUserFactory.setDefinition({
      amount: faker.number.int({max: 1000}).toString(16),
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
  create: async (quantity = 1, airdrop?: Airdrop): Promise<AirdropUser[]> => {
    let records: AirdropUser[] = [];
    if (!airdrop) {
      airdrop = (await airdropFactory.create(1))[0]
    }
    for (let i = 0; i < quantity; i++) {
      userFactory.reloadDefinition()
      const participant = (await userFactory.create(1))[0]
      airdropUserFactory.reloadDefinition(i, airdrop, participant)
      records.push(await airdropUserModel.create(airdropUserFactory.definition))
    }
    return records
  }
}

export default airdropUserFactory
