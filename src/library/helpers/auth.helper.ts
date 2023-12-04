import {NextApiRequest} from "next";
import {ThirdwebAuthUser} from "@thirdweb-dev/auth/next";
import {getUser} from "@/pages/api/auth/[...thirdweb]";
import userModel, {assignRole, UserWithRole} from "@/library/models/user.model";
import config from "@/config/index";
import {RoleEnum} from "@/library/enums/roles.enum";

export type AuthUser = ThirdwebAuthUser

export const getAuthUser = async (req: NextApiRequest): Promise<AuthUser> => {
  if (process.env.APP_ENV === 'test' && !config.app.guards.enabled) {
    /**
     * This is helpful when testing the API thru postman
     */
    let testUser = await userModel.findFirst()
    if (!testUser) {
      testUser = await userModel.create({
        data: {
          walletAddress: '0xd7dCD77D279EeD59C7D2D94982d18FEdf03CaaE8'
        }
      })
    }
    const userWithRole = await assignRole(testUser, RoleEnum.SuperAdmin)
    const authUser = formatAuthUser(userWithRole)
    return <AuthUser>{
      address: authUser.walletAddress,
      session: {
        ...authUser
      }
    }
  }
  return <AuthUser>await getUser(req);
}

export const formatAuthUser = (userWithRole: UserWithRole) => {
  const formattedRoles = userWithRole.roles.map(val => {
    return {
      assignedAt: val.createdAt,
      ...val.role,
    }
  })

  return {
    id: userWithRole.id,
    walletAddress: userWithRole.walletAddress,
    lastLoginAt: userWithRole.lastLoginAt,
    createdAt: userWithRole.createdAt,
    updatedAt: userWithRole.updatedAt,
    roles: formattedRoles,
  }
}
