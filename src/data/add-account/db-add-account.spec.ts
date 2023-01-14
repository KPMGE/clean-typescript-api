import { Encrypter } from "../protocols/encrypter"
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount use-case', () => {
  it('should call encrypter with password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(text: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })
})
