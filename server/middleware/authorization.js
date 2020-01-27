const User = require('../models/usermodel')

module.exports = function (req, res, next) {
console.log(req.currentUserId, 'di authorization')
          User.findOne({_id: req.currentUserId})
              .then(data => {
                console.log(data.role)
                  if (data.role === 'admin') {
                      console.log('lolos authorization')
                      next()
                  } else {
                      res.status(401).json({error: 'You are not authorized to do this action'})
                  }
              })
              .catch(err => {
                  next(err)
              }) 
}