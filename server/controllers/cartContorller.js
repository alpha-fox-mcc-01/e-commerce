const Cart = require('../models/cart')

class cartController{

    static add(req, res, next){
        
        let obj={
            product: {
                name: req.body.product,
                jumlah: 1
            },
            user: req.currentUserid,
        }
        console.log(obj);

        Cart.create(obj)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static get (req, res, next){

        Cart.findOne({
            user: req.currentUserid
        }).populate({ path: 'Product', select: 'name' }).
        populate({ path: 'User', select: 'email' })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = cartController