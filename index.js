'user strict'

const mongoose = require('mongoose');
const app = require('./app.js');

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect('mongodb://127.0.0.1:27017/produtos', (err, db) => {
    if (err) {
        throw err;
    }

    console.log('banco conectado');

    app.listen(port, () => {
        console.log(`servidor rodando na porta ${port}`);
    });
})