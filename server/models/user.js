var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


var userSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'email has been taken'],
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email Format']
},
  password: {
    type: String,
    minlength: [8, 'Password minimum length is 8'],
    required: 'password is required',
  },
  admin: { 
    type : Boolean, 
    default: false
},
  cart:[{product:{ type: 'ObjectId', ref: 'Product'}, jumlah: Number }]
 
});

userSchema.pre('save', function(next) {
    if (this.password){
        var hash = bcrypt.hashSync(this.password, salt);
        this.password = hash
        next();
    }
  });

var User = mongoose.model('User', userSchema);

module.exports = User
