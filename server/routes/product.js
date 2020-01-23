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

router.get('/', (req, res, next)=>{
    Product.find()
      .then(products=>{
          res.status(200).json(products)
      })
      .catch(err=>{
          next(err)
      })
})

router.get('/:id', (req, res, next)=>{
    Product.findById(req.params.id)
      .then(products=>{
          res.status(200).json(products)
      })
      .catch(err=>{
          next(err)
      })
})

module.exports = router