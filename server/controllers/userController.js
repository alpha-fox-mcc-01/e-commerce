const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Item = require('../models/itemModel')

class UserController {
   static register(req, res, next) {

      let newData = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         admin: req.body.admin
      }

      User.create(newData)
         .then(data => {
            res.status(201).json({
               name: data.name,
               email: data.email,
               _id: data._id,
               admin: data.admin,
               cart: data.cart
            })
         })
         .catch(err => {
            // console.log(err, `ini error di UserController LHOOOOoooooooooooooooooo`);
            next(err)
         })
   }

   static login(req, res, next) {
      User.findOne({ email: req.body.email })
         .then(data => {
            if (data) {
               let verified = bcrypt.compareSync(req.body.password, data.password)
               if (verified) {
                  const userId = data._id
                  const token = jwt.sign({ id: userId }, process.env.SECRET)

                  res.status(200).json({
                     token,
                     name: data.name,
                     userId: data._id,
                     email: data.email,
                     // admin : data.admin
                  })
               }
               else {
                  res.status(404).json({ msg: `email / password wrong` })
               }
            }
            else {
               res.status(404).json({ msg: `email / password wrong` })
            }
         })
         .catch(err => {
            next(err)
         })
   }

   static addCart(req, res, next) {

      let newItem = {
         item: req.body.itemId,
         quantity: req.body.quantity
      }

      User.findOne({ _id: req.currentUserId })
         .then(user => {
            // console.log(user);

            let itemSearch = user.cart.filter(data => {
               // console.log(data, `ini data`)
               return data.item == req.body.itemId
            })
            console.log(itemSearch, `ini itemSearchhhhhhhhhhhhhh`);

            if (itemSearch.length < 1) {
               User.updateOne({ _id: req.currentUserId }, { $push: { cart: newItem } })
                  .then((data) => {
                     // console.log(data)
                     res.status(201).json(data)
                  })
                  .catch(err => {
                     console.log(err.message);
                     next(err)
                  })
            }
            else {         
               console.log(`masuk else`);
               let newQuantity = req.body.quantity   
               User.updateOne({ 'cart.item': itemSearch[0].item },
               {
                   '$set': {
                       'cart.$.quantity': newQuantity,
                   }
               })
                  .then(data => {
                     console.log(`masuk then`);
                     
                     console.log(data, `ini hasil update item di cartttttt`);
                     res.status(201).json(data)
                  })
                  .catch(err => {
                     console.log(`masuk err`);
                     
                     next(err)
                  })
            }
         })
         .catch(err => {
            console.log(err.message, `ini err nya addCartttttttttttttttttttt`);
            next(err)
         })
   }

}

module.exports = UserController