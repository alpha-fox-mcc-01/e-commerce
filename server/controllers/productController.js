const { Product } = require('../models')
module.exports = {
    getProducts(req, res, next) {
        Product.find({ $where: "this.stocks > 0"})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    },
    newProduct(req, res, next) {
        Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            featured_image: req.body.featured_image || 'http://cdn.onlinewebfonts.com/svg/img_519534.png',
            stocks: req.body.stocks
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    },
    editProduct(req, res, next) {
        Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            featured_image: req.body.featured_image || 'http://cdn.onlinewebfonts.com/svg/img_519534.png',
            stocks: req.body.stocks
        }, {runValidators: true})
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    },
    removeProduct(req, res, next) {
        Product.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}