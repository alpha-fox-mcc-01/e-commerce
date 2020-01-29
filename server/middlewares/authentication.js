const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const userToken = req.headers.access_token;
  if(userToken) {
    const authenticated = jwt.verify(userToken, process.env.SECRET)
    if (authenticated) {
      req.currentUserId = authenticated._id
      User.findById(authenticated._id)
      .then(user => {
        if(user) {
          next()
        } else {
          next({
            name: "Bad Request",
            message: 'Authentication Error',
            status: 400
          })
        }
      })
      .catch(next)
    }
    else {
      next({
        name: "Bad Request",
        message: 'Invalid token',
        status: 400
      })
    }
  }
  else {
    next({
      name: "Bad Request",
      message: 'No access token',
      status: 400
    })
  }
}