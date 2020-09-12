import IRegister from '@auth_application/Responses/IRegister'
import User from '@auth_domain/Models/User'
import {Socket} from 'socket.io'

export default class WebsocketRegister implements IRegister {
  private readonly socket: Socket

  public constructor(socket: Socket) {
    this.socket = socket
  }

  public send(user: User | null, err: Error | null): void {
    if (err) {
      this.socket.emit('auth:register:error', {
        message: err.message
      })
      return undefined
    }

    this.socket.emit('auth:register:success', {
      id: user!.identity.Id,
      name: user!.name,
      email: user!.email
    })
  }
}
