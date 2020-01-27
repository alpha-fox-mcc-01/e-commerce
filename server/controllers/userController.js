const User = require('../models/user')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
const Product = require('../models/product')
var nodemailer = require('nodemailer');

class userController {

    static register(req, res, next){
        console.log(req.body);
        

        let obj={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        User.create(obj)
        .then((user) =>{
            const token = jwt.sign({ _id: user._id }, process.env.SECRET)
            const name = user.name  
            res.status(200).json({ token, name })
        })
        .catch(err =>{
            next(err)
        })
    }

    static login(req, res, next){
           // console.log(req.body);
           let email = req.body.email
           let pass = req.body.password
           
        User.findOne({
            email
        })
        .then((user) =>{
            console.log(user);
            
            if(user){
                let verify = bcrypt.compareSync(req.body.password, user.password);
                 if (verify){
                     console.log('verified');  
                     const token = jwt.sign({ _id: user._id }, process.env.SECRET)
                     const name = user.name  
 
                     res.status(200).json({token, name})
                     return{ user }
                 }else{
                     next({name: 'email/password wrong', msg:'email/password wrong', status: 404})
                 }
             }else{
                 next({name: 'email/password wrong', msg:'email/password wrong', status: 404})
             }
        })
        .catch(err =>{
            next(err)
        })
    }
    static add (req, res, next){
        
        // console.log(req.body.product, 'ini product id nya');
        

        let obj={
            product: req.body.product,
            jumlah: 1   
        }
        let tambah={
            jumlah: +1
        }
        // console.log(req.currentUserid, '======');

        User.findOne({
            _id:req.currentUserid
        })
        .then(user =>{
            // console.log(user);
            
            const result = user.cart.filter(item => item.product == req.body.product);
            
            // console.log(result, 'ini result');
            if(result.length > 0){
                // console.log(result[0].jumlah, "[][][][][]");
                let plus = result[0].jumlah +=1
                // console.log(plus, 'ini plus');
                
                User.updateOne({ 'cart.product': result[0].product },
                {
                    '$set': {
                        'cart.$.jumlah': plus,
                    }
                })
                .then((data) =>{
                //    console.log(data);
                   Product.updateOne({_id: req.body.product}, 
                    {"$inc": { stock: -1 }})
                    .then(data =>{
                        console.log(data,'berhasil ngurangin stock ============');
                        
                    })
                    
                    res.status(200).json(data)

                   
                })
                .catch(err =>{
                    next(err)
                })

            }else if(result.length == 0){
                console.log('masuk ke else product blm ada');
                
                User.updateOne(
                    { _id: req.currentUserid },
                    { $push: { cart: obj } }
                )
                .then((user) =>{
                //    console.log(user);
                   res.status(200).json(user)
                    
                   Product.updateOne({_id: req.body.product}, 
                    {"$inc": { stock: -1 }})
                    .then(data =>{
                        console.log(data,'berhasil ngurangin stock ============');
                        
                    })
                   
                })
                .catch(err =>{
                    next(err)
                })
            }
            
            
        })
        .catch(err =>{
            next(err)
        })

       
    }

    static delete (req, res, next){
        let pr = req.params.id
        console.log(req.currentUserid, '{}{}{}{}');
        console.log(req.params.id);
        
        
        User.findByIdAndUpdate(
            req.currentUserid,
            { $pull: { 'cart': { product: pr }
             } })
            .then(data => {
                res.status(200).json({ data })
                // console.log(data,'dapet data');
                
            })
            .catch(err => {
                next(err)

            })
    }

    static getCart (req, res, next){

        User.findById({
            _id:req.currentUserid   
        })
        .populate('cart.product')
        .then(data => {
            console.log(data);
            
            res.status(200).json({ data })

        })
        .catch(err => {
            next(err)

        })
    }

    static checkout (req, res, next){
        console.log('sampe ke controller checkout', req.currentUserid);
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'hyura.log@gmail.com',
                   pass: 'benyamin10'
               }
           });

           
        //    User.findById({
        //        _id:req.currentUserid   
        //     })
        //     .then(user => {
        //         console.log(user);
                
                // const mailOptions = {
                // from: 'sender@email.com', // sender address
                // to: 'to@email.com', // list of receivers
                // subject: 'Subject of your email', // Subject line
                // html: '<p>Your html here</p>'// plain text body
                // };

                // transporter.sendMail(mailOptions, function (err, info) {
                //     if(err)
                //       console.log(err)
                //     else
                //       console.log(info);
                //       res.status(200).json(info)
                //  });


        // })
        // .catch(err => {
        //     next(err)

        // })


        
    }
}

module.exports = userController