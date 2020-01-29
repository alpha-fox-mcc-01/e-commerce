const User = require('../models/userModel')

module.exports = (req, res, next) => {
  User.findById({_id: req.currentUserId})
    .then(user => {
      if(user.admin) {
        next()
      } else {
        next({
          name: "Unauthorized",
          message: "You are not authorized to take this action",
          status: 401
        })
      }
    })
    .catch(next)
}