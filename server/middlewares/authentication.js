const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const decoded = jwt.verify(req.headers.token, 'Kucinglucu')
  User.findById(decoded.id)
    .then(user => {
      req.admin = user.adminRole
      req.idUser = user._id
      next()
    })
    .catch(err => {
      next(err)
    })
}