require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes')
const errorHandler = require('./middleware/error_handler')
const cors = require('cors')
const logger = require('morgan')
const ATLAS_CONNECT = 'mongodb+srv://vaniairnanda:vaniairnanda@cluster0-snvnr.gcp.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect('mongodb://localhost/ecommerce' + `${process.env.NODE_ENV}`, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected')
});

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', router)
app.use('/', errorHandler)


app.listen(process.env.PORT, () => {
  console.log('app running on port:', process.env.PORT)
})

module.exports = app