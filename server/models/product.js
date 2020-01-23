var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var productSchema = new Schema({
  name:  {
    type: String,
    required: [true, 'name cannot be empty']
  }, 
  desc: {
    type: String,
    required: [true, 'desc cannot be empty']
  },
  price: {
    type: Number,
    min: [1000, 'stock is less than 1000'],
    required: [true,]
  },
  stock: {
    type: Number,
    min: [1, 'stock is less than 1'],
  },
  img: String
});



var Product = mongoose.model('Product', productSchema);

module.exports = Product