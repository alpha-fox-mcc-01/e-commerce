const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const uniqueValidator = require('mongoose-unique-validator')

const productSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter name of this product'
  },
  description: {
    type: String,
    required: 'Please enter description of this product',
  },
  category: {
    type: String,
    required: 'Please enter category of this product',
  },
  price: {
    type: Number,
    required: 'Please enter price of this product',
  },
  stock: {
    type: Number,
    required: 'Please enter stock of this product',
  },
  imageUrl: {
    type: String,
    required: 'Please enter stock of this product',
  }
})

// userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('Product', productSchema)