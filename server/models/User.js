const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Format']
  },
  password: {
    type: String,
    minlength: [7, 'Password minimum length is 7']
  },
  cartLists: [{ 
    productId: {
      type: Schema.Types.ObjectId, 
      ref: 'Product'
    },
    quantity: Number
  }],
  adminRole: Boolean
})

userSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash
  next();
});

const User = mongoose.model('User', userSchema)

module.exports = User