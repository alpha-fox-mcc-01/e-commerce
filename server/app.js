require('dotenv').config()
require('./config/connect').config()
const cors = require('cors')
const express = require('express')
const app = express()
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', require('./routes'))


app.use(errorHandler)
app.listen(port, () => console.log('listening on port', port))

module.exports = app