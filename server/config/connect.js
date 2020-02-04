const mongoose = require('mongoose')

const connect = () => {
  mongoose.connect('mongodb+srv://ninoloid:ahmadmsa@cluster0-4kxtr.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) console.log(err)
    else console.log('connected to database')
  })
}

module.exports = { config: connect }