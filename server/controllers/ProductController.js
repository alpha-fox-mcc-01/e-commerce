const Product = require('../models/ProductModel')

class ProductController {

  static createProduct (req, res, next){
    let data = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stocks: req.body.stocks,
      imageUrl: req.body.imageUrl
    }
    Product
      .create(data)
      .then( product => {
        res.status(201).json (product)
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllProduct(req, res, next){
    Product
      .find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        next(err)
      })
  }

  static getProductById(req, res, next){
    Product
      .findOne({
        _id: req.params.id
      })
      .then( product => {
        res.status(200).json(product)
      })
      .catch(err => {
        next(err)
      })
  }

  static deleteProduct(req, res, next){
    Product
      .findOneAndRemove({
        _id : req.params.id
      })
      .then( () => {
        res.status(200).json({
          msg: 'deleted'
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController