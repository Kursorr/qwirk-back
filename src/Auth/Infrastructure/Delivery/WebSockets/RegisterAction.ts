import RegisterJob from '@auth_application/Jobs/RegisterJob'
import RegisterRequest from '@auth_application/DTO/RegisterRequest'
import IRegister from '@auth_application/Responses/IRegister'
import WebsocketRegister from '@auth_infrastructure/Responses/WebsocketRegister'
import dic from '@core/DIC'
import { Socket } from 'socket.io'

class RegisterAction {
  public async handle(data: any, socket: Socket) {
    const registerRequest: RegisterRequest = new RegisterRequest()
    registerRequest.name = data.name
    registerRequest.email = data.email
    registerRequest.password = data.password

    const registerCommand: RegisterJob = new RegisterJob(
      registerRequest,
      dic.get('repository.authentication'),
      dic.get('service.password')
    )

    const registerResponse: IRegister = new WebsocketRegister(socket)
    await registerCommand.handle(registerResponse)
  }
}

export default RegisterAction
