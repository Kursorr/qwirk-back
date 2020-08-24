export default class RegisterRequest {

  private _name: string | undefined
  private _email: string | undefined
  private _password: string | undefined

  get name(): string | undefined { return this._name}
  set name(value: string | undefined) { this._name = value}
  get email(): string | undefined { return this._email}
  set email(value: string | undefined) { this._email = value}
  get password(): string | undefined { return this._password}
  set password(value: string | undefined) { this._password = value}

}
