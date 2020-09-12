import User from '@auth_domain/Models/User'

export interface IWriteAuthentication {
  insert(user: User): Promise<User | null>
}
