const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const express = require('express')
const router = express.Router()
const files = require('../middlewares/files')

router.use('/users', userRoute)
router.use('/products', productRoute)
module.exports = router