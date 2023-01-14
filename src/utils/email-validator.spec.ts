import { EmailValidatorAdapter } from "./email-validator"
import validator from "validator"

jest.mock('validator', () => ({
  isEmail(): boolean { return true }
}))

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalidmail@mail.com')
    expect(isValid).toBe(false)
  })

  it('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('validmail@mail.com')
    expect(isValid).toBe(true)
  })
})
