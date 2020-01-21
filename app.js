require('dotenv').config()
require('./config/connect').config()
const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes'))


app.use(errorHandler)
app.listen(3000, () => console.log('listening on port 3000'))

module.exports = app