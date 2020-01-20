require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const db = require('./config/db');
db();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Status 404, route not found'
  })
});
app.use(errorHandler);

module.exports = app;