import roleModel from "@/library/models/role.model";
import {RoleEnum} from "@/library/enums/roles.enum";
import enumUtil from "@/library/utils/enum.utils";

export default async function seedRoles() {
  const roleList = enumUtil.getKeys(RoleEnum)

  for (const value of roleList) {
    const key = Number(RoleEnum[value])
    await roleModel.upsert({
      create: {
        id: key,
        name: value
      },
      update: {},
      where: {
        id: key,
      }
    })
  }
}

