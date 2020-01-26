const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
   name: String,
   email: {
      type: String,
      unique: true,
      match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Format'],
      required : true
   },
   password: {
      type: String,
      minlength: [5, `password minimum is 5`],
      required : true
   },
   admin: {
      type : Boolean,
      default : false,
   },
   cart : [{
      item : {
         type : `ObjectId`,
         ref : `Item`
      },
      quantity : Number
   }]
})

userSchema.pre('save', function () {
   const salt = bcrypt.genSaltSync(10);
   let hash = bcrypt.hashSync(this.password, salt);
   this.password = hash
})

const User = mongoose.model('User', userSchema)

module.exports = User