const User = require ('../models/userModel')

module.exports = (req, res, next) => {
   User.findOne({_id : req.currentUserId})
      .then (data => {
         if (data) {
            if (data.admin) {
               next()
            }
            else {
               res.status(401).json({msg : `you're not authorized to make this request`})
            }
         }
         else {
            res.status(404).json({msg : `user not found`})
         }
      })
      .catch (err => {
         next(err)
      })
}