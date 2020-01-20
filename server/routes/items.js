const express = require ('express')
const router = express.Router()
const ItemController = require ('../controllers/itemController')

router.post('/', ItemController.add)

module.exports = router