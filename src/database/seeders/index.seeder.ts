/**
 * Main seeder, for example = categories, default roles
 */
import seedRoles from "@/database/seeders/prereq/role.seeder";

export default async function seedPreRequisiteData() {
  await seedRoles()
}
