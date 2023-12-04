import '@testing-library/jest-dom'
import {beforeAll, describe, expect, it} from "@jest/globals";
import userFactory from "@/database/factory/user.factory";
import refreshDatabase from "@/database/refreshDatabase";

beforeAll(async () => {
  await refreshDatabase()
})

describe('User factory', () => {
  it('creates multiple records', async () => {
    const records = await userFactory.create(5)
    expect(records).toHaveLength(5)
  })
})
