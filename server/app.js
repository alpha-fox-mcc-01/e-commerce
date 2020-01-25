const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://nafies_beta1:bittaqwa@cluster0-hcptc.mongodb.net/e-commerce-${process.env.NODE_ENV}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log('connected to mongodb')
  }
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.use('*', (req, res) => {
  res.status(404).json('Route not found. Please contact nafies1')
})

module.exports = app