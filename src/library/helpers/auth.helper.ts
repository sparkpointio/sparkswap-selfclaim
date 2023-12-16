import {NextApiRequest} from "next";
import {ThirdwebAuthUser} from "@thirdweb-dev/auth/next";
import {getUser} from "@/pages/api/auth/[...thirdweb]";
import userModel, {assignRole, hasRole, UserWithRole} from "@/library/models/user.model";
import config from "@/config/index";
import {RoleEnum} from "@/library/enums/roles.enum";

type AuthUserSessionData = {
  createdAt: Date | null;
  lastLoginAt: Date | null;
  id: number;
  walletAddress: string;
  updatedAt: Date | null
  roles: Array<{
    assignedAt: Date;
    [otherFields: string]: any;
  }>;
};

export type AuthUser = ThirdwebAuthUser & {
  session: AuthUserSessionData
}

export const getAuthUser = async (req: NextApiRequest): Promise<AuthUser> => {
  if (process.env.APP_ENV === 'test' || !config.app.guards.enabled) {
    /**
     * This is helpful when testing the API thru postman
     */
    let authUser
    let testUser = await userModel.findFirst()
    if (!testUser) {
      testUser = await userModel.create({
        data: {
          walletAddress: '0xd7dCD77D279EeD59C7D2D94982d18FEdf03CaaE8'
        }
      })
    }
    if (!(await hasRole(testUser, RoleEnum.SuperAdmin))) {
      const userWithRole = await assignRole(testUser, RoleEnum.SuperAdmin)
      authUser = formatAuthUser(userWithRole)
    } else {
      authUser = formatAuthUser(<UserWithRole> testUser)
    }


    return <AuthUser>{
      address: authUser.walletAddress,
      session: {
        ...authUser
      }
    }
  }
  return <AuthUser>await getUser(req);
}

export const formatAuthUser = (userWithRole: UserWithRole): AuthUserSessionData => {
  const formattedRoles = userWithRole.roles.map((val: any) => {
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
