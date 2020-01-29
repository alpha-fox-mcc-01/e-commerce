require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/learn-TTD', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Conected to mongo DB');
  
});

app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())
app.use(routes)
app.use(errorHandler)

app.listen(port, () => console.log(`This app listening on port ${port}!`))

module.exports = app