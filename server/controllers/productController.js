const Product = require('../models/productmodel')

module.exports = {
    addProduct(req, res, next) {
        Product.create({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            image: req.body.image
        })
        .then(result => {
            res.status(201).json({result: result})
        })
        .catch(err => {
            next(err)
        })

    },
    getAllProduct(req, res, next) {
        Product.find()
                .then(result => {
                    res.status(200).json({result})
                })
                .catch(err => {
                    next(err)
                })

    },
    getProductDetail(req, res, next) {
        Product.findOne({_id: req.params.id})
                .then(result => {
                    res.status(200).json({result: result})
                })
                .catch(err => {
                    next(err)
                })
    },
    editProduct(req, res, next) {
        Product.findOneAndUpdate({_id: req.params.id}, {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            image: req.body.image
        }, {runValidators: true})
                .then(_ => {
                    res.status(200).json({message: 'Product successfully updated'})
                })
                .catch(err => {
                    next(err)
                })
    },
    removeProduct(req, res, next) {
        Product.deleteOne({_id: req.params.id})
                .then(_ => {
                    res.status(200).json({message: 'Delete successful'})
                })
                .catch(err => {
                    next(err)
                })
    }


}