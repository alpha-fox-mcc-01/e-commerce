const mongoose = require('mongoose')

const connect = () => {
  mongoose.connect('mongodb://localhost:27017/ECommerce' + `-${process.env.NODE_ENV}`, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log(err)
    else console.log('connected to database')
  })
}

module.exports = { config: connect }