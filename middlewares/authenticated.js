'use strict'

// imports
const jwt = require('jwt-simple');
const moment = require('moment');

// configurations
const secret = 'chave_secreta_sistema_produtos';

exports.authenticated = function(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'não autorizado' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if (moment().isAfter(payload.exp)) {
            return res.status(401).send({ message: 'token expirado' });
        }
    } catch (error) {
        res.status(404).send({ message: 'token invalido' });
    }

    req.user = payload;

    next();
}