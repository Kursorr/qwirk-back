import ILogin from '@auth_application/Responses/ILogin'
import { Response } from 'express'

export default class ApiLogin implements ILogin {
  private readonly response: Response

  public constructor(responseExpress: Response) {
    this.response = responseExpress
  }

  send(obj: object | null, err: Error | null): void {
    if (err) {
      return this.response.json({
        message: err.message
      }).status(400).end()
    }

    this.response.json(obj).end()
  }

}
