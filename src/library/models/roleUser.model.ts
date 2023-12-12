import prisma from "@/library/prisma";
import {Prisma, RoleUser} from "@prisma/client";

const roleUserModel = {
  ...prisma.roleUser,
  first: async (value: any, column: keyof RoleUser = 'roleId'): Promise<RoleUser | null> => {
    return prisma.roleUser.findFirst({
      where: {
        [column]: value
      }
    })
  },
  all: async (options?: Prisma.RoleUserFindManyArgs): Promise<RoleUser[] | null> => {
    return prisma.roleUser.findMany(options)
  },
  softDelete: () => {
  },
}

export default roleUserModel
