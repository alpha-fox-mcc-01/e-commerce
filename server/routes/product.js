const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.get('/', ProductController.showAll);
router.get('/starter', ProductController.homeProducts);
router.get('/:id', ProductController.showProduct);

router.use('/', authentication);

router.post('/', authorization, ProductController.addProduct);
router.put('/:id', ProductController.editProduct);
router.delete('/:id', authorization, ProductController.deleteProduct);

module.exports = router;