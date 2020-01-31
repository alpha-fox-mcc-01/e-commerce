const express = require('express')
const router = express.Router()
const ItemController = require('../controllers/itemController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require('../middlewares/images')

router.post('/', authentication, authorization, images.multer.single('image'), images.sendUploadToGCS, ItemController.add)
// router.post ('/', authentication, authorization, ItemController.add)
router.get('/', ItemController.getAll)
router.get('/:itemId', ItemController.getOne)
router.delete('/:itemId', authentication, authorization, ItemController.delete)
router.put('/:itemId', authentication, authorization, ItemController.update)

module.exports = router