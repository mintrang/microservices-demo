
const UserService = require('../services/userService')

const GetUser = async (call, callback) => {

  try {
    const user = await UserService.getUserById(call.request.id)
    if (!user) {
      return callback(new Error('Cannot find user!'))
    }
    callback(null, user)
  } catch (error) {
    callback(error);
  }

}

const ListUser = async (call, callback) => {
  try {
    const users = await UserService.userList()
    callback(null, {users: users})
  } catch (error) {
    callback(error)
  }
}

const CreateUser = async (call, callback) => {
  try {
    const { name, email } = call.request
    const user = UserService.createUser({ name, email })
    callback(null, user)
  } catch (error) {
    callback(error)
  }
}

module.exports = { GetUser, ListUser, CreateUser }
