require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost:27017/e-commerce-${process.env.NODE_ENV}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log('connected to mongodb')
  }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)
app.use(errorHandler)

app.use('*', (req, res) => {
  res.status(404).json('Route not found. Please contact nafies1')
})

app.listen(process.env.PORT, () => {
  console.log('Running on port', process.env.PORT)
})

module.exports = app