var jwt = require('jsonwebtoken')
const User = require('../models/usermodel')

module.exports = function(req, res, next) {
    const token = req.headers.access_token
    try {
        let decoded = jwt.verify(token, process.env.SECRET)
        console.log(decoded._id, 'id')
        User.findOne({
            _id: decoded._id
        })
            .then(result => {
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
                console.log('masuk error authent')
                next(err)
            })
        
    } catch(err) {
        next(err)
    }
}