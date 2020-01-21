var jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

module.exports = function(req, res, next) {
    console.log('masuk authentication')
    const token = req.headers.access_token
    console.log(token)
    try {
        let decoded = jwt.verify(token, process.env.SECRET)
        console.log(decoded._id, 'id')
        User.findOne({
            _id: decoded._id
        })
            .then(result => {
                console.log(result, 'ini result')
                if (result) {
                    req.currentUserId = result._id
                    console.log(req.currentUserId)
                    next()
                } else {
                    res.status(500).json({
                        message: 'Token does not match'
                    })
                }
                
            }) 
            .catch(err => {
                next(err)
            })
        
    } catch(err) {
        next(err)
    }
}