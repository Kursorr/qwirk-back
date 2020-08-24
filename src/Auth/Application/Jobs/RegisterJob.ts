import { IAuthentication } from '@auth_domain/Repositories/IAuthentication'
import RegisterRequest from '@auth_application/DTO/RegisterRequest'
import Email from '@auth_domain/ValueObjects/Email'
import User from '@auth_domain/Models/User'
import Identity from '@auth_domain/ValueObjects/Identity'
import IPassword from '@auth_domain/Services/IPassword'
import IRegister from '@auth_application/Responses/IRegister'

export default class RegisterJob {

  private readonly registerRequest: RegisterRequest
  private readonly authenticationRepository: IAuthentication
  private readonly passwordService: IPassword

  public constructor(
      registerRequest: RegisterRequest,
      authenticationRepository: IAuthentication,
      passwordService: IPassword
  ) {
    this.registerRequest = registerRequest
    this.authenticationRepository = authenticationRepository
    this.passwordService = passwordService
  }

  public async handle(registerResponse: IRegister) {
    const email: Email = new Email(this.registerRequest.email ?? '')
    if (await this.authenticationRepository.findByEmail(email) !== null) {
      return registerResponse.send(null, new Error('User already exist'))
    }

    const userInsert: User = new User(
        Identity.next(),
        this.registerRequest.name ?? '',
        email,
        null
    )
    await userInsert.changePassword(this.registerRequest.password ?? '', this.passwordService)

    try {
      const user = await this.authenticationRepository.insert(userInsert)
      registerResponse.send(user, null)
    } catch (e) {
      registerResponse.send(null, e)
    }
  }
}
