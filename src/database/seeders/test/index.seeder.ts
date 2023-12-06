import seedTestUsers from "@/database/seeders/test/user.seeder";
import seedTestAirdrop from "@/database/seeders/test/airdrop.seeder";

export default async function seedDevData() {
  await seedTestUsers()
  await seedTestAirdrop()
}
