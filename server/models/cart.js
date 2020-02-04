const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  ProductId: {
    type: Schema.Types.ObjectId, ref: 'Product'
  },
  quantity: {
    type: Number,
    required: 'Please the quantity',
  }
})

module.exports = mongoose.model('Cart', cartSchema)