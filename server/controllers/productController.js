const Product = require('../models/product')

class productController{
    
    static get(req, res, next){
        // console.log('masuk db');
        // res.send('masuk nih')
        Product.find()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }


    static add(req, res, next){
        console.log(req.body, 'masuk add');
        console.log(req.file.cloudStoragePublicUrl, '{}{}{}')

            
        // res.status(200).json({ 
        //     status: 200,
        //     message: 'Your file is successfully uploaded',
        //     link: req.file.cloudStoragePublicUrl,
        //     })
        
        Product.create({
            name: req.body.name,
            stock: req.body.stock,
            desc: req.body.desc,
            price: req.body.price,
            img: req.file.cloudStoragePublicUrl
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
            console.log(err);
            
        })

    }

    static getOneProduct (req, res, next){
        Product.findById(req.params.id)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
            console.log(err);
            
        })
    }

    static delete(req, res, next){

        console.log(req.params.id, 'masuk delete');
        

        Product.deleteOne({
            _id:req.params.id
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })

    }

    static update (req, res, next){

        console.log(req.params.id, 'masuk update');
        
        let obj ={
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            stock: req.body.stock,
            img: req.body.img
        }

        Product.updateOne({
            _id:req.params.id
        }, obj)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

}

module.exports = productController