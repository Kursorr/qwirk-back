export default class LoginRequest {
  private _email: string | undefined
  private _password: string | undefined

  get email(): string | undefined { return this._email }
  set email(value: string | undefined) { this._email = value }
  get password(): string | undefined { return this._password }
  set password(value: string | undefined) { this._password = value }
}
