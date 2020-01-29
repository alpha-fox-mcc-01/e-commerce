const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/all', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.post('/', productController.createProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router