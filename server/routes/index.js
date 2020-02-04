const router = require('express').Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const cartRouter = require('../routes/cartRouter')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
// router.get('/org', (req, res) => res.send('Hello World!'))

module.exports = router