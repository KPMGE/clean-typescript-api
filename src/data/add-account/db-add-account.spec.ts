import { AddAccountRepository } from '../protocols/add-account-repository'
import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountModel, Encrypter } from "./db-add-account-protocols"

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(text: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve({
        id: 'any_id', 
          name: 'valid_name', 
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      }))
    }
  }
  return new AddAccountRepositoryStub()  
}

type SutTypes = {
  sut: DbAddAccount,
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return { sut, encrypterStub, addAccountRepositoryStub }
}

describe('DbAddAccount use-case', () => {
  it('should call encrypter with password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const encrypterSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encrypterSpy).toHaveBeenCalledWith({
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const accountData = {
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const newAccount = await  sut.add(accountData)
    expect(newAccount).toEqual({
      id: 'any_id',
      name: 'valid_name', 
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
})
