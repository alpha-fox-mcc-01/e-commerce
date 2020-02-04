const Cart = require('../models/cart')

module.exports = {
  addToCart(req, res, next) {
    const { UserId, ProductId, quantity } = req.body
    Cart.find({ UserId })
      .then(found => {
        let isExist = false
        for (item in found) {
          if (item.ProductId == ProductId) {
            isExist = true
          }
        }
        if (!isExist) {
          Cart.create({
            UserId,
            ProductId,
            quantity
          })
            .then(cart => {
              res
                .status(201)
                .json({
                  _id: cart._id,
                  UserId: cart.UserId,
                  ProductId: cart.ProductId,
                  quantity: cart.quantity
                })
            })
            .catch(err => {
              next(err)
            })
        } else {
          throw new Error('Item already exist')
        }
      })
      .catch(err => {
        next(err)
      })
  },

  getCart(req, res, next) {
    const id = req.params.id
    Cart.find({ UserId: id }).populate('ProductId')
      .then(cart => {
        res
          .status(200)
          .json(cart)
      })
      .catch(err => {
        next(err)
      })
  },

  deleteFromCart(req, res, next) {
    const id = req.params.id
    Cart.deleteOne({ ProductId: id })
      .then(() => {
        res
          .status(200)
          .json({ msg: "This product deleted successfully" })
      })
      .catch(err => {
        next(err)
      })
  },

  editQuantity(req, res, next) {
    const { id } = req.params
    const { quantity } = req.body
    Cart.findOneAndUpdate({ _id: id }, { $set: { quantity } })
      .then(success => {
        console.log(success)
        res
          .status(200)
          .json({ msg: "Quantity updated successfully" })
      })
      .catch(err => {
        next(err)
      })
  }
}