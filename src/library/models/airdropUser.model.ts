import prisma from "@/library/prisma";
import {Prisma, AirdropUser} from "@prisma/client";

const airdropUserModel = {
  ...prisma.airdropUser,
  all: async (options?: Prisma.AirdropUserFindManyArgs): Promise<AirdropUser[] | null> => {
    return prisma.airdropUser.findMany(options)
  },
  softDelete: () => {
  },
}

export default airdropUserModel
