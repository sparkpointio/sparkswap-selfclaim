import prisma from "@/library/prisma";
import {Prisma, Role, User} from "@prisma/client";
import {RoleEnum} from "@/library/enums/roles.enum";
import lodash from "@/library/utils/index.utils";

/**
 * Roles is set thru prisma.ts in $extends
 * that's why we force return this type
 */
export type UserWithRole = User & {
  roles: {
    role: Role[],
    createdAt: any
  }[]
}

const userModel = {
  ...prisma.user,
  login: async (data: {
    walletAddress: string,
  }, defaultRole: RoleEnum = RoleEnum.Standard): Promise<UserWithRole> => {
    return <UserWithRole><unknown>prisma.user.upsert({
      where: {
        walletAddress: data.walletAddress
      },
      update: {
        lastLoginAt: new Date(Date.now()).toISOString(),
      },
      create: {
        walletAddress: data.walletAddress,
        lastLoginAt: new Date(Date.now()).toISOString(),
        roles: {
          create: [
            {
              role: {
                connect: {
                  id: defaultRole
                },
              }
            },
          ]
        },
      },
      include: {
        roles: true
      }
    })
  },
  first: async (value: any, column: keyof User = 'id'): Promise<User | null> => {
    return prisma.user.findFirst({
      where: {
        [column]: value
      }
    })
  },
  all: async (options?: Prisma.UserFindManyArgs): Promise<User[] | null> => {
    return prisma.user.findMany(options)
  },
}

/**
 * User traits
 */
export const hasRole = async (user: User, role: RoleEnum) => {
  let roles = (lodash.pick(user, ['roles']) as { roles: any[] }).roles
  return lodash.some(roles, {role: {id: role}})
}

export const hasAllRoles = async (user: User, roles: RoleEnum[]) => {
  const result = await userModel.findMany({
    where: {
      id: user.id,
      roles: {
        some: {
          role_id: {
            in: roles
          }
        }
      }
    },
    select: {
      _count: {
        select: {
          roles: {
            where: {
              role_id: {
                in: roles
              }
            }
          }
        }
      }
    }
  })

  return !!result && roles.length === result[0]?._count?.roles
}

export const assignRole = async (user: User, role: RoleEnum): Promise<UserWithRole> => {
  return <UserWithRole><unknown> userModel.update({
    where: {
      walletAddress: user.walletAddress
    },
    data: {
      roles: {
        create: [
          {
            role: {
              connect: {
                id: role
              }
            }
          },
        ]
      }
    }
  })
}

export default userModel
