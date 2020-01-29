require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.PORT;
const cors = require('cors');

const db = require('./config/db');
db();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/', router);
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Status 404, route not found'
  })
});
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;