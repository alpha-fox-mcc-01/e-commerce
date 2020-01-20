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
            console.log(data, `INI BENTUK DATA DI CONTROLLERRRRRRRRRRRRRRRRRRRRRRRRRR`);       
            res.status(201).json(data)
         })
         .catch (err => {
            console.log(err, `INI ERRORRR DI CONTROLLERRRRRRRRRRRRRRRRRRRRRR`);            
            next (err)
         })
   } 
}

module.exports = ItemController