const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const multer = require('multer')

// productRouter.post('/', authentication, authorization, productController.addProduct)
productRouter.get('/', productController.getProduct)
productRouter.get('/:id', productController.getById)
productRouter.patch('/:id', authentication, productController.updateProductStock)
productRouter.put('/:id', authentication, authorization, productController.updateProduct)
productRouter.delete('/:id', authentication, authorization, productController.deleteProduct)
productRouter
  .route('/')
  .post(multer({ dest: 'temp/', limits: { fieldSize: 3 * 1024 * 1024 } }).single('imageUrl'), authentication, authorization, productController.addProduct)

module.exports = productRouter