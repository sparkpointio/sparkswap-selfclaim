import userFactory from "@/database/factory/user.factory";

export default async function seedTestUsers () {
  return await userFactory.create(5)
}
