const Product = require('../models/product')

module.exports = (req, res, next) => {
  console.log(req.userRole)
  const isAdmin = req.userRole === 'admin'
  isAdmin ? next() : res.status(401).json({ msg: 'Sorry, you\'re not authorized' })
}