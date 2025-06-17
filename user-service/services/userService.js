const Model = require('../models/User')

const getUserById = async (id) => {
  try {
    const user = await Model.findById(id).lean()
    return user
  } catch (error) {
    console.log('===api errro===', error)
    throw (new Error(error))
  }

}

const userList = async () => {
  try {
    const users = await Model.find().lean()
    return users
  } catch (error) {
    throw new Error(error)
  }
}

const createUser = async ({name, email}) => {
  try {
    const user = await Model.create({name, email})
    return user
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = { getUserById, userList, createUser }