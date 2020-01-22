const express = require ('express')
const router = express.Router()
const ItemController = require ('../controllers/itemController')
const authentication = require('../middlewares/authentication')

router.post('/', authentication, ItemController.add)
router.get('/', ItemController.getAll)

module.exports = router