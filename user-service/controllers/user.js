const User = require('@/models/user')

const getUser = async (req, res, next) => {
  try {
    const users = await User.find()
    res.json({ success: true, data: users })
  } catch (error) {
    res.json({ success: false, error: error })
  }
}

const createUser = async (req, res, next) => {
  try {
    const body = req.body
    const data = await User.create(body)
    res.json({ success: true, data: data })
  } catch (error) {
    res.json({ success: false, error: error })
  }
}
module.exports = { getUser, createUser }