import '@testing-library/jest-dom'
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import airdropModel from "@/library/models/airdrop.model";
import {faker} from "@faker-js/faker";
import seedTestAirdrop from "@/database/seeders/test/airdrop.seeder";
import refreshDatabase from "@/database/refreshDatabase";
import seedPreRequisiteData from "@/database/seeders/index.seeder";

beforeAll(async () => {
  await refreshDatabase()
  await seedPreRequisiteData()
  await seedTestAirdrop()
})

afterAll(async () => {
})

describe('Airdrop model', () => {
  it('Airdrop has creator (using seeded data)', async () => {
    const airdrop = await airdropModel.findFirst({include: {creator: true}})

    expect(airdrop).not.toBeNull()
    expect(airdrop?.creator).not.toBeNull()
  })
})
