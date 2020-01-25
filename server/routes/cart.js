const router = require('express').Router()
const User = require('../models/User')

router.post('/:id', (req, res, next) => {
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
      res.send('Add product to cart success')
    })
    .catch(err => {
      next(err)
    })
})


module.exports = router