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

    }


    

}
