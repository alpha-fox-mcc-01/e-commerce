const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

productRouter.post('/', authentication, authorization, productController.addProduct)
productRouter.get('/', productController.getProduct)
productRouter.get('/:id', productController.getById)
productRouter.patch('/:id', authentication, productController.updateProductStock)
productRouter.put('/:id', authentication, authorization, productController.updateProduct)
productRouter.delete('/:id', authentication, authorization, productController.deleteProduct)

module.exports = productRouter