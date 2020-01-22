const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')
const authenticated = require('../middlewares/authentication')
const authorized = require('../middlewares/authorization')

productRouter.post('/', authenticated, authorized, productController.addProduct)
productRouter.get('/', productController.getProduct)
productRouter.get('/:id', productController.getById)
productRouter.put('/:id', authenticated, authorized, productController.updateProduct)
productRouter.delete('/:id', authenticated, authorized, productController.deleteProduct)

module.exports = productRouter