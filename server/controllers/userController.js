const User = require('../models/usermodel')
const Product = require('../models/productmodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports =  {
    register(req, res, next) {
        console.log('masuk controller' )
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
            .then(result => {
                res.status(201).json({message: 'Registration Successful!'})
            })
            .catch(err => {
                next(err)
            })
    },
    login(req, res, next) {
        let username
        User.findOne({email : req.body.email}) 
        .then(user => {
            if (user) {
                username = user.username
                var checkPassword = bcrypt.compareSync(req.body.password, user.password)
                if (checkPassword) {
                    var access_token = jwt.sign({ _id: user._id}, process.env.SECRET)
                    res.status(200).json({access_token : access_token, username: username})
                } else {
                    res.status(400).json({error: 'Username/password wrong'})
                }
            } else {
                res.status(400).json({error: 'Username/password wrong'})
            }
        })
        .catch(err => {
            next(err)
        })
    },
    addCart(req, res, next) {
        let input = {
            product: req.body.product,
            quantity: 1,
        }
        User.findOne({ _id: req.currentUserId})
            .then(user => {
                let existing = false
                if (user.cart.length === 0) {
                    User.updateOne(
                        { _id: req.currentUserId },
                        { $push: { cart: input } }
                    )
                    .then((user) =>{
                       console.log(user);
                       res.status(200).json({message: 'Product successfully added!'})
                    })
                    .catch(err =>{
                        next(err)
                    })
                } else {
                    user.cart.forEach( (item, i, arr) => {
                        if (item.product == req.body.product) {
                            existing = true
                            let newQty = item.quantity += 1
                            User.updateOne({
                              'cart.product': item.product
                            }, {
                                '$set': {
                                    'cart.$.quantity': newQty,
                                }
                            })
                            .then((data) =>{
                                console.log(data);
                                res.status(200).json({message: 'Product successfully added!'})
                             })
                             .catch(err =>{
                                 next(err)
                             })
                            
                        }
                    })
                    if (existing === false) {
                        User.updateOne(
                            { _id: req.currentUserId },
                            { $push: { cart: input } }
                        )
                        .then((user) =>{
                           res.status(200).json({message: 'Product quantity successfully added!'})
                        })
                        .catch(err =>{
                            next(err)
                        })
                    }
                }
            })
            .catch(err =>{
                next(err)
            })

    },
    removeCart(req, res, next) {
        User.updateOne({
            _id: req.currentUserId
        }, { $set: { cart: [] } })
        .then(result => {
            res.status(200).json({message: 'Logout successful!'})
        })
        .catch(err => {
            next(err)
        })
    },
    fetchCart(req, res, next) {
        User.findById({ _id: req.currentUserId }).populate({
            path: 'cart.product',
            model: 'Product'
        })
            .then(user => {
                console.log(user, 'ini user di controller')
                res.status(200).json({user: user})
            })
            .catch(err => {
                next(err)
            })
    }


    

}
