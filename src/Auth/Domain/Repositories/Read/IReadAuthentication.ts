import User from '@auth_domain/Models/User'
import Email from '@auth_domain/ValueObjects/Email'

export interface IReadAuthentication {
  findByEmail(email: Email): Promise<User | null>
}
