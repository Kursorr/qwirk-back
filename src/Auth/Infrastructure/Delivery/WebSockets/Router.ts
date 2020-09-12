import { Socket } from 'socket.io'
import RegisterAction from '@auth_infrastructure/Delivery/WebSockets/RegisterAction'

export default class Router {
  private readonly socket: Socket

  public constructor(socket: Socket) {
    this.socket = socket

    this.socket.on('disconnect', this.onDisconect.bind(this))
  }

  public run() {
    this.socket.on('auth:register', async (data: any) => {
      const websocketRegisterAction = new RegisterAction()
      await websocketRegisterAction.handle(data, this.socket)
    })
  }

  public onDisconect() {
    console.log('client disconnected')
  }
}
