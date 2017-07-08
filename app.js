'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// caregar arquivos as rotas
const user = require('./router/user');
const product = require('./router/product');


// config. body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// rotas
app.use('/api/user', user);
app.use('/api/product', product);


module.exports = app;