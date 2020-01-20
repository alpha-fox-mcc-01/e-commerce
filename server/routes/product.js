const router = require('express').Router()
const Product = require('../models/Product')

router.post('/', (req, res, next)=>{
    const {name, price, stock, description, featured_image} = req.body
    Product.create({
        name,
        price,
        stock,
        description,
        featured_image
    })
      .then(product=>{
          res.status(201).json(product)
      })
      .catch(err=>{
          next(err)
      })
})

module.exports = router