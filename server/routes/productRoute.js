const express = require('express')
const router = express.Router()
const { productController } = require('../controllers')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const uploadImage = require('../middleware/image_uploader.js')

console.log('masuk route')
router.get('/', 
productController.getAllProduct)
router.get('/search/:name', productController.searchProduct)
router.get('/:id', productController.getProductDetail)
router.put('/:id', authentication, productController.editProduct)
router.use(authentication, authorization)
router.post('/', uploadImage.multer.single('image'), uploadImage.sendUploadToGCS,productController.addProduct)
router.delete('/:id', productController.removeProduct)





module.exports = router