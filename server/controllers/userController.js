const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
                console.log(err)
                next(err)
            })
    }
}