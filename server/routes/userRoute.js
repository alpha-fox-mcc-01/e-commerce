const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

router.post('/signup', userController.signUp)

router.post('/signin', userController.signIn)

router.get('/cart', authentication, userController.getCart)

router.post('/cart', authentication, userController.addToCart)

router.delete('/cart', authentication, userController.removeFromCart)

router.delete('/checkout', authentication, userController.checkout)
module.exports = router