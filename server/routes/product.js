const router = require('express').Router()
const Product = require('../models/Product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const files = require('../middlewares/files')

router.post('/upload',
  files.multer.single('file'),
  files.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

router.post('/', authentication, authorization,(req, res, next)=>{
    const {name, price, stock, description, image} = req.body
    Product.create({
        name,
        price,
        stock,
        description,
        image
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

router.put('/:id', authentication, authorization,(req, res, next)=>{
    const {name, price, stock, description, image, cartLists} = req.body
    Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        stock,
        description,
        image,
        cartLists
    })
      .then(product=>{
          res.status(200).json({msg : `Product with id ${product._id} updated successfully`})
      })
      .catch(err=>{
          next(err)
      })
})

router.patch('/:id', authentication, authorization,(req, res, next)=>{
    const { stock } = req.body
    Product.findByIdAndUpdate(req.params.id, {
        stock
    })
      .then(product=>{
          res.status(200).json({msg : `Product Stock with id ${product._id} updated successfully`})
      })
      .catch(err=>{
          next(err)
      })
})

router.delete('/:id', authentication, authorization,(req, res, next)=>{
    Product.findByIdAndDelete(req.params.id)
      .then(product=>{
          res.status(200).json({msg : `Product with id ${product._id} deleted successfully`})
      })
      .catch(err=>{
          console.log(err)
          next(err)
      })
})

module.exports = router