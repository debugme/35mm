import { View } from './View'
import { UserProps, User } from '../models/User'
import { UserShow } from './UserShow'
import { UserForm } from './UserForm'

class UserEdit extends View<UserProps, User> {
  protected setUpRegions = () => {
    this.regions = [
      { type: UserShow, selector: '.user-show', element: null },
      { type: UserForm, selector: '.user-form', element: null },
    ]
  }
  protected getTemplate = () => {
    return `
			<div>
				<div class="user-show"></div>
				<div class="user-form"></div>
			</div>
		`
  }
}

export { UserEdit }
