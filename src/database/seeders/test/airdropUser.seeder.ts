import airdropUserFactory from "@/database/factory/airdropUser.factory";

export default async function seedTestAirdropUser() {
  return await airdropUserFactory.create(5)
}

