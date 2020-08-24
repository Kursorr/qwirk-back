import Identity from '@auth_domain/ValueObjects/Identity'
import Email from '@auth_domain/ValueObjects/Email'
import IPassword from '@auth_domain/Services/IPassword'

class User {
  private readonly _identity: Identity
  private readonly _name: string
  private readonly _email: Email
  private _password: string | null

  get identity(): Identity { return this._identity }
  get name(): string { return this._name }
  get email(): Email { return this._email }
  get password(): string | null { return this._password }

  public constructor(identity: Identity, name: string, email: Email, password: string | null) {
    this._identity = identity
    this._name = name
    this._email = email
    this._password = password
  }

  public async changePassword(password: string, passwordService: IPassword) {
    this._password = <string> await passwordService.hash(password)
  }

}

export default User
