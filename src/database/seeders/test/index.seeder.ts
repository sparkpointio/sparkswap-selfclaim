import seedTestUsers from "@/database/seeders/test/user.seeder";
import seedTestAirdrop from "@/database/seeders/test/airdrop.seeder";
import {TableNames} from "@/database/refreshDatabase";
import {Prisma} from ".prisma/client";

export default async function seedDevData(table?: TableNames) {
  const seeders: any = {
    [Prisma.ModelName.User]: seedTestUsers,
    [Prisma.ModelName.Airdrop]: seedTestAirdrop,
  }

  if (table) {
    // if a specific table is provided, only run the related seeder
    await seeders[table as any]();
  } else {
    // otherwise run all seeders
    for (const seederName in seeders) {
      if (seeders.hasOwnProperty(seederName)) {
        await seeders[seederName]();
      }
    }
  }
}
