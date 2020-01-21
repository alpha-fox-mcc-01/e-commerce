const { Product } = require('../models')
const { User } = require('../models')
module.exports = (req, res, next) => {
    User.findById(req.currentUserId)
        .then(user => {
            if (user.isAdmin) {
                next()
            } else {
                next({
                    name: "Authorization Error",
                    status: 401,
                    message: "User is not authorized to perform that action"
                })
            }
        })
        .catch(err => {
            // console.log(err.message)
            res.status(500).json({error: 'Internal Server Error!'})
        })
}