const { Product } = require('../models');

class ProductController {
  static addProduct(req, res, next) {
    const {name, description, image, price, stock} = req.body;
    Product.create({
      name, 
      description,
      image,
      price,
      stock
    })
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static showAll(req, res, next) {
    Product.find()
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static homeProducts(req, res, next) {
    Product.find().limit(12)
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static showProduct(req, res, next) {
    Product.findById({_id: req.params.id})
      .then(product => {
        res.status(200).json(product)
      })
      .catch(next)
  }

  static editProduct(req, res, next) {
    const {name, description, image, price, stock} = req.body;
    Product.findOneAndUpdate({_id: req.params.id}, {
      name, 
      description,
      image,
      price,
      stock
    })
      .then(product => {
        res.status(201).json({
          msg: "Product updated successfully"
        })
      })
      .catch(next)
  }

  static deleteProduct(req, res, next) {
    Product.findOneAndDelete({_id: req.params.id})
      .then(result => {
        // Kalo product sudah di delete result = null
        if(result) {
          res.status(200).json({
            msg: "Product deleted successfully"
          })
        } else {
          next({
            name: "Bad Request",
            message: "Product doesn't exist",
            status: 400
          })
        }
      })
      .catch(next)
  }
}

module.exports = ProductController;