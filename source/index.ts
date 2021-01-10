import { HttpService } from './utilities/HttpService'
import { UserProps, User } from './models/User'
// import { UserForm } from './views/UserForm'
// import { UserShow } from './views/UserShow'
// import { UserEdit } from './views/UserEdit'
import { UserList } from './views/UserList'

/** (1) How to test the User class */
// ;(function () {
//   const userProps: UserProps = { name: 'bob', age: 37 }
//   const host = 'http://localhost:3000'
//   const httpService = new HttpService<UserProps>(host)
//   const user = User.build(userProps, httpService)

//   user
//     .save()
//     .then(() => user.fetch())
//     .then((data) => console.debug('[user]', data))
// })()

/** (2) How to test the User Collection class */
// ;(function () {
//   const host = 'http://localhost:3000'
//   const path = 'users'
//   const httpService = new HttpService<UserProps[]>(host)
//   const collection = User.buildCollection(httpService, path)
//   console.debug('[before]', collection)
//   collection.on('change', () => console.debug('[after]', collection))
//   collection.fetch()
// })()

/** (3) How to test the UserForm class */
// ;(function () {
//   const userProps: UserProps = { name: 'bob', age: 37 }
//   const host = 'http://localhost:3000'
//   const httpService = new HttpService<UserProps>(host)

//   const user = User.build(userProps, httpService)
//   const parent = document.querySelector('body')

//   const userForm = new UserForm(parent, user)
//   userForm.on('change', () => console.log('user was changed', userForm))
//   userForm.render()
// })()

/** (4) How to test the UserShow class */
// ;(function () {
//   const userProps: UserProps = { name: 'bob', age: 37 }
//   const host = 'http://localhost:3000'
//   const httpService = new HttpService<UserProps>(host)

//   const user = User.build(userProps, httpService)
//   const parent = document.querySelector('body')

//   const userShow = new UserShow(parent, user)
//   userShow.on('change', () => console.log('user was changed', userShow))
//   userShow.render()
// })()

/** (5) How to test the UserEdit class */
// ;(function () {
//   const userProps: UserProps = { name: 'bob', age: 37 }
//   const host = 'http://localhost:3000'
//   const httpService = new HttpService<UserProps>(host)

//   const user = User.build(userProps, httpService)
//   const parent = document.querySelector('body')

//   const userEdit = new UserEdit(parent, user)
//   userEdit.render()
// })()

/** How to test the UserList class */
;(function () {
  const host = 'http://localhost:3000'
  const path = 'users'
  const httpService = new HttpService<UserProps[]>(host)
  const collection = User.buildCollection(httpService, path)
  const handler = () => {
    const parent = document.querySelector('body')
    const userList = new UserList(parent, collection)
    userList.render()
  }
  collection.on('change', handler)
  collection.fetch()
})()
