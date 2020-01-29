const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name : String,
  email : {
    type : String,
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format']
  },
  password : {
    type : String,
    minlength : 6
  }
})




const User = mongoose.model('User', userSchema)

module.exports = User