const router = require('express').Router()
const userController = require('../controllers/userController')
const authenticatedUser = require('../middlewares/authenticatedUser')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/add', authenticatedUser, userController.add)

module.exports = router