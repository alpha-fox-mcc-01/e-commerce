const router = require('express').Router()
const userRoute = require('./user')
const productRoute = require('./product')
const cartRoute = require('./cart')

router.get('/', (req, res) => {
  res.send('Welcome to e-commerce API')
})
router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)

module.exports = router