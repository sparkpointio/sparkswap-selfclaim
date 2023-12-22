import prisma from "@/library/prisma";
import {Airdrop, Prisma} from "@prisma/client";

const airdropModel = {
  fillable: [
    'name',
    'desc',
    'merkleRoot',
    'tokenTotal',
    'tokenTotalHex',
    'contractAddress',
    'rewardTokenAddress',
    'startsAt',
    'expiresAt'
  ],
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
