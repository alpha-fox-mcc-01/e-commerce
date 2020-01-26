const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: {
    unique: true,
    type: String,
    required: 'Please enter your username',
    minlength: [10, 'Minimum length of username is 10'],
  },
  email: {
    type: String,
    required: 'Please enter your email address',
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Format'],
    unique: true
  },
  password: {
    type: String,
    required: 'This field is absolutely required',
    minlength: [10, 'Minimum length of password is 10']
  },
  role: String
})

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = mongoose.model('User', userSchema)