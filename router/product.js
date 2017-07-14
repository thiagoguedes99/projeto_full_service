'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

// import controller
const controller = require('../controller/product');


// import middleware of auth
const auth = require('../middlewares/authenticated').authenticated;


// configurations
const api = express.Router();
const path_upload = multipart({ uploadDir: './upload/product' });

// rotas
api.get('/:page?/:qtd?', auth, controller.findAll); //  auth, 
api.get('/:id', auth, controller.findId);
api.get('/image/:imageName', auth, controller.getImage);
api.post('/', path_upload, auth, controller.save);
api.put('/', auth, controller.update);
api.delete('/', auth, controller.remove);


module.exports = api;