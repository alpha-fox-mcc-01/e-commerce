const express = require ('express')
const router = express.Router()
const ItemController = require ('../controllers/itemController')
const authentication = require('../middlewares/authentication')
const authorization = require ('../middlewares/authorization')

router.post('/', authentication, authorization, ItemController.add)
router.get('/', ItemController.getAll)
router.get('/:itemId', ItemController.getOne)
router.delete('/:itemId', authentication, authorization, ItemController.delete)

module.exports = router