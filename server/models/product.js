const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: 'Product name is required'
  },
  description: {
    type: String,
    required: 'Description is required'
  },
  image: {
    type: String,
    default: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg'
  },
  price: {
    type: Number,
    required: 'Product price is required',
    min: [1000, 'Minimum price is 1.000']
  },
  stock: {
    type: Number,
    required: 'Product stock is required',
    min: [1, 'Minimum stock is 1']
  }
})


const Product = mongoose.model('Product', productSchema);

module.exports = Product;