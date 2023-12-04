import seedTestUsers from "@/database/seeders/test/user.seeder";

export default async function seedDevData() {
  await seedTestUsers()
}
