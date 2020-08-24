import { v4 as uuidV4 } from 'uuid'

class Identity {

  private readonly id: string

  get Id(): string { return this.id }

  public constructor(id: string) {
    this.id = id
  }

  public static next() {
    return new Identity(uuidV4())
  }

}

export default Identity
