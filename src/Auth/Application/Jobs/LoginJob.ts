import LoginRequest from '@auth_application/DTO/LoginRequest'
import { IReadAuthentication } from '@auth_domain/Repositories/Read/IReadAuthentication'
import IPassword from '@auth_domain/Services/IPassword'
import ILogin from '@auth_application/Responses/ILogin'
import Email from '@auth_domain/ValueObjects/Email'
import IJwt from '@auth_domain/Services/IJwt'
import env from '@core/Environment'

export default class LoginJob {
  private readonly loginRequest: LoginRequest
  private readonly authenticationReadRepository: IReadAuthentication
  private readonly passwordService: IPassword
  private readonly jsonWebTokenService: IJwt

  public constructor(
    loginRequest: LoginRequest,
    authenticationReadRepository: IReadAuthentication,
    passwordService: IPassword,
    jsonWebTokenService: IJwt
  ) {
    this.loginRequest = loginRequest
    this.authenticationReadRepository = authenticationReadRepository
    this.passwordService = passwordService
    this.jsonWebTokenService = jsonWebTokenService
  }

  public async handle(loginResponse: ILogin) {
    const email: Email = new Email(this.loginRequest.email ?? '')

    let user = null
    try {
      user = await this.authenticationReadRepository.findByEmail(email)
      await this.passwordService.verify(this.loginRequest.password ?? '', user?.password ?? '')
    } catch (e) {
      return loginResponse.send(null, new Error('Problem with your email or password'))
    }

    const token = this.jsonWebTokenService.sign(
      { userId: user!.identity.Id },
      env.jwt.token,
      { expiresIn: '1h' }
    )

    loginResponse.send({
      accessToken: token,
      expire: 3600
    }, null)
  }

}
