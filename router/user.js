'use strict'

const express = require('express');
const multipart = require('connect-multiparty');

// import controller
const controller = require('../controller/user');


// import middleware of auth
const auth = require('../middlewares/authenticated').authenticated;


// configurations
const api = express.Router();
const path_upload = multipart({ uploadDir: './upload/user' });

// rotas
api.get('/image/:imageName', controller.getImage);
api.post('/', path_upload, controller.save);
api.post('/login', controller.login);
api.put('/', controller.update);
api.delete('/', controller.remove);


module.exports = api;