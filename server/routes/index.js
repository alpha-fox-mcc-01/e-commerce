const router = require('express').Router()
const User = require('./userRoutes')
const Product = require('./ProductRoutes')

router.get('/', (req, res) => res.send('Hello World!'))
router.use('/users', User)
router.use('/products', Product)

module.exports = router