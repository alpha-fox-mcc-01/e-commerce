const router = require('express').Router()
const User = require('../models/User')
const authentication = require('../middlewares/authentication')


router.post('/:id', authentication, (req, res, next) => {
  if (req.idUser == req.params.id) {
    User.findByIdAndUpdate(req.params.id, {
      $push: {
        cartLists: {
          productId: req.body.productId,
          quantity: req.body.quantity
        }
      }
    })
      .then(user => {
        console.log(user)
        res.status(200).json({msg: 'Add product to cart success'})
      })
      .catch(err => {
        next(err)
      })
  } else {
    next({
      msg: 'Not Authorized',
      desc: 'cart'
    })
  }
  
})

router.delete('/:id', authentication, (req, res, next) => {
  if (req.idUser == req.params.id) {
    User.findByIdAndUpdate(req.params.id, {
      $pull: {
        cartLists: {
          productId: req.body.productId
        }
      }
    })
      .then(user => {
        console.log(user)
        res.status(200).json({msg: 'Delete product from cart success'})
      })
      .catch(err => {
        next(err)
      })
  } else {
    next({
      msg: 'Not Authorized',
      desc: 'cart'
    })
  }
  
})

module.exports = router