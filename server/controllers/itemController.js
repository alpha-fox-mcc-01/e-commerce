const Item = require('../models/itemModel')

class ItemController {
   static add(req, res, next) {
      console.log(req.file.cloudStoragePublicUrl, '{}{}{}')
      // console.log(req.body);
      let newData = {
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         stock: req.body.stock,
         image: req.file.cloudStoragePublicUrl,
         // image: req.body.image
      }
      Item.create(newData)
         .then(data => {
            res.status(201).json(data)
         })
         .catch(err => {       
            next(err)
         })
   }

   static getAll(req, res, next) {
      Item.find()
         .then(data => {
            res.status(200).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static getOne(req, res, next) {
      Item.findOne({ _id: req.params.itemId })
         .then((data) => {
            res.status(200).json(data)
         })
         .catch(err => {
            next(err)
         })
   }

   static delete(req, res, next) {

      Item.findOneAndDelete({ _id: req.params.itemId })
         .then((data) => {
            // console.log(data)
            res.status(200).json({ msg: `deleted`, data })
         })
         .catch(err => {
            next(err)
         })
   }

   static update(req, res, next) {      
      let newData = {
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         stock: req.body.stock
      }

      Item.findOneAndUpdate({ _id: req.params.itemId }, newData)
         .then(data => {
            res.status(201).json({msg : `updated`})
         })
         .catch(err => {
            next(err)
         })
   }
}

module.exports = ItemController