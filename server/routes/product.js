const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', ProductController.showAll);

router.use('/', authentication);

router.post('/', authorization, ProductController.addProduct);
router.put('/:id', ProductController.editProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;