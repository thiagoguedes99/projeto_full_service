'user strict'

// imports nodejs
const fs = require('fs');
const path = require('path');

// imports npm
const bcrypt = require('bcrypt-nodejs');
var pagination = require('mongoose-pagination');


// my imports
const productModel = require('../model/product');

// export of functions
module.exports = {
    findAll,
    findId,
    save,
    update,
    remove,
    getImage
}

function findAll(req, res) {
    let page = Number(req.params.page) || 0;
    let qtdPages = Number(req.params.qtd) || 5;
    console.log(page);
    console.log(qtdPages);
    productModel.find().sort('name').paginate(page, qtdPages, (err, products, totalProduts) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: 'server error, find all products' });
        } else {
            if (products) {
                res.status(200).send({
                    total: totalProduts,
                    products: products
                });
            } else {
                res.status(404).send({ message: 'products not found' });
            }
        }
    })

}

function findId(req, res) {
    //res.status(200).send('ok id');

    productModel.findById(req.params.id, (err, product) => {
        if (err) {
            res.status(500).send({ message: 'server error, find products' });
        } else {
            if (artist) {
                res.status(200).send({ product });
            } else {
                res.status(404).send({ message: 'products not found' });
            }
        }
    });

}

function save(req, res) {
    let param = req.body;
    console.log(param);
    if (param.name == null || param.price == null) {
        console.log(req);
        console.log(param.name);
        console.log(param.price);
        return res.status(400).send({ message: 'dados incorretos ..' });
    }

    let product = new productModel();

    product.name = param.name;
    product.description = param.description || null;
    product.price = param.price;

    // save image
    //let filePath = req.files.image.path.split('\\');
    //let fileSplit = filePath.split('\\');
    //let fileName = filePath[2];
    //product.image = fileName;

    product.save((err, resp) => {
        if (err) {
            res.status(500).send({ message: 'server error, save product' });
        } else {
            res.status(200).send({ message: 'saved product' });
        }
    });
}

function update(req, res) {
    productModel.findByIdAndUpdate(req.body.id, req.body, (err, productUpdate) => {
        if (err) {
            return res.status(500).send({ message: 'server erro update product' });
        } else {
            if (!productUpdate) {
                res.status(404).send({ message: 'product not found' });
            } else {
                res.status(200).send(productUpdate);
            }
        }
    });
}

function remove(req, res) {
    productModel.findByIdAndRemove(req.body.id, (err, productRemove) => {
        if (err) {
            return res.status(500).send({ message: 'server erro update product' });
        } else {
            if (!productRemove) {
                res.status(404).send({ message: 'product not found' });
            } else {
                res.status(200).send({ message: 'product removed' });
            }
        }
    });
}

function getImage(req, res) {
    let pathFile = `./upload/product/${req.params.imageName}`;

    fs.exists(pathFile, (check) => {
        if (check) {
            res.status(200).sendFile(path.resolve(pathFile));
        } else {
            res.status(404).send({ message: 'image not found' });
        }
    });
}