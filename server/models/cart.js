var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var cartSchema = new Schema({
    product: [{name:{ type: 'ObjectId', ref: 'Product'}, jumlah: Number }],
    user: { type: 'ObjectId', ref: 'User' },
    totalPrice: Number
  });
  
  var cart = mongoose.model('Cart', cartSchema);

  module.exports = cart;
