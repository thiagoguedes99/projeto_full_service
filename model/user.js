'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    email: String,
    password: String,
    level: String,
    image: String
});

module.exports = mongoose.model('User', UserSchema);