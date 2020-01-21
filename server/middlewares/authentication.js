const jwt = require('jsonwebtoken')
const { User } = require('../models')
module.exports = (req, res, next) => {
    let token = req.headers.access_token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            res.status(400).json({message: err.message})
        } else {
            User.findById(decoded._id)
                .then(user => {
                    if (user) {
                        req.currentUserId = decoded._id
                        next()
                    } else {
                        res.status(400).json({message: "Token is no longer valid"})
                    }
                })
                .catch(err => {
                    res.status(500).json({message: "Internal Server Error"})
                })
        }
    })
}