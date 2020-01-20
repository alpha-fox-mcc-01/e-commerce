const express = require ('express')
const router = express.Router()
const ItemController = require ('../controllers/itemController')

router.post('/', ItemController.add)
router.get('/', ItemController.getAll)

module.exports = router