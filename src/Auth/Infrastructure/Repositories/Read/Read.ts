import { IReadAuthentication } from '@auth_domain/Repositories/Read/IReadAuthentication'
import Connection from '@core/Connection'
import Email from '@auth_domain/ValueObjects/Email'
import User from '@auth_domain/Models/User'
import Identity from '@auth_domain/ValueObjects/Identity'

export default class PgsqlReadAuthentication implements IReadAuthentication {
  private readonly connection: Connection

  public constructor(connection: Connection) {
    this.connection = connection
  }

  public async findByEmail(email: Email): Promise<User | null> {
    let results = null
    try {
      const statement = `select id, name, email, password from "user" where email = $1`
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
}
