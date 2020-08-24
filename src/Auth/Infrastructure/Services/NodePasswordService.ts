import { password_hash, password_verify } from 'nodejs-password'
import IPassword from '@auth_domain/Services/IPassword'

export default class NodePasswordService implements IPassword {
  async hash(password: string): Promise<string | Error> {
    return await password_hash(password)
  }

  async verify(password: string, hash: string): Promise<boolean | Error> {
    return await password_verify(password, hash)
  }
}
