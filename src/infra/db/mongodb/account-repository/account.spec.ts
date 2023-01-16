import { MongoHelper } from "../helpers/mongo-helper"
import { MongoAccountRepository } from "./account"

import dotenv from 'dotenv'
dotenv.config()

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    console.log('connection string: ', process.env.MONGO_TEST_URL)
    await MongoHelper.connect(process.env.MONGO_TEST_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  it('should return an account on success', async () => {
    const sut = new MongoAccountRepository()
    const account = await sut.add({
      name: 'any_name', 
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
