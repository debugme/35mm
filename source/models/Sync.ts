import { Identifiable } from '../models/Model'
import { HttpServiceApi } from '../utilities/HttpService'

interface SyncApi<T> {
  save: (data: T) => Promise<T>
  fetch: (id: number) => Promise<T>
}

class Sync<T extends Identifiable> implements SyncApi<T> {
  constructor(private httpService: HttpServiceApi<T>) {}

  async save(data: T): Promise<T> {
    const { id } = data
    const [path, method] = id ? [`users/${id}`, 'put'] : ['users', 'post']
    const json = await this.httpService[method](path, data)
    return json
  }

  async fetch(id: number): Promise<T> {
    const path = `users/${id}`
    const json = await this.httpService.get(path)
    return json
  }
}

export { SyncApi, Sync }
