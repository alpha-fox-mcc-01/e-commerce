const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')


router.use('/users', userRoute)
router.use('/products', productRoute)

router.get('*', (req, res) => {
    res.status(404).send('404 Page Not Found')
})





module.exports = router