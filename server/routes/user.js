const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res, next) => {
  if (req.body.adminRole === undefined) req.body.adminRole = false
  User
    .create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartLists : [],
      adminRole: req.body.adminRole
    })
    .then(user => {
      const token = jwt.sign({ id: user._id }, 'Kucinglucu')
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        cartLists: user.cartLists,
        adminRole: user.adminRole,
        token
      })
    })
    .catch(err => {
      next(err)
    })
})

router.post('/login', (req, res, next) => {
  console.log('masuk ke login');
  
  User
    .findOne({
      email: req.body.email      
    })
    .then(user => {
      if (user){
        if (bcrypt.compareSync(req.body.password, user.password)){
          const token = jwt.sign({ id: user._id }, 'Kucinglucu');
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            cartLists: user.cartLists,
            token
          })
        } else {
          next({
            msg :'Input Wrong',
            error: 'Username / Password is wrong'
          })
        }
      } else {
        next({
          msg :'Input Wrong',
          error: 'Username / Password is wrong'
        })
      }
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router