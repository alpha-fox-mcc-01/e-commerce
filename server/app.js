const express = require('express')
const app = express()
const port = 3000
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')

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

app.get('/', (req, res) => res.send('Hello World!'))
app.use(productRoutes)
app.use(userRoutes)
app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app