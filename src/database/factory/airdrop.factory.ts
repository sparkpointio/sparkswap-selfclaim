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
  reloadDefinition: (user: User) => {
    airdropFactory.setDefinition({
      creator: {
        connect: {
          id: user.id
        }
      },
      name: faker.string.hexadecimal({length: 10})
    })

    return airdropFactory
  },
  setDefinition: (definition:Prisma.AirdropCreateInput) => {
    airdropFactory.definition = {
      data: {...definition}
    }

    return airdropFactory
  },
  create: async (quantity = 1): Promise<Airdrop[]> => {
    let records: Airdrop[] = [];
    for (let i = 0; i < quantity; i++) {
      userFactory.reloadDefinition()
      const user = await userFactory.create(1)
      airdropFactory.reloadDefinition(user[0])
      records.push(await airdropModel.create(airdropFactory.definition))
    }
    return records
  }
}

export default airdropFactory
