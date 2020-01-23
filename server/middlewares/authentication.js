const jwt = require ('jsonwebtoken')
const User = require ('../models/userModel')

module.exports = (req, res, next) => {
   const accessToken = req.headers.token
   if (accessToken) {
      const authenticated = jwt.verify(accessToken, process.env.SECRET)
      if (authenticated) {
         req.currentUserId = authenticated.id
         User.findOne({_id: req.currentUserId})
            .then(data => {
               if (data) {
                  next()
               }
               else {
                  res.status(404).json({msg : `the user with id ${req.currentUserId} already deleted`})
               }
            })
            .catch (err => {
               next(err)
            })
      }
      else {
         res.status(403).json({ msg : `not allowed to make this request`})
      }
   }
   else {
      res.status(401).json({ msg : `invalid token`})
   } 
}