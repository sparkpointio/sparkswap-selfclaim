// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import refreshDatabase from "./src/database/refreshDatabase";
import seedPreRequisiteData from "./src/database/seeders/index.seeder";

beforeAll(async () => {
    await refreshDatabase()
    await seedPreRequisiteData()
})
