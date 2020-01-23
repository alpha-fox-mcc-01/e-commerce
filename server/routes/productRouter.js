const router = require('express').Router()
const productControler = require('../controllers/productController')
const autheticatedAdmin = require('../middlewares/authenticatedAdmin')
const images = require('../middlewares/images')

router.use(autheticatedAdmin)

router.post('/add', images.multer.single('image'), 
images.sendUploadToGCS, productControler.add)
router.get('/', productControler.get)
router.delete('/delete/:id', productControler.delete)
router.put('/update/:id', productControler.update)


module.exports = router