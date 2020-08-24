import { Client } from 'pg'

import env from './Environment'

export default class Connection {
  private client: Client | null;

  constructor() {
    this.client = null
  }

  public async connect() {
    this.client = new Client(env.db)
    await this.client.connect()

    console.log(`Connected to database pgsql://${env.db.host}:${env.db.port}/username/password`)
  }

  public async query(statement: string, parameters: Array<any>): Promise<any> {
    if (this.client === null) {
      await this.connect()
    }

    return this.client?.query(statement, parameters)
  }
}
