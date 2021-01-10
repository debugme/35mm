import { SyncApi } from './Sync'
import { EventsApi } from './Events'
import { AttributesApi } from './Attributes'

interface Identifiable {
  id?: number
}

interface ModelApi<T> extends EventsApi, AttributesApi<T>, SyncApi<T> {}

class Model<T extends Identifiable> implements ModelApi<T> {
  constructor(
    private events: EventsApi,
    private attributes: AttributesApi<T>,
    private sync: SyncApi<T>
  ) {}

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  get getAll() {
    return this.attributes.getAll
  }

  set(update: T): void {
    this.attributes.set(update)
    this.events.trigger('change')
  }

  async save(): Promise<T> {
    const data = this.attributes.getAll()
    const onSuccess = (data: T) => {
      this.attributes.set(data)
      this.trigger('save')
      return data
    }
    const data_1 = await this.sync.save(data)
    return onSuccess(data_1)
  }

  async fetch(): Promise<T> {
    const id = this.attributes.get('id')
    if (typeof id !== 'number')
      throw new Error('Error - cannot fetch without an id')
    const json = await this.sync.fetch(id)
    this.set(json)
    return json
  }
}

export { ModelApi, Model, Identifiable }
