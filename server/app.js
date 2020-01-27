require('dotenv').config()
const express = require('express');
const app = express();
const routes = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

mongoose.connect('mongodb://localhost/ecommerce', {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Database Connection is Successful')
});

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)

app.use('/', errorHandler)
module.exports = app;