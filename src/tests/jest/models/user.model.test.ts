import '@testing-library/jest-dom'
import {afterAll, beforeAll, describe, expect, it} from "@jest/globals";
import userModel from "@/library/models/user.model";
import {faker} from "@faker-js/faker";
import seedTestUsers from "@/database/seeders/test/user.seeder";
import refreshDatabase from "@/database/refreshDatabase";

beforeAll(async () => {
  await refreshDatabase()
  await seedTestUsers()
})

afterAll(async () => {
})

describe('User model', () => {
  it('creates new user', async () => {
    const user = await userModel.create({
      data: {walletAddress: faker.string.hexadecimal({length: 40})}
    })

    expect(user).not.toBeNull()
    expect(user?.walletAddress).not.toBeNull()
  })
})
