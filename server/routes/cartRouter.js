const express = require('express')
const cartRouter = express.Router()
const cartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

cartRouter.post('/', authentication, cartController.addToCart)
cartRouter.get('/:id', authentication, cartController.getCart)
cartRouter.delete('/:id', authentication, cartController.deleteFromCart)

module.exports = cartRouter