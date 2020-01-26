const router = require('express').Router()
const userController = require('../controllers/userController')
const authenticatedUser = require('../middlewares/authenticatedUser')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add', authenticatedUser, userController.add)
router.delete('/delete/:id', authenticatedUser, userController.delete)
router.get('/cart', authenticatedUser, userController.getCart)


module.exports = router

//verifikasi stock di add langsung
//node mailer kalo sempet