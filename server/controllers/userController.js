const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  register(req, res, next) {
    const { username, email, password, role } = req.body
    User.create({
      username,
      email,
      password,
      role
    })
      .then(user => {
        res
          .status(201)
          .json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
          })
      })
      .catch(err => {
        next(err)
      })
  },

  login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
      res
        .status(403)
        .json({ msg: 'Fill the blank, please..' })
    } else {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            res
              .status(404)
              .json({ msg: 'Email isn\'t registered' })
          } else {
            const valid = user.password === password
            if (valid) {
              const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET)
              req.headers.access_token = token
              res
                .status(200)
                .json({ msg: 'Login success', access_token: token })
            } else {
              res
                .status(403)
                .json({ msg: 'Invalid password' })
            }
          }
        })
        .catch(err => {
          console.log(err)
          res
            .status(500)
            .json({ msg: err.message })
        })
    }
  }
}