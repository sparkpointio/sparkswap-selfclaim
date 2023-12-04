import {faker} from "@faker-js/faker";
import userModel from "@/library/models/user.model";
import {Prisma, User} from "@prisma/client";

const userFactory = {
  /**
   * Initialize model attributes
   */
  definition: <Prisma.UserCreateArgs> {
    data: {walletAddress: faker.string.hexadecimal({length: 40})}
  },
  reloadDefinition: () => {
    userFactory.setDefinition({
      walletAddress: faker.string.hexadecimal({length: 40})
    })

    return userFactory
  },
  /**
   * Custom definitions
   */
  setDefinition: (definition: Prisma.UserCreateInput) => {
    userFactory.definition = {
      data: {...definition}
    }

    return userFactory
  },
  /**
   * Create one or multiple model records
   */
  create: async (quantity = 1): Promise<User[]> => {
    let records: User[] = [];
    for (let i = 0; i < quantity; i++) {
      userFactory.reloadDefinition()
      records.push(await userModel.create(userFactory.definition))
    }
    return records
  }
}

export default userFactory
