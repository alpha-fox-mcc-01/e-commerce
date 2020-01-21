const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')

productRouter.post('/', productController.addProduct)
productRouter.get('/', productController.getProduct)
productRouter.get('/:id', productController.getById)
productRouter.put('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProduct)

module.exports = productRouter