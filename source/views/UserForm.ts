import { UserProps, User } from '../models/User'
import { View, EventHandlers } from './View'

class UserForm extends View<UserProps, User> {
  protected getTemplate = () => {
    const name = this.model.get('name')
    return `
			<div>
				<input type="text" class="name" placeholder="${name}"/>
        <button class="set-name">UpdateName</button>
        <div><button class="set-age">Set Random Age</button></div>
        <div><button class="save-model">Save</button></div>
			</div
		`
  }

  protected getEventHandlers = (): EventHandlers => {
    return {
      'click:.set-name': this.onSetName,
      'click:.set-age': this.onSetAge,
      'click:.save-model': this.onSave,
    }
  }

  private onSetAge = () => this.model.setRandomAge()

  private onSetName = () => {
    const input = document.querySelector('input')
    const name = input.value.trim()
    if (name) this.model.set({ name })
  }

  private onSave = () => {
    this.model.save()
  }
}

export { UserForm }
