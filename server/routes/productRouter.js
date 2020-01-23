const router = require('express').Router()
const productControler = require('../controllers/productController')
const autheticatedAdmin = require('../middlewares/authenticatedAdmin')

router.use(autheticatedAdmin)

router.post('/add', productControler.add)
router.get('/', productControler.get)
router.delete('/delete/:id', productControler.delete)
router.put('/update/:id', productControler.update)


module.exports = router