const Product = require('../models/productmodel')

module.exports = {
    addProduct(req, res, next) {
        Product.create({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            image: req.file.cloudStoragePublicUrl
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
                    console.log('getproductdetail', result)
                    res.status(200).json({result: result})
                })
                .catch(err => {
                    next(err)
                })
    },
    editProduct(req, res, next) {
        Product.findOneAndUpdate({_id: req.params.id}, {
            stock: req.body.stock,
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
    },
    searchProduct(req, res, next) {
        let keyword = req.params.name
        Product.find({ $or: [ {name: {$regex : `${keyword}`, $options: 'gi'}}, {category: {$regex: `${keyword}`, $options: 'gi'}}]})
                .then(result => {
                    if(result.length === 0) {
                       res.status(200).json({message: 'No such product, try another keyword'})
                    } else {
                       res.status(200).json({result})
                    }
                })
                .catch(err => {
                    next(err)
                })
    }


}