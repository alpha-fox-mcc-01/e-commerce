const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getAllProduct)
router.get('/:id', ProductController.getProductById)
router.post('/', ProductController.createProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router