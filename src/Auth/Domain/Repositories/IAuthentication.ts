import User from '@auth_domain/Models/User'
import Email from '@auth_domain/ValueObjects/Email'

export interface IAuthentication {
  findByEmail(email: Email): Promise<User | null>
  insert(user: User): Promise<User | null>
}
