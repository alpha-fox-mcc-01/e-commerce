const express = require ('express')
const router = express.Router()
const UserController = require ('../controllers/userController')
const authenticated = require ('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/addCart', authenticated, UserController.addCart)

module.exports = router