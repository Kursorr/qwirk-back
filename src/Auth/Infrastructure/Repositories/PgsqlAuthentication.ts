import { IAuthentication } from '@auth_domain/Repositories/IAuthentication'
import User from '@auth_domain/Models/User'
import Connection from '@core/Connection'
import Email from '@auth_domain/ValueObjects/Email'
import Identity from '@auth_domain/ValueObjects/Identity'

export default class PgsqlAuthentication implements IAuthentication {

  private readonly connection: Connection

  public constructor(connection: Connection) {
    this.connection = connection
  }

  public async findByEmail(email: Email): Promise<User | null> {
    let results = null
    try {
      const statement = `SELECT id, name, email, password FROM "user" WHERE email = $1`
      results = await this.connection.query(statement, [email.value])
    } catch (e) {
      return null
    }

    if (results.rows.length === 0) {
      return null
    }

    const firstResult = results.rows[0]
    return new User(
        new Identity(firstResult.id),
        firstResult.name,
        new Email(firstResult.email),
        firstResult.password
    )
  }

  public async insert(user: User): Promise<User | null> {
    let results = null
    try {
      const statement = `INSERT INTO "user" (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        returning id, name, email, password, created_at`
      results = await this.connection.query(statement, [
          user.identity.Id,
          user.name,
          user.email.value,
          user.password
      ])
    } catch (e) {
      return null
    }

    const firstResult = results.rows[0]

    return new User(
      new Identity(firstResult.id),
      firstResult.name,
      new Email(firstResult.email),
      firstResult.password
    )
  }

}
