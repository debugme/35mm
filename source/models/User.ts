import { Collection } from '../models/Collection'
import { HttpServiceApi } from '../utilities/HttpService'

import { Sync } from './Sync'
import { Events } from './Events'
import { Attributes } from './Attributes'
import { Model } from './Model'

type UserProps = {
  id?: number
  name?: string
  age?: number
}

class User extends Model<UserProps> {
  static build(userProps: UserProps, httpService: HttpServiceApi<UserProps>) {
    const events = new Events()
    const attributes = new Attributes<UserProps>(userProps)
    const sync = new Sync<UserProps>(httpService)
    const user = new User(events, attributes, sync)
    return user
  }

  static buildCollection(
    httpService: HttpServiceApi<UserProps[]>,
    path: string
  ) {
    const collection = new Collection<User, UserProps>(
      httpService,
      User.build,
      path
    )
    return collection
  }
  setRandomAge() {
    const age = Math.round(Math.random() * 50)
    this.set({ age })
  }
}

export { User, UserProps }
