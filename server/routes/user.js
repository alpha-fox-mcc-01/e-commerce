const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', authentication, UserController.getCart);
router.post('/add/:id', authentication, UserController.addToCart);
router.delete('/:id', authentication, UserController.deleteCartProduct);

module.exports = router;