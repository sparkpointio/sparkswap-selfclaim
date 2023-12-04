import {PrismaClient} from '@prisma/client'
import config from "@/config/index";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient(
  // {
  //   log: ['query'],
  // }
).$extends({
  query: {
    user: {
      $allOperations({ model, operation, args, query }) {
        /* your custom logic here */
        args = {
          ...args,
          include: {
            roles: {
              select: {
                role: {
                  select: {
                    id: true,
                    name: true,
                    desc: true
                  }
                },
                createdAt: true
              }
            }
          },
        }
        return query(args)
      },
    }
  },
})


if (config.app.environment !== 'production') globalForPrisma.prisma = prisma

export default prisma
