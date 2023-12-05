import prisma from "@/library/prisma";
import {Prisma} from ".prisma/client";

const tableNames = Object.values(Prisma.ModelName);

export default async function refreshDatabase() {
  for (const tableName of tableNames) {
    await prisma.$queryRawUnsafe(`Truncate ${tableName}`)
  }
}
