import {PrismaClient} from '@prisma/client'
import { parseArgs } from 'node:util'
import {ParseArgsConfig} from "util";
import seedTestData from "./seeders/test/index.seeder";
import seedProdData from "./seeders/prod/index.seeder";
import seedPreRequisiteData from "./seeders/index.seeder";

const prisma = new PrismaClient()

const options = {
  category: { type: 'string' },
}

/**
 *  pass [-- --category test] in command line to specify category
 */
async function main() {
  const {
    values: { category },
  } = parseArgs({ options } as ParseArgsConfig)

  // seed prerequisite data
  await seedPreRequisiteData()
  switch (category) {
    case 'prod':
      /** data for your prod environment */
      await seedProdData();
      break
    default:
      /** seed */
      await seedTestData();
      break
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
