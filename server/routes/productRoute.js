const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

console.log('masuk route')
router.get('/', 
productController.getAllProduct)
router.get('/:id', productController.getProductDetail)
router.use(authentication, authorization)
router.post('/', productController.addProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.removeProduct)





module.exports = router