require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT 
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('morgan')
app.use(logger('dev'))

app.use(express.json()) //IMPORTANT INVOKE
app.use(express.urlencoded({extended: false}))

var cors = require('cors')
app.use(cors())

const db = require('./config/db')
db.mongoosedb()

app.use('/', router)
app.use('/', errorHandler)


app.listen(port, () => console.log(`listening on port ${port}!`))


module.exports = app