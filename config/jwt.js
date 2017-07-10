'use strict'

// imports
const jwt = require('jwt-simple');
const moment = require('moment');

// configurations
const secret = 'chave_secreta_sistema_produtos';

exports.CreateToken = function(user) {
    var payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        image: user.image,
        now: moment(),
        exp: moment().add(1, 'minute')
    };

    return jwt.encode(payload, secret);
}