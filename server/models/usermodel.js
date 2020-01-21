const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
  email: {
    type: String,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email Format'],
    required: 'Email address is required',
    validate: {
      validator: function(email) {
        return User.findOne({email: email})
                    .then (user => {
                        if (user) {
                            return false
                        } else {
                            return true
                        }
                    })
                    .catch (err => {
                        next(err)
                    })
    }
  }
  },
  password: {
    type: String,
    minlength: [8, 'Password minimum length is 8']
  },
  username: String,
  cart: [{ product : {type: Schema.Types.ObjectId, refs: 'Product'},  quantity: Number}],
  role: { type: String, default: 'Customer' }
})

userSchema.pre('save', function() {
 
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(this.password, salt);
  this.password = hash
})

const User = mongoose.model('User', userSchema)



module.exports = User