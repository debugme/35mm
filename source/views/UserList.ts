import { UserShow } from './UserShow'
import { UserProps, User } from '../models/User'
import { CollectionView } from './CollectionView'

class UserList extends CollectionView<User, UserProps> {
  renderItem = (parent: Element, model: User) => {
    const userShow = new UserShow(parent, model)
    userShow.render()
  }
}

export { UserList }
