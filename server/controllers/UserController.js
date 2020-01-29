const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res, next) {
    let {name, email, password, admin} = req.body;
    User.create({
      name,
      email,
      password,
      admin
    })
      .then(user => {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email
        })
      })
      .catch(next)
  }

  static login(req, res, next) {
    const {email, password} = req.body;
    if(!req.body.email || !req.body.password) {
      next({
        name: 'Bad Request',
        message: 'Email address and password is required',
        status: 400
      })
    }
    User.findOne({
      email
    })
      .then(user => {
        if(user) {
          const verified = bcrypt.compareSync(password, user.password);
          if(verified) {
            const access_token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.status(200).json({access_token, name: user.name});
          } else {
            next({
              name: 'Bad Request',
              message: 'Email or password is wrong',
              status: 400
            })
          }
        } else {
          next({
            name: 'Bad Request',
            message: 'Email or password is wrong',
            status: 400
          })
        }
      })
      .catch(next)
  }

  static getCart(req, res, next) {
    User.findById({ _id: req.currentUserId })
    .populate('cart.product')
      .then(userWithCart => {
        res.status(200).json(userWithCart);
      })
      .catch(next)
  }

  static addToCart(req, res, next) {
    const productToAdd = {
      product: req.params.id,
      quantity: Number(req.body.quantity)
    };
    User.findById({ _id: req.currentUserId })
      .then(user => {
        const productInCart = user.cart.filter(item => item.product == productToAdd.product);
        if(productInCart.length > 0) {
          const updatedQuantity = Number(productInCart[0].quantity += productToAdd.quantity);
          console.log(updatedQuantity)
          console.log(productInCart[0].quantity)
          console.log(productToAdd.quantity)
          User.updateOne({
            'cart.product': productInCart[0].product
          }, {
            '$set': {
              'cart.$.quantity': updatedQuantity 
            }
          })
            .then(data => {
              res.status(201).json(data);
            })
            .catch(next)
        } else if(productInCart.length === 0) {
          User.updateOne({
            _id: req.currentUserId
          }, {
            $push: {
              cart: productToAdd
            }
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(next)
        }
      })
      .catch(next)
  }

  static deleteCartProduct(req, res, next) {
    const productId = req.params.id;
    User.findByIdAndUpdate({_id: req.currentUserId}, {
      $pull: {
        'cart': {
          product: productId
        }
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next)
  }
}

module.exports = UserController;