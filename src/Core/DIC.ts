import NodePasswordService from '@auth_infrastructure/Services/NodePasswordService'
import Connection from '@core/Connection'
import PgsqlAuthentication from '@auth_infrastructure/Repositories/PgsqlAuthentication'

export type dicCallback = ((dic: DIC) => any)

class DIC {

  private callbacks: Map<string, dicCallback>
  private instances: Map<string, any>

  public constructor() {
    this.callbacks = new Map<string, dicCallback>()
    this.instances = new Map<string, any>()
  }

  public bind(name: string, callback: dicCallback) {
    this.callbacks.set(name, callback)
  }

  public get(name: string) {
    if (this.instances.has(name)) {
      return this.instances.get(name)
    }

    const resultCallback = this.callbacks.get(name)
    if (resultCallback === undefined) {
      return null
    }

    const inst = resultCallback(this)
    this.instances.set(name, inst)

    return inst
  }
}

const instance: DIC = new DIC()

instance.bind('service.password', (dic: DIC) => {
  return new NodePasswordService()
})

instance.bind('connection', (dic: DIC) => {
  return new Connection()
})

instance.bind('repository.authentication', (dic: DIC) => {
  return new PgsqlAuthentication(dic.get('connection'))
})

export default instance
