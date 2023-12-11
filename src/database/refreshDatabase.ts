import prisma from "@/library/prisma";
import {Prisma} from ".prisma/client";

const tableNames = Object.values(Prisma.ModelName);
type Keys = keyof typeof tableNames;
export type TableNames = (typeof tableNames)[Keys];
// exclude the constants or prerquisite values
const excludedTableNames = [
  'Role'
];

export default async function refreshDatabase() {
  for (const tableName of tableNames) {
    if (!excludedTableNames.includes(tableName)) {
      await prisma.$queryRawUnsafe(`Truncate ${tableName}`);
    }
  }
}
