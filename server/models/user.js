const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email address is required',
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: 'Password is required',
    minlength: [8, 'Password minimum length is 8']
  },
  admin: Boolean,
  cart: [{
    product : { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }]
})

userSchema.pre('save', function() {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash

}) 

const User = mongoose.model('User', userSchema);

module.exports = User;