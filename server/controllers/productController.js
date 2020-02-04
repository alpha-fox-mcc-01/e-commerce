const Product = require('../models/product')
const fs = require('fs')
const aws = require('aws-sdk')

module.exports = {
  addProduct(req, res, next) {
    const { name, description, category, price, stock } = req.body
    aws.config.setPromisesDependency();
    aws.config.update({
      accessKeyId: process.env.ACCESSKEY,
      secretAccessKey: process.env.SECRETACCESSKEY,
      region: process.env.REGION
    })

    const s3 = new aws.S3();
    const params = {
      ACL: 'public-read',
      Bucket: process.env.BUCKET,
      Body: fs.createReadStream(req.file.path),
      Key: `H8ECommerce/${req.file.originalname}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log('Error occured while trying to upload to S3 bucket', err);
      } else if (data) {
        fs.unlinkSync(req.file.path)
        const locationUrl = data.Location;
        const imageUrl = locationUrl || 'https://radscanmedical.com/wp-content/uploads/2018/11/coming-soon.png'
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
      }
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