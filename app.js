'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const accessControl = require('./config/Access-Control');

const app = express();

// config. body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// config. Access-Control
app.use(accessControl.access);


// caregar arquivos as rotas
const user = require('./router/user');
const product = require('./router/product');


// rotas
app.use('/api/user', user);
app.use('/api/product', product);


module.exports = app;