const Product = require('../models/product')

module.exports = {
  addProduct(req, res, next) {
    const { name, description, category, price, stock, imageUrl } = req.body
    Product.create({
      name,
      description,
      category,
      price,
      stock,
      imageUrl
    })
      .then(product => {
        res
          .status(201)
          .json({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl
          })
      })
      .catch(err => {
        next(err)
      })
  },

  getProduct(req, res, next) {
    Product.find({})
      .then(product => {
        res
          .status(200)
          .json(product)
      })
      .catch(err => {
        next(err)
      })
  },

  getById(req, res, next) {
    const id = req.params.id
    Product.findOne({ _id: id })
      .then(product => {
        res
          .status(200)
          .json(product)
      })
      .catch(err => {
        next(err)
      })
  },

  updateProduct(req, res, next) {
    const id = req.params.id
    const { name, description, category, price, stock, imageUrl } = req.body
    Product.updateOne({ _id: id }, { $set: { name, description, category, price, stock, imageUrl } })
      .then(() => {
        res
          .status(200)
          .json({ msg: "This product updated successfully" })
      })
      .catch(err => {
        next(err)
      })
  },

  updateProductStock(req, res, next) {
    const id = req.params.id
    const { stock } = req.body
    Product.updateOne({ _id: id }, { $set: { stock } })
      .then(() => {
        res
          .status(200)
          .json({ msg: "This product updated successfully" })
      })
      .catch(err => {
        next(err)
      })
  },

  deleteProduct(req, res, next) {
    const id = req.params.id
    Product.deleteOne({ _id: id })
      .then(() => {
        res
          .status(200)
          .json({ msg: "This product deleted successfully" })
      })
      .catch(err => {
        next(err)
      })
  }
}