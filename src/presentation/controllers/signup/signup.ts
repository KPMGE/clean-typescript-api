import { 
  AddAccount,
  Controller, 
  EmailValidator, 
  HttpRequest,
  HttpResponse 
} from "./singup-protocols"
import { InvalidParamError, MissingParamError } from "../../errors"
import { badRequest, serverError, ok } from "../../helpers/http-helpers"

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        } 
      }

      const { name, password, email, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isEmailValid = this.emailValidator.isValid(email)
      if (!isEmailValid) return badRequest(new InvalidParamError('email'))

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      console.error('[ERROR]: ', error)
      return serverError()
    }
  }
}
