const User = require('../models/usermodel')
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
        User.findOne({email : req.body.email}) 
        .then(user => {
            if (user) {
                var checkPassword = bcrypt.compareSync(req.body.password, user.password)
                if (checkPassword) {
                    var access_token = jwt.sign({ _id: user._id}, process.env.SECRET)
                    res.status(200).json({access_token : access_token})
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
        console.log(req.body.product, 'ini yg di input')
        User.findOne({ _id: req.currentUserId})
            .then(user => {
                console.log(user, 'ini user')
                let existing = false
                if (user.cart.length === 0) {
                    console.log('masuk yang length 0')
                    User.updateOne(
                        { _id: req.currentUserId },
                        { $push: { cart: input } }
                    )
                    .then((user) =>{
                       console.log(user);
                       res.status(200).json(user)
                    })
                    .catch(err =>{
                        next(err)
                    })
                } else {
                    user.cart.forEach( (item, i, arr) => {
                        console.log(item.product, 'ini yg di loop')
                        console.log(req.body.product, 'ini yg dikirim')
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
                                res.status(200).json(data)
                             })
                             .catch(err =>{
                                 next(err)
                             })
                            
                        }
                    })
                    if (existing === false) {
                        console.log('masuk bkn existing')
                        User.updateOne(
                            { _id: req.currentUserId },
                            { $push: { cart: input } }
                        )
                        .then((user) =>{
                           console.log(user);
                           res.status(200).json(user)
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

    }


    

}
