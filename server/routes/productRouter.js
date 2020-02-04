const router = require('express').Router()
const productControler = require('../controllers/productController')
const autheticatedAdmin = require('../middlewares/authenticatedAdmin')
const images = require('../middlewares/images')

router.get('/', productControler.get)
router.get('/:id', productControler.getOneProduct)

router.use(autheticatedAdmin)

router.post('/add', images.multer.single('image'), 
images.sendUploadToGCS, productControler.add)
router.delete('/delete/:id', productControler.delete)
router.put('/update/:id', images.multer.single('image'), 
images.sendUploadToGCS,  productControler.update)


module.exports = router