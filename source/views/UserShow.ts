import { View } from './View'
import { UserProps, User } from '../models/User'

class UserShow extends View<UserProps, User> {
  protected getTemplate = () => {
    const name = this.model.get('name')
    const age = this.model.get('age')
    return `
			<div>
				<h1>User Details</h1>
				<div>Name: ${name}</div>
				<div>Age: ${age}</div>
			</div>
		`
  }
}

export { UserShow }
