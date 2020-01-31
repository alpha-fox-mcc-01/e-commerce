const express = require ('express')
const router = express.Router()
const UserController = require ('../controllers/userController')
const authenticated = require ('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/addcart', authenticated, UserController.addCart)
router.delete('/delete/:cartId', authenticated, UserController.deleteCart)
router.get('/getcart', authenticated, UserController.getCart)

module.exports = router