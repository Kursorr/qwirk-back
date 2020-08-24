class Email {
  private readonly _value: string

  get value(): string { return this._value }

  public constructor(email: string) {
    Email.assertFormat(email)

    this._value = email
  }

  private static assertFormat(email: string) {
    if (email.indexOf('@') === -1) {
      throw new Error(`Email ${email} is not a valid RFC email`)
    }
  }

}

export default Email
