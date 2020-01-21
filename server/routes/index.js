const express = require('express')
const router = express.Router()

router.use('/', require('./userRouter'))
router.use('/api/product', require('./productRouter'))

module.exports = router