import prisma from "@/library/prisma";
import {Prisma, Airdrop} from "@prisma/client";

const airdropModel = {
  ...prisma.airdrop,
  first: async (value: any, column: keyof Airdrop = 'id'): Promise<Airdrop | null> => {
    return prisma.airdrop.findFirst({
      where: {
        [column]: value
      }
    })
  },
  all: async (options?: Prisma.AirdropFindManyArgs): Promise<Airdrop[] | null> => {
    return prisma.airdrop.findMany(options)
  },
  softDelete: () => {
  },
}

export default airdropModel
