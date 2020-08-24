import User from '@auth_domain/Models/User'

export default interface ILogin {
  send(user: object | null, err: Error | null): void
}
