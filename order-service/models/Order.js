const mongoose = require('mongoose')

const Model = new mongoose.Schema({
  productId: { type: String },
  userId: { type: String },
}, { timestamps: true })

const Product = mongoose.model('Order', Model)
module.exports = Product