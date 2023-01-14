import { EmailValidatorAdapter } from "./email-validator-adapter"
import validator from "validator"
import { EmailValidator } from "../presentation/protocols"

jest.mock('validator', () => ({
  isEmail(): boolean { return true }
}))

type SutTypes = {
  sut: EmailValidator
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter()
  return { sut }
}

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const { sut } = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidmail@mail.com')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const { sut } = makeSut()
    const isValid = sut.isValid('validmail@mail.com')
    expect(isValid).toBe(true)
  })

  it('Should call isValid method with correct email', () => {
    const { sut } = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
