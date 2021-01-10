import { HttpServiceApi } from '../utilities/HttpService'
import { Events, EventsApi } from './Events'

interface CollectionApi extends EventsApi {
  fetch: () => void
}

class Collection<T, K> implements CollectionApi {
  private events: EventsApi = new Events()
  public models: T[] = []
  public constructor(
    private httpService: HttpServiceApi<K[]>,
    private build: (item: K, httpService: HttpServiceApi<K>) => T,
    private path: string
  ) {}

  async fetch() {
    const result = await this.httpService.get(this.path)
    const service = (this.httpService as unknown) as HttpServiceApi<K>
    const create = (item: K) => this.build(item, service)
    const list = result.map(create)
    this.models = list
    this.trigger('change')
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }
}

export { CollectionApi, Collection }
