const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const decoded = jwt.verify(req.headers.token, 'Kucinglucu')
    console.log(decoded, 'ini decoded')
    User.findById(decoded.id)
        .then(user => {
          console.log(user, 'user dapet')
          req.admin = user.adminRole
          console.log(req.admin)
          next()
        })
        .catch(err => {
          next(err)
        })
}