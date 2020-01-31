const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
      type: String,
      required: [true, 'Name is required']
    },
  price: {
      type :Number,
      min: [0, 'Minimal price is 0'],
      required: [true, 'Price is required']
    },
  stock: {
      type: Number,
      min: [0, 'Minimal stock is 0'],
      required: [true, 'Stock is required']
    },
  description: String,
  image: String
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product