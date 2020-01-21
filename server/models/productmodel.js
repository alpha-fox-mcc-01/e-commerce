const mongoose = require('mongoose')
const Schema = mongoose.Schema


const productSchema = new Schema({
    name: { 
        type: String, required: 'Product name must be filled!'
    },
    category: String,
    price: {
        type: Number,
        required: 'Please input price!',
        min: 1000
    },
    stock: {
        type: Number,
        required: 'Please input stock!',
        min : 0
    },
    description: {
        type: String,
        maxlength: 100
    },
    image: String

}) 


const Product = mongoose.model('Product', productSchema)


module.exports = Product