const Item = require ('../models/itemModel')

class ItemController {

   static add (req, res, next) {
      // console.log(`masuk sini nih`);
      // console.log(req.body);
      
      let newData = {
         name : req.body.name,
         description : req.body.description,
         price : req.body.price,
         stock : req.body.stock
      }
      Item.create(newData)
         .then (data => {
            // console.log(data);
            
            res.status(201).json(data)
         })
         .catch (err => {
            // console.log(err, `INI ERRORRR DI CONTROLLERRRRRRRRRRRRRRRRRRRRRR`);            
            next (err)
         })
   } 

   static getAll (req, res, next) {
      Item.find()
         .then(data => {            
            res.status(200).json(data)
         })
         .catch (err => {
            next(err)
         })
   }

   static getOne (req, res, next) {
      Item.findOne({_id : req.params.itemId})
         .then((data) => {
            // console.log(data, `ini di controllerrrrrrrrrrrrrrrrrrrrrrrrrrrrrr`);
            res.status(200).json(data)      
         })
         .catch (err => {
            next(err)
         })
   }

   static delete (req, res, next) {
      
      Item.findOneAndDelete({_id : req.params.itemId})
         .then((data) => {
            console.log(data);
            
            res.status(200).json({msg : `deleted`, data})
         })
         .catch (err => {            
            next (err)
         })
   }
}

module.exports = ItemController