const User = require('../models/userModel')

class UserController {

  static register(req, res, next){
    // console.log('masuk ga ?');
    // console.log(req.body);
    
    let dataUser = {
      name : req.body.name,
      email : req.body.email,
      password : req.body.password
    }
    User
      .create(dataUser)
      .then(user => {
        console.log(user);
        console.log('ke hit dulu ga ini ?');
        
        res.status(201).json({
          name : user.password,
          email : user.email
        })
      })
      .catch(err => {
        console.log(err);
        next(err)
      })
  }
}

module.exports = UserController