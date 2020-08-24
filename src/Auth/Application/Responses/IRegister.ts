import User from '@auth_domain/Models/User'

export default interface IRegister {
  send(user: User | null, err: Error | null): void
}
