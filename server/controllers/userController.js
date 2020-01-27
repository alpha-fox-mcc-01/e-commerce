const { User } = require('../models')
const { Product } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ObjectID = require('mongoose').Types.ObjectId
module.exports = {
    signUp(req, res, next) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            isAdmin: false,
            password: req.body.password,
            cart: []
        })
            .then(data => {
                res.status(201).json({
                    _id: data._id,
                    username: data.username,
                    email: data.email,
                    isAdmin: data.isAdmin,
                    cart: data.cart
                })
            })
            .catch(err => {
                next(err)
            })
    },
    signIn(req, res, next) {
        User.findOne({email: req.body.email})
            .then(data => {
                if (data) {
                    if(bcrypt.compareSync(req.body.password, data.password)) {
                        let access_token = jwt.sign({_id: data._id}, process.env.JWT_SECRET)
                        res.status(200).json({ access_token })
                    } else {
                        next({
                            name: "Login Error",
                            message: 'Email/Password is wrong',
                        })
                    } 
                } else {
                    next({
                        name: "Login Error",
                        message:'Email/Password is wrong',
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    },
    getCart(req, res, next) {
        User.findById(req.currentUserId).populate({ path: 'cart.product', model: 'Product' })
            .then(user => {
                res.status(200).json(user.cart)
            })
            .catch(err => {
                next(err)
            })
    },
    addToCart(req, res, next) {
        User.findById(req.currentUserId)
            .then(user => {
                let isPresent = false
                let existingProduct = null;
                if (user.cart.length > 1) {
                    user.cart.forEach(product => {
                        if (product.product.toString() == req.body.productId) {
                            existingProduct = product.product
                            isPresent = true;
                        }
                    })  
                }
                if (!isPresent) {
                    return User.findByIdAndUpdate(req.currentUserId, {
                        $push: {cart: {product: req.body.productId, quantity: req.body.quantity}}
                    })
                } else {
                    return User.updateOne({_id: ObjectID(req.currentUserId), 'cart.product': existingProduct}, {
                        $inc: {'cart.$.quantity' : req.body.quantity}
                    })
                }
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    },
    removeFromCart(req, res, next) {
        User.findByIdAndUpdate(req.currentUserId, { "$pull": { "cart": { "product": req.body.productId } }}, { safe: true, multi:true })
            .then(data => {
                res.status(200).json({success: 'Item(s) Deleted'})
            })
            .catch(err => {
            })
    },
    checkout(req, res, next) {
        User.findById(req.currentUserId) 
            .then(data => {
                data.cart.forEach(product => {
                    Product.findByIdAndUpdate(product.product, {
                        $inc: {'stocks': -req.body.quantity}
                    })
                        .then(() => {
                            console.log('Ongoing')
                            // res.status(200).json({status: 'Success'})
                        })
                        .catch(err => {
                            next(err)
                        })
                })  
                return User.findByIdAndUpdate(req.currentUserId, {
                    $set: {cart: []}
                })
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}