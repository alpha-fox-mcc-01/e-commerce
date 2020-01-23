const router = require('express').Router()
const cartControler = require('../controllers/cartContorller')
const autheticatedUser = require('../middlewares/authenticatedUser')

router.use(autheticatedUser)

router.post('/add', cartControler.add)
router.get('/', cartControler.get)
// router.delete('/delete/:id', productControler.delete)
// router.put('/update/:id', productControler.update)


module.exports = router