const { productController } = require('../controllers')
const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const files = require('../middlewares/files')

router.post('/', authentication, authorization, files.multer.single('featured_image'), files.sendUploadToGCS, productController.newProduct)

router.put('/:id', authentication, authorization, files.multer.single('featured_image'), files.sendUploadToGCS, productController.editProduct)

router.get('/', productController.getProducts)

router.get('/:id', productController.getOneProduct)

router.delete('/:id', authentication, authorization, productController.removeProduct)
module.exports = router