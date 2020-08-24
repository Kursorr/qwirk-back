import IRegister from '@auth_application/Responses/IRegister'
import User from '@auth_domain/Models/User'
import { Response } from 'express'

export default class ApiRegister implements IRegister {
  private readonly response: Response

  public constructor(responseExpress: Response) {
    this.response = responseExpress
  }

  public send(user: User | null, err: Error | null): void {
    if (err) {
      return this.response.json({
        message: err.message
      }).status(400).end()
    }

    this.response.json({
      id: user!.identity.Id,
      name: user!.name,
      email: user!.email
    }).end()
  }
}
