import { Request, Response } from 'express'
import LoginRequest from '@auth_application/DTO/LoginRequest'
import LoginJob from '@auth_application/Jobs/LoginJob'
import dic from '@core/DIC'
import JwtService from '@auth_infrastructure/Services/JwtService'
import ApiLogin from '@auth_infrastructure/Responses/ApiLogin'
import ILogin from '@auth_application/Responses/ILogin'

class LoginAction {
  public async handle(request: Request, response: Response) {
    const loginRequest: LoginRequest = new LoginRequest()
    loginRequest.email = request.body.email
    loginRequest.password = request.body.password

    const loginCommand: LoginJob = new LoginJob(
      loginRequest,
      dic.get('repository.read.authentication'),
      dic.get('service.password'),
      new JwtService()
    )

    const loginResponse: ILogin = new ApiLogin(response)
    await loginCommand.handle(loginResponse)
  }
}

export default LoginAction
