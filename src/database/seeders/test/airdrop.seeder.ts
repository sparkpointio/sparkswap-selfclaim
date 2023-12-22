import airdropFactory from "@/database/factory/airdrop.factory";
import airdropUserFactory from "@/database/factory/airdropUser.factory";
import {Airdrop, AirdropUser} from "@prisma/client";

type AirdropWithUsers = {
  airdrop: Airdrop
  users: AirdropUser[];
};

export default async function seedTestAirdrop() {
  const airdropsWithUsers: AirdropWithUsers[] = []
  const airdropsWithMerkle = await airdropFactory.create(1, 5)

  for (const airdropWithMerkle of airdropsWithMerkle) {
    airdropsWithUsers.push({
      airdrop: airdropWithMerkle.airdrop,
      users: await airdropUserFactory.create(airdropWithMerkle)
    });
  }

  return airdropsWithUsers
}
