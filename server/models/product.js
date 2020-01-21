/* 
name
desc
price
img


*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        match: [/^[a-z\d\-_\s]+$/i, "Product Name Invalid"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [1000, "Price should be at least 1000"],
        required: true
    },
    featured_image: String,
    stocks: {
        type: Number,
        min: [1, "Stock must be available on create"],
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product