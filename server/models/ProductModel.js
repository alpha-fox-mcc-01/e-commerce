const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: String,
  description: String,
  price: {
    type: Number,
    min: [1000, 'Minimum price is 1000']
  },
  stocks: Number,
  imageUrl: String
})

const Product = mongoose.model('Product', productSchema)

module.exports= Product