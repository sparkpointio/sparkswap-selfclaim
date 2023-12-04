import prisma from "@/library/prisma";
import {Prisma, Role} from "@prisma/client";

const roleModel = {
  ...prisma.role,
  first: async (value: any, column: keyof Role = 'id'): Promise<Role | null> => {
    return prisma.role.findFirst({
      where: {
        [column]: value
      }
    })
  },
  all: (options?: Prisma.RoleFindManyArgs): Promise<Role[] | null> => {
    return prisma.role.findMany(options)
  },
}

export default roleModel
