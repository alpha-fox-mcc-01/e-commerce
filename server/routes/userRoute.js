const express = require('express')
const router = express.Router()
const { userController } = require('../controllers')
const authentication = require('../middleware/authentication')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.use(authentication)
router.post('/cart', userController.addCart)









module.exports = router