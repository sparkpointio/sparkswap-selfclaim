import {faker} from "@faker-js/faker";
import airdropModel from "@/library/models/airdrop.model";
import {Prisma, Airdrop, User} from "@prisma/client";
import userFactory from "@/database/factory/user.factory";

const airdropFactory = {
  definition: <Prisma.AirdropCreateArgs> {
    data: {
      name: faker.string.hexadecimal({length: 40})
    }
  },
  reloadDefinition: (creator: User) => {
    airdropFactory.setDefinition({
      creator: {
        connect: {
          id: creator.id
        }
      },
      name: faker.word.noun() + ' Airdrop',
      startsAt: faker.date.soon({days: 10}),
      expiresAt: faker.date.soon({days: 60})
    })

    return airdropFactory
  },
  setDefinition: (definition:Prisma.AirdropCreateInput) => {
    airdropFactory.definition = {
      data: {...definition}
    }

    return airdropFactory
  },
  create: async (quantity = 1, creator?: User): Promise<Airdrop[]> => {
    let records: Airdrop[] = [];
    for (let i = 0; i < quantity; i++) {
      if (!creator) {
         creator = (await userFactory.create(1))[0]
      }
      userFactory.reloadDefinition()
      airdropFactory.reloadDefinition(creator)
      records.push(await airdropModel.create(airdropFactory.definition))
    }
    return records
  }
}

export default airdropFactory
