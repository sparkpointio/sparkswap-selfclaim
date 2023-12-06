import airdropFactory from "@/database/factory/airdrop.factory";

export default async function seedTestAirdrop () {
  return await airdropFactory.create(5)
}

