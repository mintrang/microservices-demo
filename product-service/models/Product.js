const mongoose = require('mongoose')

const Model = new mongoose.Schema({
  name: { type: String },
  image: { type: String, unique: true },
  userId: { type: String, select: false },
}, { timestamps: true })

const Product = mongoose.model('Product', Model)
module.exports = Product