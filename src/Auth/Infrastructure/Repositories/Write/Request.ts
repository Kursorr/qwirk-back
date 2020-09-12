import { IWriteAuthentication } from '@auth_domain/Repositories/Write/IWriteAuthentication'
import User from '@auth_domain/Models/User'
import Identity from '@auth_domain/ValueObjects/Identity'
import Email from '@auth_domain/ValueObjects/Email'
import Connection from '@core/Connection'

export default class PgsqlRequestAuthentication implements IWriteAuthentication {
  private readonly connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  public async insert(user: User): Promise<User | null> {
    let results = null
    try {
      const statement = `
        insert into "user" (id, name, email, password)
        values ($1, $2, $3, $4)
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
